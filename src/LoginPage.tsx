import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';

export const LoginPage = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userName = name.trim();
        if (!userName) {
            alert("দয়া করে আপনার নাম লিখুন");
            return;
        }
        
        // Get referral code from URL parameter '?ref=...'
        const urlParams = new URLSearchParams(window.location.search);
        const referralCode = urlParams.get('ref') || '';

        const email = userName.toLowerCase().replace(/\s+/g, '') + "@app.local";
        const password = "password123";

        try {
            // Try to login, if fails, register
            try {
                await signInWithEmailAndPassword(auth, email, password);
            } catch (loginError: any) {
                if (loginError.code === 'auth/user-not-found') {
                    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                    await setDoc(doc(db, 'users', userCredential.user.uid), {
                        id: userCredential.user.uid,
                        name: userName,
                        email,
                        referralCode: referralCode.trim(),
                        role: 'user',
                        balance: 50,
                        referrals: 0,
                        referralBonus: 0,
                        lastDailyBonusDate: null,
                        joinedAt: serverTimestamp()
                    });
                } else {
                    throw loginError;
                }
            }
        } catch (error) {
            alert(error instanceof Error ? error.message : "Auth error");
        }
    };

    return (
        <div className='min-h-screen bg-zinc-950 flex items-center justify-center p-6'>
            <form onSubmit={handleSubmit} className='bg-zinc-900 p-8 rounded-2xl w-full max-w-sm border border-zinc-700'>
                <h2 className='text-2xl font-bold mb-6 text-white text-center'>লগইন / রেজিস্ট্রেশন</h2>
                <input type='text' placeholder='আপনার নাম' value={name} onChange={e => setName(e.target.value)} className='w-full bg-zinc-800 p-4 rounded-xl text-white mb-6' required />
                <button type='submit' className='w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 transition-colors text-zinc-950 font-bold py-4 rounded-xl'>
                    প্রবেশ করুন
                </button>
            </form>
        </div>
    );
};

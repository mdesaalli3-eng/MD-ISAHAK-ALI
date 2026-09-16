import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './lib/firebase';

export const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [isLogin, setIsLogin] = useState(true);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                if (!name.trim()) {
                    alert("দয়া করে আপনার নাম লিখুন");
                    return;
                }
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    id: userCredential.user.uid,
                    name: name.trim(),
                    email,
                    referralCode: referralCode.trim(),
                    role: 'user',
                    balance: 50,
                    referrals: 0,
                    referralBonus: 0,
                    lastDailyBonusDate: null,
                    joinedAt: serverTimestamp()
                });
            }
        } catch (error) {
            alert(error instanceof Error ? error.message : "Auth error");
        }
    };

    return (
        <div className='min-h-screen bg-zinc-950 flex items-center justify-center p-6'>
            <form onSubmit={handleSubmit} className='bg-zinc-900 p-8 rounded-2xl w-full max-w-sm border border-zinc-700'>
                <h2 className='text-2xl font-bold mb-6 text-white text-center'>{isLogin ? 'লগইন' : 'রেজিস্ট্রেশন'}</h2>
                <input type='email' placeholder='ইমেইল' value={email} onChange={e => setEmail(e.target.value)} className='w-full bg-zinc-800 p-4 rounded-xl text-white mb-4' required />
                <input type='password' placeholder='পাসওয়ার্ড' value={password} onChange={e => setPassword(e.target.value)} className='w-full bg-zinc-800 p-4 rounded-xl text-white mb-6' required />
                {!isLogin && (
                    <>
                        <input type='text' placeholder='আপনার নাম' value={name} onChange={e => setName(e.target.value)} className='w-full bg-zinc-800 p-4 rounded-xl text-white mb-4' />
                        <input type='text' placeholder='রেফারেল কোড (ঐচ্ছিক)' value={referralCode} onChange={e => setReferralCode(e.target.value)} className='w-full bg-zinc-800 p-4 rounded-xl text-white mb-6' />
                    </>
                )}
                <button type='submit' className='w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 transition-colors text-zinc-950 font-bold py-4 rounded-xl mb-4'>
                    {isLogin ? 'লগইন' : 'রেজিস্ট্রেশন করুন'}
                </button>
                <p className='text-zinc-400 text-center cursor-pointer' onClick={() => setIsLogin(!isLogin)}>
                    {isLogin ? 'একাউন্ট নেই? রেজিস্ট্রেশন করুন' : 'একাউন্ট আছে? লগইন করুন'}
                </p>
            </form>
        </div>
    );
};

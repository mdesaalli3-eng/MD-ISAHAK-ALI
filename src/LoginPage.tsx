import React, { useState } from 'react';

export const LoginPage = ({ onLogin }: { onLogin: (user: any) => void }) => {
    const [name, setName] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const userName = name.trim();
        if (!userName) {
            alert("দয়া করে আপনার নাম লিখুন");
            return;
        }

        // Check if user exists in localStorage
        const users = JSON.parse(localStorage.getItem('app_users') || '{}');
        let user = users[userName];

        if (!user) {
            // Register new user
            user = {
                name: userName,
                balance: 50,
                referrals: 0,
                referralBonus: 0,
                lastDailyBonusDate: null,
                joinedAt: new Date().toISOString()
            };
            users[userName] = user;
            localStorage.setItem('app_users', JSON.stringify(users));
        }

        // Set as logged in
        localStorage.setItem('currentUser', JSON.stringify(user));
        onLogin(user);
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

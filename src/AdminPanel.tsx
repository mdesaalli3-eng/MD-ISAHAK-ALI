import React, { useState, useEffect } from 'react';
import { Users as UsersIcon, CreditCard, Check, X, Lock } from 'lucide-react';
import { db } from './lib/firebase';
import { collection, onSnapshot, query, orderBy, doc, updateDoc } from 'firebase/firestore';

export const AdminPanel = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeSection, setActiveSection] = useState<'users' | 'transactions' | 'referrals'>('users');
    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [allWithdrawals, setAllWithdrawals] = useState<any[]>([]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (email === 'mdesaalli74@gmail.com' && password === 'mdesa1111') {
            setIsAuthenticated(true);
        } else {
            alert('ভুল ইমেইল বা পাসওয়ার্ড!');
        }
    };

    useEffect(() => {
        if (!isAuthenticated) return;
        const unsubscribeUsers = onSnapshot(query(collection(db, 'users'), orderBy('joinedAt', 'desc')), (snapshot) => {
            setAllUsers(snapshot.docs.map(doc => ({ id: doc.id, uid: doc.id, ...doc.data() })));
        });
        const unsubscribeWithdrawals = onSnapshot(query(collection(db, 'withdrawals'), orderBy('createdAt', 'desc')), (snapshot) => {
            setAllWithdrawals(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        });
        return () => {
            unsubscribeUsers();
            unsubscribeWithdrawals();
        };
    }, [isAuthenticated]);

    const updateStatus = async (id: string, status: string) => {
        try {
            await updateDoc(doc(db, 'withdrawals', id), { status });
        } catch (error) {
            console.error("Update status error:", error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className='min-h-screen bg-zinc-950 flex items-center justify-center p-6'>
                <form onSubmit={handleLogin} className='bg-zinc-900 p-8 rounded-2xl w-full max-w-sm border border-zinc-700'>
                    <div className='flex justify-center mb-6'><Lock size={48} className='text-amber-400'/></div>
                    <h2 className='text-2xl font-bold mb-6 text-white text-center'>অ্যাডমিন লগইন</h2>
                    <input type='email' placeholder='ইমেইল' value={email} onChange={e => setEmail(e.target.value)} className='w-full bg-zinc-800 p-4 rounded-xl text-white mb-4' required />
                    <input type='password' placeholder='পাসওয়ার্ড' value={password} onChange={e => setPassword(e.target.value)} className='w-full bg-zinc-800 p-4 rounded-xl text-white mb-6' required />
                    <button type='submit' className='w-full bg-amber-400 text-zinc-950 font-bold py-4 rounded-xl'>লগইন</button>
                </form>
            </div>
        );
    }

    return (
        <div className='pb-24 p-4 min-h-screen bg-zinc-950 text-white'>
            <h2 className='text-2xl font-bold mb-6 text-center text-amber-400'>অ্যাডমিন প্যানেল</h2>
            
            <div className='flex gap-2 mb-6'>
                <button onClick={() => setActiveSection('users')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold ${activeSection === 'users' ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800'}`}>
                    <UsersIcon size={20} /> ইউজারস
                </button>
                <button onClick={() => setActiveSection('transactions')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold ${activeSection === 'transactions' ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800'}`}>
                    <CreditCard size={20} /> লেনদেন
                </button>
                <button onClick={() => setActiveSection('referrals')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold ${activeSection === 'referrals' ? 'bg-amber-400 text-zinc-950' : 'bg-zinc-800'}`}>
                    <UsersIcon size={20} /> রেফারেল
                </button>
            </div>

            {activeSection === 'users' && (
                <div className='space-y-4'>
                    <h3 className='font-bold px-2'>ইউজারস লিস্ট ({allUsers.length})</h3>
                    {allUsers.map(u => (
                        <div key={u.id} className='bg-zinc-800 p-4 rounded-2xl border border-zinc-700 flex justify-between items-center'>
                            <div>
                                <p className='font-bold'>{u.name}</p>
                                <p className='text-xs text-zinc-400'>ID: {u.id}</p>
                            </div>
                            <p className='font-bold text-amber-400'>{u.balance?.toFixed(2)} ৳</p>
                        </div>
                    ))}
                </div>
            )}

            {activeSection === 'referrals' && (
                <div className='space-y-4'>
                    <h3 className='font-bold px-2'>রেফারেল ট্র্যাকিং</h3>
                    {allUsers.filter(u => u.referredBy).map(u => {
                        const referrer = allUsers.find(r => r.uid === u.referredBy);
                        return (
                            <div key={u.id} className='bg-zinc-800 p-4 rounded-2xl border border-zinc-700'>
                                <p className='text-sm text-zinc-300'>
                                    <span className='font-bold text-white'>{u.name}</span> (ID: {u.id}) -কে রেফার করেছেন 
                                    <span className='font-bold text-amber-400'> {referrer ? referrer.name : 'অজ্ঞাত'}</span> 
                                    {referrer && ` (ID: {referrer.id})`}
                                </p>
                            </div>
                        );
                    })}
                </div>
            )}

            {activeSection === 'transactions' && (
                <div className='space-y-4'>
                    <h3 className='font-bold px-2'>লেনদেনের ইতিহাস ({allWithdrawals.length})</h3>
                    {allWithdrawals.length === 0 ? (
                        <p className='text-zinc-500 text-center py-8'>কোনো লেনদেন পাওয়া যায়নি।</p>
                    ) : (
                        allWithdrawals.map(w => (
                            <div key={w.id} className='bg-zinc-800 p-4 rounded-2xl border border-zinc-700 flex justify-between items-center'>
                                <div>
                                    <p className='font-bold'>{w.amount} ৳ ({w.method})</p>
                                    <p className='text-xs text-zinc-400'>{new Date(w.createdAt).toLocaleString('bn-BD')}</p>
                                    <p className='text-xs text-zinc-500'>ID: {w.userId}</p>
                                </div>
                                <div className='flex items-center gap-2'>
                                    <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${w.status === 'Completed' ? 'bg-green-900 text-green-400' : 'bg-yellow-900 text-yellow-400'}`}>
                                        {w.status}
                                    </span>
                                    {w.status === 'Pending' && (
                                        <div className='flex gap-1'>
                                            <button onClick={() => updateStatus(w.id, 'Completed')} className='bg-green-600 p-1 rounded-md'><Check size={14} /></button>
                                            <button onClick={() => updateStatus(w.id, 'Rejected')} className='bg-red-600 p-1 rounded-md'><X size={14} /></button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

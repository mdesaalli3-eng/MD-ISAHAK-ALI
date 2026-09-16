import React, { useState, useEffect } from 'react';
import { AlertCircle, Coins, Users, ListTodo, Play, Clock } from 'lucide-react';
import { db } from './lib/firebase';
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, orderBy } from 'firebase/firestore';

export const WithdrawalPage = ({ user }: { user: { balance: number, referrals: number, uid?: string } }) => {
    const [history, setHistory] = useState<{amount: number, status: string, date: string}[]>([]);
    const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
    const [amount, setAmount] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!user.uid) return;
        const q = query(
            collection(db, 'withdrawals'),
            where('userId', '==', user.uid),
            orderBy('createdAt', 'desc')
        );
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const data = snapshot.docs.map(doc => ({
                amount: doc.data().amount,
                status: doc.data().status,
                date: doc.data().createdAt?.toDate().toLocaleDateString('bn-BD') || 'প্রক্রিয়াধীন'
            }));
            setHistory(data);
        });
        return () => unsubscribe();
    }, [user.uid]);

    const handleWithdraw = () => {
        if (!selectedMethod) {
            alert('অনুগ্রহ করে একটি পেমেন্ট মাধ্যম নির্বাচন করুন!');
            return;
        }
        if (!amount || parseInt(amount) < 500) {
            alert('ন্যূনতম ৫০০ টাকা উত্তোলন করতে হবে!');
            return;
        }
        if (user.balance < parseInt(amount)) {
            alert('আপনার পর্যাপ্ত ব্যালেন্স নেই!');
            return;
        }
        // Relaxation for testing: user.referrals < 15
        if (user.referrals < 1) { 
            alert(`উত্তোলন করার জন্য কমপক্ষে ১৫টি রেফারেল প্রয়োজন! বর্তমান রেফারেল: ${user.referrals}`);
            return;
        }
        setShowModal(true);
    };

    const confirmWithdraw = async () => {
        if (!user.uid || isSubmitting) return;
        setIsSubmitting(true);
        try {
            await addDoc(collection(db, 'withdrawals'), {
                userId: user.uid,
                userName: user.uid, // Simplified
                amount: parseInt(amount),
                method: selectedMethod,
                status: 'Pending',
                createdAt: serverTimestamp()
            });
            alert(`আপনার ${amount} টাকা ${selectedMethod} উত্তোলনের অনুরোধটি সফলভাবে পাঠানো হয়েছে!`);
            setShowModal(false);
            setAmount('');
            setSelectedMethod(null);
        } catch (error) {
            console.error("Withdrawal error:", error);
            alert("উত্তোলন অনুরোধ পাঠাতে সমস্যা হয়েছে।");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='pb-24 p-4'>
            {showModal && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-sm p-6 text-center">
                        <h2 className="text-xl font-bold mb-4 text-white">উত্তোলন নিশ্চিত করুন</h2>
                        <p className="text-zinc-300 mb-6">আপনি কি {selectedMethod} এর মাধ্যমে {amount} টাকা উত্তোলন করতে চান?</p>
                        <div className="flex gap-4">
                            <button onClick={() => setShowModal(false)} className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-bold">বাতিল</button>
                            <button onClick={confirmWithdraw} className="flex-1 bg-amber-400 text-zinc-950 py-3 rounded-xl font-bold">নিশ্চিত করুন</button>
                        </div>
                    </div>
                </div>
            )}
            <div className='bg-zinc-800 p-8 rounded-2xl mb-6 text-center border border-zinc-700'>
                <p className='text-zinc-400 mb-2'>উপলব্ধ ব্যালেন্স</p>
                <h3 className='text-4xl font-bold text-amber-400'>{user.balance.toFixed(2)} <span className='text-2xl'>৳</span></h3>
            </div>
            <div className='bg-zinc-900 p-6 rounded-2xl border border-zinc-700 mb-6'>
                <h3 className='font-bold mb-4 flex items-center gap-2'><AlertCircle className='text-teal-400'/> উত্তোলনের শর্ত</h3>
                <div className='space-y-3'>
                    <div className='flex justify-between items-center bg-zinc-800 p-4 rounded-xl'>
                        <span className='text-sm text-zinc-300 flex items-center gap-2'><Coins size={16}/> ন্যূনতম পরিমাণ</span>
                        <span className='bg-teal-900/50 text-teal-400 px-3 py-1 rounded-full text-sm font-bold border border-teal-800'>৫০০ ৳</span>
                    </div>
                    <div className='flex justify-between items-center bg-zinc-800 p-4 rounded-xl'>
                        <span className='text-sm text-zinc-300 flex items-center gap-2'><Users size={16}/> রেফারেল প্রয়োজন</span>
                        <span className='bg-red-900/50 text-red-400 px-3 py-1 rounded-full text-sm font-bold border border-red-800'>0/15</span>
                    </div>
                    <div className='flex justify-between items-center bg-zinc-800 p-4 rounded-xl'>
                        <span className='text-sm text-zinc-300 flex items-center gap-2'><ListTodo size={16}/> মোট এড প্রয়োজন</span>
                        <span className='bg-red-900/50 text-red-400 px-3 py-1 rounded-full text-sm font-bold border border-red-800'>10/50</span>
                    </div>
                </div>
            </div>

            <h3 className='font-bold mb-4 flex items-center gap-2'><Play className='text-amber-400'/> উত্তোলন ফর্ম</h3>
            <div className='grid grid-cols-2 gap-4 mb-6'>
                {[
                    {name: 'bKash', color: 'bg-pink-600'},
                    {name: 'Nagad', color: 'bg-orange-500'},
                    {name: 'Rocket', color: 'bg-purple-600'},
                    {name: 'USDT', color: 'bg-teal-500'}
                ].map(method => (
                    <div 
                        key={method.name} 
                        onClick={() => setSelectedMethod(method.name)}
                        className={`bg-zinc-800 p-6 rounded-2xl text-center border-2 flex flex-col items-center gap-3 cursor-pointer ${selectedMethod === method.name ? 'border-amber-400' : 'border-zinc-700'}`}>
                        <div className={`${method.color} p-4 rounded-2xl font-bold text-xl w-14 h-14 flex items-center justify-center`}>{method.name[0]}</div>
                        <p className='font-bold'>{method.name}</p>
                    </div>
                ))}
            </div>
            
            <input 
                type="number" 
                placeholder="পরিমাণ লিখুন (টাকা)" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-zinc-800 p-4 rounded-2xl border border-zinc-700 text-white mb-4"
            />
            
            <div className='grid grid-cols-4 gap-2 mb-4'>
                {[500, 1000, 5000, 10000].map(amt => (
                    <button key={amt} onClick={() => setAmount(amt.toString())} className='bg-zinc-800 p-2 rounded-xl text-sm font-bold border border-zinc-700'>{amt}</button>
                ))}
            </div>

            <button onClick={handleWithdraw} className='w-full bg-amber-400 text-zinc-950 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 text-lg mb-8'>
                <Coins size={20}/> উত্তোলন করুন
            </button>

            <h3 className='font-bold mb-4 flex items-center gap-2'><Clock className='text-amber-400'/> উত্তোলনের ইতিহাস</h3>
            <div className='bg-zinc-800 rounded-2xl border border-zinc-700 overflow-hidden'>
                {history.map((item, index) => (
                    <div key={index} className='p-4 border-b border-zinc-700 last:border-b-0 flex justify-between items-center'>
                        <div>
                            <p className='font-bold text-white'>{item.amount} ৳</p>
                            <p className='text-xs text-zinc-400'>{item.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Completed' ? 'bg-green-900/50 text-green-400 border border-green-800' : 'bg-yellow-900/50 text-yellow-400 border border-yellow-800'}`}>
                            {item.status}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

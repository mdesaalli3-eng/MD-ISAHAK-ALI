import React from 'react';
import { ScrollText, Users, Gift, UserPlus, Play, ListTodo } from 'lucide-react';

export const ReferralPage = ({ user, onSimulateReferral }: { user: {referrals: number, referralBonus: number, id: string}, onSimulateReferral: () => void }) => {
    const referralLink = `${window.location.origin}?ref=${user.id}`;
    
    const copyToClipboard = () => {
        navigator.clipboard.writeText(referralLink);
        alert('রেফারেল লিংক কপি করা হয়েছে!');
    };

    const shareReferral = () => {
        if (navigator.share) {
            navigator.share({
                title: 'দেশী ইনকাম - আমার রেফারেল লিংক',
                text: 'এই লিংকে জয়েন করে ইনকাম শুরু করুন: ' + referralLink,
                url: referralLink,
            }).catch(err => console.log('Share failed', err));
        } else {
            copyToClipboard();
        }
    };

    return (
        <div className='pb-24 p-4'>
            <div className='flex justify-center mb-6'>
                <div className='bg-zinc-800 p-6 rounded-full'>
                    <Users size={48} className='text-purple-400'/>
                </div>
            </div>
            <h2 className='text-center text-2xl font-bold mb-2'>রেফারেল প্রোগ্রাম</h2>
            <p className='text-center text-zinc-400 mb-6'>প্রতি বন্ধু আনলে ১০০ টাকা বোনাস</p>
            
            <div className='grid grid-cols-2 gap-4 mb-6'>
                <div className='bg-zinc-800 p-6 rounded-2xl text-center border border-zinc-700'>
                    <p className='text-zinc-400 mb-2'>মোট রেফারেল</p>
                    <p className='text-4xl font-bold text-purple-400'>{user.referrals}</p>
                </div>
                <div className='bg-zinc-800 p-6 rounded-2xl text-center border border-zinc-700'>
                    <p className='text-zinc-400 mb-2'>রেফারেল বোনাস</p>
                    <p className='text-4xl font-bold text-amber-400'>{user.referralBonus}</p>
                    <p className='text-xs text-zinc-500'>টাকা</p>
                </div>
            </div>

            <div className='bg-zinc-800 p-6 rounded-2xl border border-zinc-700 mb-6'>
                <h3 className='font-bold mb-2 text-center text-sm text-zinc-400'>আপনার রেফারেল কোড</h3>
                <p className='text-3xl font-bold text-center text-white tracking-widest bg-zinc-900 py-3 rounded-xl border border-zinc-700 mb-4'>{user.id}</p>
                <div className='flex items-center gap-2 mb-4'>
                    <div className='text-purple-400'><Users size={20}/></div>
                    <h3 className='font-bold'>আপনার রেফারেল লিংক</h3>
                </div>
                <div className='bg-zinc-900 p-4 rounded-xl text-zinc-400 text-sm mb-4 border border-zinc-700 break-all'>
                    {referralLink}
                </div>
                <div className='grid grid-cols-2 gap-4'>
                    <button onClick={copyToClipboard} className='bg-purple-900 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2'>
                        <ScrollText size={18}/> লিংক কপি করুন
                    </button>
                    <button onClick={shareReferral} className='bg-teal-500 text-zinc-950 font-bold py-3 rounded-xl flex items-center justify-center gap-2'>
                        <Play size={18}/> শেয়ার করুন
                    </button>
                </div>
            </div>

            <div className='bg-zinc-800 p-6 rounded-2xl border border-zinc-700'>
                <h3 className='font-bold mb-4 flex items-center gap-2'><ListTodo/> আপনার রেফারেল লিস্ট</h3>
                <p className='text-center text-zinc-500 py-6'>কোনো রেফারেল নেই</p>
            </div>

            {/* Referral Rules */}
            <div className='bg-zinc-800 p-6 rounded-2xl border border-zinc-700 mt-6'>
                <h3 className='font-bold mb-4 flex items-center gap-2'><ScrollText/> রেফারেল নিয়ম</h3>
                <div className='space-y-3'>
                    <div className='bg-zinc-900 p-4 rounded-xl flex items-center gap-3'>
                        <div className='bg-purple-900 p-2 rounded-full'><Gift size={16} className='text-purple-300'/></div>
                        <p className='text-sm text-zinc-300'>প্রতি রেফারেলে আপনি পাবেন <span className='font-bold text-white'>১০০ টাকা</span></p>
                    </div>
                    <div className='bg-zinc-900 p-4 rounded-xl flex items-center gap-3'>
                        <div className='bg-teal-900 p-2 rounded-full'><UserPlus size={16} className='text-teal-300'/></div>
                        <p className='text-sm text-zinc-300'>আপনার রেফারেল পাবে <span className='font-bold text-white'>৫০ টাকা</span> বোনাস</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

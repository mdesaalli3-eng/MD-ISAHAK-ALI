import React from 'react';
import { ScrollText, Coins, Play, Calendar, Users, Wallet, Megaphone, Lightbulb } from 'lucide-react';

export const HomePage = ({ setShowRules, user, onClaimBonus, onTriggerAdmin }: { setShowRules: (show: boolean) => void, user: {name: string, id: string, balance: number}, onClaimBonus: () => void, onTriggerAdmin: () => void }) => {
    const [clickCount, setClickCount] = React.useState(0);

    const handleWelcomeClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);
        if (newCount >= 5) {
            setClickCount(0);
            onTriggerAdmin();
        }
    };

    return (
    <div className="pb-24">
        <div className='p-4'>
        {/* Rules Button */}
        <button onClick={() => setShowRules(true)} className='w-full bg-amber-100 text-zinc-900 p-4 rounded-full flex items-center justify-center gap-3 font-bold mb-6'>
            <ScrollText size={24}/>
            <span>সম্পূর্ণ কাজের নিয়ম দেখুন</span>
        </button>

        <div className='flex justify-between items-start mb-6'>
            <div>
                <p className='text-zinc-400' onClick={handleWelcomeClick}>স্বাগতম 🖐️</p>
                <h2 className='text-2xl font-bold'>{user.name}</h2>
                <p className='text-zinc-500'>আইডি: {user.id}</p>
            </div>
            <div className='bg-amber-400 p-3 rounded-2xl'>
                <Coins className='text-zinc-950'/>
            </div>
        </div>

        {/* Balance Card */}
        <div className='bg-zinc-800 p-6 rounded-2xl mb-6 relative overflow-hidden'>
            <p className='text-zinc-400 mb-1'>মোট ব্যালেন্স</p>
            <h3 className='text-4xl font-bold text-amber-400'>{user.balance.toFixed(2)} <span className='text-2xl'>৳</span></h3>
            <div className='absolute right-[-20px] top-[-20px] w-24 h-24 rounded-full border border-zinc-700/50'></div>
        </div>

        {/* Quick Actions */}
        <h3 className='font-bold mb-3'>দ্রুত অ্যাকশন</h3>
        <div className='grid grid-cols-2 gap-4 mb-6'>
            <div className='bg-zinc-800 p-4 rounded-2xl'>
            <Play className='text-teal-400 mb-2'/>
            <p className='font-bold'>এড দেখুন</p>
            <p className='text-sm text-zinc-400'>10 ৳ / এড</p>
            </div>
            <button onClick={onClaimBonus} className='bg-zinc-800 p-4 rounded-2xl text-left'>
            <Calendar className='text-amber-400 mb-2'/>
            <p className='font-bold'>দৈনিক বোনাস</p>
            <p className='text-sm text-zinc-400'>3 ৳ / এড</p>
            </button>
            <div className='bg-zinc-800 p-4 rounded-2xl'>
            <Users className='text-pink-400 mb-2'/>
            <p className='font-bold'>রেফারেল</p>
            <p className='text-sm text-zinc-400'>500 ৳ / জন</p>
            </div>
            <div className='bg-zinc-800 p-4 rounded-2xl'>
            <Wallet className='text-blue-400 mb-2'/>
            <p className='font-bold'>উত্তোলন</p>
            <p className='text-sm text-zinc-400'>500 ৳ মিনিমাম</p>
            </div>
        </div>

        {/* Payment Proof */}
        <div className='bg-zinc-800 p-4 rounded-2xl mb-6 flex justify-between items-center'>
            <div className='flex items-center gap-3'>
            <Megaphone className='text-teal-400'/>
            <div>
                <p className='font-bold'>পেমেন্ট প্রুফ চ্যানেল</p>
                <p className='text-xs text-zinc-400'>সকল পেমেন্ট এখানে দেখুন</p>
            </div>
            </div>
            <a 
                href="https://t.me/deshii" 
                target="_blank" 
                rel="noopener noreferrer" 
                className='bg-zinc-900 px-4 py-2 rounded-full text-xs font-bold text-teal-400 border border-teal-400'>
                জয়েন করুন →
            </a>
        </div>

        {/* How to earn */}
        <div className='bg-zinc-800 p-4 rounded-2xl mb-6'>
            <div className='flex items-center gap-2 mb-4'>
            <Lightbulb className='text-yellow-400'/>
            <h3 className='font-bold'>কীভাবে আয় করবেন?</h3>
            </div>
            <div className='space-y-3'>
            <p className='text-sm flex items-center gap-2'>
                <span className='bg-zinc-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold'>১</span>
                এড দেখুন — প্রতি এডে 10 টাকা
            </p>
            <p className='text-sm flex items-center gap-2'>
                <span className='bg-zinc-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold'>২</span>
                বোনাস এড — প্রতি এডে 5 টাকা
            </p>
            <p className='text-sm flex items-center gap-2'>
                <span className='bg-zinc-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold'>৩</span>
                বন্ধু আনুন — প্রতি রেফারেলে ১০০ টাকা
            </p>
            <p className='text-sm flex items-center gap-2'>
                <span className='bg-zinc-900 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold'>৪</span>
                দৈনিক বোনাস — প্রতিদিন সর্বোচ্চ ১৫০ টাকা
            </p>
            </div>
        </div>
        </div>
    </div>
    );
};

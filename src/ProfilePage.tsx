import React from 'react';
import { Play, TrendingUp, Users, Wallet, Settings, Copy, LogOut, ArrowRight } from 'lucide-react';

export const ProfilePage = ({ user }: { user: {name: string, id: string, referrals: number, balance: number, referralBonus: number} }) => {
    const handleLogOut = async () => {
        try {
            localStorage.removeItem('userId');
            window.location.reload();
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    return (
    <div className='pb-24 p-4'>
        <div className='bg-zinc-800 p-8 rounded-2xl mb-6 text-center border border-zinc-700 flex flex-col items-center'>
            <div className='w-24 h-24 bg-teal-500 rounded-full flex items-center justify-center text-4xl font-bold mb-4'>{user.name[0]}</div>
            <h2 className='text-2xl font-bold'>{user.name}</h2>
            <p className='text-zinc-400'>আইডি: {user.id}</p>
            <p className='text-zinc-500 text-sm'>জয়েন: ৩/৯/২০২৬</p>
            <div className='bg-zinc-900 px-4 py-1 rounded-full text-amber-400 font-bold text-sm mt-3 border border-amber-800'>সক্রিয় সদস্য</div>
        </div>

        <div className='grid grid-cols-2 gap-4 mb-6'>
            {[
                { label: 'মোট এড', value: '0', icon: Play, color: 'text-teal-400' },
                { label: 'মোট আয়', value: (user.balance).toFixed(2), icon: TrendingUp, color: 'text-amber-400' },
                { label: 'রেফারেল', value: user.referrals.toString(), icon: Users, color: 'text-purple-400' },
                { label: 'ব্যালেন্স', value: user.balance.toFixed(2), icon: Wallet, color: 'text-pink-400' },
            ].map(item => (
                <div key={item.label} className='bg-zinc-800 p-6 rounded-2xl border border-zinc-700 flex flex-col items-center'>
                    <item.icon className={`${item.color} mb-2`} size={24}/>
                    <p className='text-zinc-400 text-xs mb-1'>{item.label}</p>
                    <p className='text-xl font-bold'>{item.value}</p>
                </div>
            ))}
        </div>

        <div className='bg-zinc-800 p-6 rounded-2xl border border-zinc-700 mt-6'>
            <h3 className='font-bold mb-4 flex items-center gap-2'><Settings className='text-teal-400'/> সেটিংস</h3>
            <div className='space-y-3'>
                <div className='bg-zinc-900 p-4 rounded-xl flex items-center justify-between'>
                    <div className='flex items-center gap-3'>
                        <Users size={20} className='text-zinc-400'/>
                        <span className='font-bold'>রেফারেল লিংক কপি</span>
                    </div>
                    <Copy size={20} className='text-zinc-500'/>
                </div>
                <div onClick={handleLogOut} className='bg-zinc-900 p-4 rounded-xl flex items-center justify-between text-red-400 cursor-pointer'>
                    <div className='flex items-center gap-3'>
                        <LogOut size={20}/>
                        <span className='font-bold'>লগ আউট</span>
                    </div>
                    <ArrowRight size={20}/>
                </div>
            </div>
        </div>
    </div>
    );
};

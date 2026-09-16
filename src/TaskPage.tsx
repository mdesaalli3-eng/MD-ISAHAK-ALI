import React from 'react';

export const TaskPage = () => (
    <div className='pb-24 p-4'>
        <h2 className='text-2xl font-bold mb-6 text-center'>টাস্কসমূহ</h2>
        <div className='space-y-4'>
            {[
                { title: 'টেলিগ্রাম চ্যানেল জয়েন', reward: '৫০ ৳' },
                { title: 'ইউটিউব সাবস্ক্রাইব', reward: '৫০ ৳' },
                { title: 'ভিডিও টাস্ক', reward: '১০০ ৳' },
            ].map((task, index) => (
                <div key={index} className='bg-zinc-800 p-4 rounded-2xl flex justify-between items-center border border-zinc-700'>
                    <div>
                        <p className='font-bold'>{task.title}</p>
                        <p className='text-xs text-zinc-400'>পুরস্কার: {task.reward}</p>
                    </div>
                    <button className='bg-teal-500 text-zinc-950 px-4 py-2 rounded-xl font-bold text-sm'>শুরু করুন</button>
                </div>
            ))}
        </div>
    </div>
);

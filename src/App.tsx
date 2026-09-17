import React, { useState, useEffect } from 'react';
import { X, Home, ListTodo, Wallet, UserCircle, Users, Play } from 'lucide-react';
import { HomePage } from './HomePage';
import { ReferralPage } from './ReferralPage';
import { TaskPage } from './TaskPage';
import { WithdrawalPage } from './WithdrawalPage';
import { ProfilePage } from './ProfilePage';
import { AdminPanel } from './AdminPanel';
import { LoginPage } from './LoginPage';
// ... rest of the file ...

const RulesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-lg max-h-[80vh] overflow-y-auto p-6 relative">
                <button onClick={onClose} className="absolute top-4 right-4 text-zinc-400 hover:text-white">
                    <X size={24} />
                </button>
                <h2 className="text-xl font-bold mb-4 text-amber-400">সম্পূর্ণ কাজের নিয়মাবলী</h2>
                <div className="text-zinc-300 text-sm space-y-4">
                    <p><strong>১. এড দেখা</strong><br/>
                    প্রধান এড ➜ প্রতি এডে ১০ টাকা আয়। প্রতি ঘন্টায় সর্বোচ্চ ১০টি এড দেখা যাবে।<br/>
                    বোনাস এড ➜ প্রতি এডে ৫ টাকা আয়। এই ঘন্টায় ১০টি পর্যন্ত দেখা যাবে।<br/>
                    দৈনিক বোনাস ➜ প্রতিদিন ৫০টি এড (প্রতি এড ৩ টাকা) = মোট ১৫০ টাকা আয় করা সম্ভব।<br/>
                    এড দেখার পর ১৫/৩০ সেকেন্ড অপেক্ষা করতে হবে (কাউন্টডাউন শেষে স্বয়ংক্রিয়ভাবে টাকা যোগ হবে)।<br/>
                    প্রতিটি এড দেখার রেকর্ড সংরক্ষিত হয় এবং প্রতারণা করলে অ্যাকাউন্ট ব্লক হতে পারে.</p>
                    
                    <p><strong>২. রেফারেল প্রোগ্রাম</strong><br/>
                    আপনার রেফারেল লিংক দিয়ে যারা জয়েন করবে, তারা ৫০ টাকা সাইনআপ বোনাস পাবে।<br/>
                    আর আপনি পাবেন প্রতি রেফারেল ১০০ টাকা (সরাসরি ব্যালেন্সে যুক্ত হবে)।<br/>
                    রেফারেল বোনাস পাওয়ার জন্য রেফার্ড ইউজারকে কমপক্ষে ১টি এড দেখতে হবে না – সাইনআপ করলেই বোনাস যুক্ত হয়।<br/>
                    আপনার রেফারেল কাউন্ট যত বেশি, উত্তোলনের শর্ত পূরণে সহায়তা করবে।</p>
                    
                    <p><strong>৩. বোনাস ও অফার</strong><br/>
                    সাইনআপ বোনাস: নতুন ইউজার নিবন্ধন করার সাথে সাথে পান ৫০ টাকা।<br/>
                    টেলিগ্রাম চ্যানেল জয়েন: ৫০ টাকা<br/>
                    ইউটিউব সাবস্ক্রাইব: ৫০ টাকা<br/>
                    ভিডিও টাস্ক: ৮ মিনিটের ভিডিও দেখে লাইক দিলে ১০০ টাকা (দৈনিক ২ বার)<br/>
                    প্রতিদিন ভোর ৬টায় দৈনিক বোনাস কাউন্ট রিসেট হয়। ঘন্টাভিত্তিক লিমিট রিসেট হয় প্রতি ঘন্টার শুরুতে।</p>
                    
                    <p><strong>৪. উত্তোলনের নিয়ম</strong><br/>
                    ন্যূনতম উত্তোলন সীমা: ৫০০ টাকা।<br/>
                    রেফারেল প্রয়োজন: ১৫ জন (সক্রিয় রেফারেল গণনা করা হয়)।<br/>
                    মোট এড প্রয়োজন: কমপক্ষে ৫০টি এড দেখতে হবে (প্রধান+বোনাস+দৈনিক সব মিলিয়ে)।<br/>
                    পেমেন্ট মাধ্যম: bKash, Nagad, Rocket, USDT (TRC20)। সঠিক একাউন্ট নম্বর প্রদান বাধ্যতামূলক. <br/>
                    উত্তোলন রিকোয়েস্ট করার পর ২৪-৪৮ ঘন্টার মধ্যে পেমেন্ট দেওয়া হবে। পেমেন্ট প্রুফ টেলিগ্রাম চ্যানেল এ আপলোড করা হবে।<br/>
                    যেকোনো প্রতারণা বা অসদুপায় অবলম্বন করলে উত্তোলন বাতিল এবং অ্যাকাউন্ট স্থায়ীভাবে ব্লক করা হবে।</p>
                    
                    <p><strong>৫. গুরুত্বপূর্ণ তথ্য</strong><br/>
                    প্রতিটি এড দেখার আগে অবশ্যই @deshiincomebot ওপেন করুন এবং বটে স্টার্ট দিন। নাহলে পেমেন্ট পেতে সমস্যা হতে পারে।<br/>
                    ভুয়া বা একাধিক অ্যাকাউন্ট ব্যবহার করে কেউ রেফারেল বোনাস নিতে চাইলে তার সব অ্যাকাউন্ট ব্লক হবে এবং ব্যালেন্স জব্দ হবে।<br/>
                    সাপোর্টের জন্য আমাদের <a href="https://t.me/deshii" target="_blank" rel="noopener noreferrer" className="text-amber-400 underline">টেলিগ্রাম চ্যানেলে</a> যুক্ত থাকুন এবং আপডেট ফলো করুন।<br/>
                    যেকোনো সমস্যায় অ্যাডমিনের সাথে যোগাযোগ করুন (চ্যানেলের মাধ্যমেই উত্তর দেওয়া হবে)।<br/>
                    🇧🇩 দেশী ইনকাম – ঘরে বসে আয় করুন, সহজ ও নিরাপদ পদ্ধতি</p>
                </div>
            </div>
        </div>
    );
};

const BonusModal = ({ isOpen, onClose, onConfirm, isAlreadyClaimed }: { isOpen: boolean; onClose: () => void; onConfirm: () => void; isAlreadyClaimed: boolean }) => {
    if (!isOpen) return null;
    
    // Calculate time until next claim (6 AM tomorrow)
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    tomorrow.setHours(6, 0, 0, 0);
    const diff = tomorrow.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl w-full max-w-sm p-6 text-center">
                {isAlreadyClaimed ? (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-white">বোনাস ইতিমধ্যে নেওয়া হয়েছে!</h2>
                        <p className="text-zinc-300 mb-6">আপনি আজ ইতিমধ্যে বোনাস নিয়েছেন। পরের বোনাস পাওয়া যাবে {hours} ঘণ্টা {minutes} মিনিট পর (সকাল ৬টায়)।</p>
                        <button onClick={onClose} className="w-full bg-zinc-800 text-white py-3 rounded-xl font-bold">বন্ধ করুন</button>
                    </>
                ) : (
                    <>
                        <h2 className="text-xl font-bold mb-4 text-white">দৈনিক বোনাস নিন</h2>
                        <p className="text-zinc-300 mb-6">আপনি কি আজ ৩ টাকা বোনাস নিতে চান?</p>
                        <div className="flex gap-4">
                            <button onClick={onClose} className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-bold">বাতিল</button>
                            <button onClick={() => { onConfirm(); onClose(); }} className="flex-1 bg-amber-400 text-zinc-950 py-3 rounded-xl font-bold">নিশ্চিত করুন</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showRules, setShowRules] = useState(false);
  const [showBonusModal, setShowBonusModal] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        setUser(JSON.parse(savedUser));
    }
  }, []);

  if (showAdmin || window.location.pathname === '/admin') {
    return <AdminPanel />;
  }

  const saveUserToLocalStorage = (updatedUser: any) => {
      setUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      const users = JSON.parse(localStorage.getItem('app_users') || '{}');
      users[updatedUser.name] = updatedUser;
      localStorage.setItem('app_users', JSON.stringify(users));
  };

  const updateBalance = (amount: number) => {
      if (!user) return;
      const updatedUser = {...user, balance: (user.balance || 0) + amount};
      saveUserToLocalStorage(updatedUser);
  };

  const addReferral = () => {
      if (!user) return;
      const bonus = 100;
      const updatedUser = {...user, balance: (user.balance || 0) + bonus, referrals: (user.referrals || 0) + 1, referralBonus: (user.referralBonus || 0) + bonus};
      saveUserToLocalStorage(updatedUser);
      alert('অভিনন্দন! আপনি নতুন একজন রেফারেল পেয়েছেন এবং ১০০ টাকা বোনাস পেয়েছেন.');
  };

  const claimDailyBonus = () => {
      if (!user) return;
      const today = new Date().toDateString();
      if (user.lastDailyBonusDate === today) {
          alert('আপনি আজ ইতিমধ্যে বোনাস নিয়েছেন!');
          return;
      }
      const bonus = 3;
      const updatedUser = {...user, balance: (user.balance || 0) + bonus, lastDailyBonusDate: today};
      saveUserToLocalStorage(updatedUser);
      alert(`অভিনন্দন! আপনি ${bonus} টাকা বোনাস পেয়েছেন.`);
  };

  if (!user) {
      return <LoginPage onLogin={setUser} />;
  }

  return <div className="bg-zinc-950 min-h-screen text-white font-sans">
      <RulesModal isOpen={showRules} onClose={() => setShowRules(false)} />
      <BonusModal 
        isOpen={showBonusModal} 
        onClose={() => setShowBonusModal(false)} 
        onConfirm={claimDailyBonus} 
        isAlreadyClaimed={user.lastDailyBonusDate === new Date().toDateString()} 
      />
      
      {activeTab === 'home' && <HomePage setShowRules={setShowRules} user={user} onClaimBonus={() => setShowBonusModal(true)} onOpenAdminPanel={() => setShowAdmin(true)} />}
      {activeTab === 'task' && <TaskPage />}
      {activeTab === 'referral' && <ReferralPage user={user} onSimulateReferral={addReferral} />}
      {activeTab === 'withdrawal' && <WithdrawalPage user={user} />}
      {activeTab === 'profile' && <ProfilePage user={user} />}

      {/* Floating Action Button */}
      <button className='fixed bottom-24 right-6 bg-red-500 text-white p-4 rounded-full flex items-center gap-2 shadow-xl'>
          <Play fill='white'/>
          <span className='font-bold'>ভিডিও দেখুন ১০০ টাকা</span>
      </button>
  </div>;
}

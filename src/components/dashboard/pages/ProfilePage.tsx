import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Building, Briefcase, Shield, Bell, Key, History, LogOut, ChevronRight, Camera } from 'lucide-react';
import DashboardGlassCard from '../shared/DashboardGlassCard';

const stagger = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] as const },
});

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="space-y-6 pb-12 max-w-5xl mx-auto">
      <motion.div {...stagger(0)}>
        <h1 className="text-2xl font-bold text-dash-text tracking-tight">Profile</h1>
        <p className="text-sm text-dash-textMuted mt-1">Manage your personal information and account settings.</p>
      </motion.div>

      {/* Header Section - Minimal B&W Theme */}
      <motion.div {...stagger(0.05)}>
        <DashboardGlassCard className="p-6 border-black/5 bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="relative group">
              <div className="w-20 h-20 rounded-full bg-black/5 border border-black/10 flex items-center justify-center overflow-hidden">
                <User size={32} className="text-black/40" />
              </div>
              <button className="absolute bottom-0 right-0 w-7 h-7 bg-black text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg">
                <Camera size={12} />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-black tracking-tight">Admin User</h2>
              <p className="text-sm text-black/50 font-medium">admin@sustainai.io</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="px-2 py-0.5 rounded bg-black/5 text-black/70 text-[11px] font-semibold tracking-wider uppercase">System Admin</span>
                <span className="px-2 py-0.5 rounded bg-black/5 text-black/70 text-[11px] font-semibold tracking-wider uppercase">Joined 2026</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium hover:bg-black/80 transition-colors"
          >
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </button>
        </DashboardGlassCard>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Col: Info Form */}
        <motion.div className="lg:col-span-2 space-y-6" {...stagger(0.1)}>
          <DashboardGlassCard className="p-6 bg-white border-black/5 shadow-sm">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-6 pb-4 border-b border-black/5">Personal Information</h3>
            
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-black/60 flex items-center gap-2">
                    <User size={14} /> First Name
                  </label>
                  <input 
                    type="text" 
                    defaultValue="Admin" 
                    disabled={!isEditing}
                    className="w-full px-3 py-2.5 bg-black/[0.02] border border-black/10 rounded-lg text-sm text-black focus:outline-none focus:border-black/30 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-black/60 flex items-center gap-2">
                    <User size={14} /> Last Name
                  </label>
                  <input 
                    type="text" 
                    defaultValue="User" 
                    disabled={!isEditing}
                    className="w-full px-3 py-2.5 bg-black/[0.02] border border-black/10 rounded-lg text-sm text-black focus:outline-none focus:border-black/30 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed" 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[12px] font-semibold text-black/60 flex items-center gap-2">
                  <Mail size={14} /> Email Address
                </label>
                <input 
                  type="email" 
                  defaultValue="admin@sustainai.io" 
                  disabled={!isEditing}
                  className="w-full px-3 py-2.5 bg-black/[0.02] border border-black/10 rounded-lg text-sm text-black focus:outline-none focus:border-black/30 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed" 
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-black/60 flex items-center gap-2">
                    <Building size={14} /> Organization
                  </label>
                  <input 
                    type="text" 
                    defaultValue="SustainAI Municipality" 
                    disabled={!isEditing}
                    className="w-full px-3 py-2.5 bg-black/[0.02] border border-black/10 rounded-lg text-sm text-black focus:outline-none focus:border-black/30 focus:bg-white transition-all disabled:opacity-60 disabled:cursor-not-allowed" 
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[12px] font-semibold text-black/60 flex items-center gap-2">
                    <Briefcase size={14} /> Role
                  </label>
                  <input 
                    type="text" 
                    defaultValue="System Admin" 
                    disabled={true}
                    className="w-full px-3 py-2.5 bg-black/[0.02] border border-black/10 rounded-lg text-sm text-black/50 cursor-not-allowed" 
                  />
                  <p className="text-[10px] text-black/40 mt-1">Role changes require super-admin approval.</p>
                </div>
              </div>
            </form>
          </DashboardGlassCard>
        </motion.div>

        {/* Right Col: Standard Features List */}
        <motion.div className="space-y-6" {...stagger(0.15)}>
          <DashboardGlassCard className="p-6 bg-white border-black/5 shadow-sm">
            <h3 className="text-sm font-bold text-black uppercase tracking-wider mb-4 pb-4 border-b border-black/5">Account Settings</h3>
            
            <div className="space-y-1">
              {[
                { icon: Shield, title: 'Security & Password', desc: 'Update password, 2FA' },
                { icon: Bell, title: 'Notifications', desc: 'Email and push alerts' },
                { icon: Key, title: 'API Access', desc: 'Manage secret keys' },
                { icon: History, title: 'Activity Log', desc: 'View session history' },
              ].map((item, i) => (
                <button key={i} className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-black/5 transition-colors group text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-black/5 flex items-center justify-center text-black/60 group-hover:text-black transition-colors">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-black">{item.title}</h4>
                      <p className="text-[11px] text-black/50">{item.desc}</p>
                    </div>
                  </div>
                  <ChevronRight size={16} className="text-black/30 group-hover:text-black transition-colors" />
                </button>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-black/5">
              <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-red-50 text-red-600 transition-colors group text-left">
                <div className="w-8 h-8 rounded bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
                  <LogOut size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold">Sign Out</h4>
                  <p className="text-[11px] opacity-70">End your current session</p>
                </div>
              </button>
            </div>
          </DashboardGlassCard>
        </motion.div>

      </div>
    </div>
  );
}

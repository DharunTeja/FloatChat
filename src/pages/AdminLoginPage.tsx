import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { 
  ShieldCheck, Lock, Mail, KeyRound, ArrowRight, ShieldAlert, Waves
} from 'lucide-react';
import { motion } from 'framer-motion';

export const AdminLoginPage: React.FC = () => {
  const { adminLogin } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('admin.system@argo-ocean.org');
  const [password, setPassword] = useState('●●●●●●●●●●●●');
  const [mfaCode, setMfaCode] = useState('123456');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = adminLogin(email, mfaCode);
    if (success) {
      addToast('login_success', 'Admin Session Verified', 'Full administrator privileges granted via MFA 2FA.');
      window.location.hash = '#/dashboard';
    } else {
      setErrorMsg('Invalid 6-digit MFA TOTP code. (Demo code: 123456)');
      addToast('integrity_failed', 'MFA Verification Failed', 'Invalid 6-digit TOTP key submit.');
    }
  };

  return (
    <div className="min-h-screen bg-navy-950 text-slate-100 flex items-center justify-center p-4 relative overflow-hidden selection:bg-rose-500 selection:text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-rose-500/10 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="glass-panel p-8 rounded-3xl border border-rose-500/30 shadow-2xl backdrop-blur-2xl space-y-6 bg-slate-900/90">
          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-rose-500 to-navy-900 flex items-center justify-center shadow-xl shadow-rose-500/20 border border-rose-500/30">
              <ShieldCheck className="w-8 h-8 text-rose-400" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-white tracking-tight">Admin<span className="text-rose-400">Portal</span></h2>
              <p className="text-xs text-slate-400 mt-1">Multi-Factor Authenticated Enterprise Access</p>
            </div>
            
            {/* Warning Banner */}
            <div className="flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-xs font-semibold text-rose-300">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              Restricted Area – Authorised Admin Credentials Required
            </div>
          </div>

          {/* Admin Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Admin Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Admin Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs glass-input focus:ring-2 focus:ring-rose-500/40"
                />
              </div>
            </div>

            {/* Admin Password */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Master Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs glass-input focus:ring-2 focus:ring-rose-500/40"
                />
              </div>
            </div>

            {/* MFA TOTP Code */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-slate-300">6-Digit MFA / TOTP Code</label>
                <span className="text-[10px] text-cyan-400 font-mono">Demo: 123456</span>
              </div>
              <div className="relative">
                <KeyRound className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setMfaCode(e.target.value)}
                  placeholder="123456"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-xs font-mono tracking-widest glass-input focus:ring-2 focus:ring-rose-500/40"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-xs text-rose-400 bg-rose-500/10 p-2 rounded-lg border border-rose-500/20">{errorMsg}</p>
            )}

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-xl shadow-rose-500/25 transition-all flex items-center justify-center gap-2"
            >
              Verify MFA & Authorize Admin <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer Back Link */}
          <div className="pt-4 border-t border-slate-800 text-center">
            <a
              href="#/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
            >
              <Waves className="w-3.5 h-3.5 text-cyan-400" /> Return to User Login
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

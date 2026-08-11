import React from 'react';
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export const Error500Page: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6 space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-2xl shadow-amber-500/20"
      >
        <AlertTriangle className="w-12 h-12 animate-bounce" />
      </motion.div>

      <div className="space-y-2 max-w-md">
        <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          HTTP 500 INTERNAL SERVER ERROR
        </span>
        <h2 className="text-3xl font-extrabold text-white tracking-tight">System Fault Intercepted</h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          An unhandled error occurred in the ARGO telemetry node cluster. The automated failover engine is restoring state.
        </p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-2xl text-xs font-bold text-slate-200 glass-panel border-slate-700 hover:bg-slate-800 flex items-center gap-2"
        >
          <RefreshCw className="w-4 h-4" /> Retry Request
        </button>
        <a
          href="#/dashboard"
          className="px-6 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-ocean-500 to-cyan-500 hover:from-ocean-400 hover:to-cyan-400 shadow-xl shadow-cyan-500/25 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </a>
      </div>
    </div>
  );
};

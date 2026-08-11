import React from 'react';

export const ShimmerCard: React.FC = () => {
  return (
    <div className="glass-panel p-5 rounded-2xl animate-pulse space-y-4">
      <div className="flex justify-between items-center">
        <div className="h-4 bg-slate-700/50 rounded w-1/3"></div>
        <div className="h-8 w-8 bg-slate-700/50 rounded-lg"></div>
      </div>
      <div className="h-8 bg-slate-700/50 rounded w-1/2"></div>
      <div className="h-3 bg-slate-700/30 rounded w-2/3"></div>
    </div>
  );
};

export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg' }> = ({ size = 'md' }) => {
  const sizeMap = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className={`${sizeMap[size]} border-cyan-500/20 border-t-cyan-400 rounded-full animate-spin`} />
    </div>
  );
};

export const ProgressBar: React.FC<{ progress: number; label?: string }> = ({ progress, label }) => {
  return (
    <div className="w-full space-y-1.5">
      {label && (
        <div className="flex justify-between text-xs font-medium text-slate-300">
          <span>{label}</span>
          <span className="text-cyan-400 font-mono">{progress}%</span>
        </div>
      )}
      <div className="h-2 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/50">
        <div
          className="h-full bg-gradient-to-r from-ocean-500 to-cyan-400 rounded-full transition-all duration-300 relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse-slow"></div>
        </div>
      </div>
    </div>
  );
};

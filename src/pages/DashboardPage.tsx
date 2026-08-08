import React from 'react';
import { useData } from '../context/DataContext';
import { GlassCard } from '../components/common/GlassCard';
import { 
  Users, Database, MessageSquare, Waves, ShieldAlert, 
  Terminal, HardDrive, CheckCircle2, ArrowUpRight, 
  Activity, Zap, Clock, ShieldCheck
} from 'lucide-react';
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, 
  Tooltip, BarChart, Bar, CartesianGrid 
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { datasets, securityEvents, auditLogs } = useData();

  // Chart Data
  const uploadTrendData = [
    { date: 'Aug 01', uploads: 12, storage: 45 },
    { date: 'Aug 02', uploads: 18, storage: 72 },
    { date: 'Aug 03', uploads: 24, storage: 110 },
    { date: 'Aug 04', uploads: 19, storage: 140 },
    { date: 'Aug 05', uploads: 32, storage: 210 },
    { date: 'Aug 06', uploads: 28, storage: 280 },
    { date: 'Aug 07', uploads: 42, storage: 350 },
  ];

  const aiRequestsData = [
    { hour: '00:00', requests: 140, sqlGenerated: 135 },
    { hour: '04:00', requests: 85, sqlGenerated: 80 },
    { hour: '08:00', requests: 420, sqlGenerated: 410 },
    { hour: '12:00', requests: 890, sqlGenerated: 875 },
    { hour: '16:00', requests: 640, sqlGenerated: 620 },
    { hour: '20:00', requests: 310, sqlGenerated: 300 },
  ];

  const kpiCards = [
    { label: 'Total Users', value: '1,420', change: '+12% this mo', icon: Users, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
    { label: 'Uploaded Datasets', value: '348', change: '100% SHA-256 Verified', icon: Database, color: 'text-ocean-400', bg: 'bg-ocean-500/10' },
    { label: 'AI Queries Executed', value: '12,850', change: 'Avg 98.4% Confidence', icon: MessageSquare, color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { label: 'ARGO Ocean Profiles', value: '1.42 M', change: 'Global Array Sync', icon: Waves, color: 'text-teal-400', bg: 'bg-teal-500/10' },
    { label: 'Security Events', value: '84', change: '0 Breach Incidents', icon: ShieldCheck, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
    { label: 'Prompt Injection Attempts', value: '14', change: '100% Intercepted', icon: ShieldAlert, color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { label: 'SQL Injection Attempts', value: '8', change: 'WAF Intercepted', icon: Terminal, color: 'text-rose-400', bg: 'bg-rose-500/10' },
    { label: 'Storage Used', value: '1.84 / 5 TB', change: '36.8% Capacity', icon: HardDrive, color: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  ];

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 via-navy-900/80 to-ocean-950/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Enterprise Operations Dashboard</h2>
          <p className="text-xs text-slate-300 mt-1">Real-time telemetric monitoring for ARGO float discovery, SHA-256 dataset integrity & WAF security.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-xs font-semibold text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            System Operational
          </div>
          <a
            href="#/ai-chat"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-ocean-500 to-cyan-500 hover:from-ocean-400 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
          >
            Launch AI Chat <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Top KPI Cards (Grid of 8) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <GlassCard key={idx} hoverEffect={true} className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{card.label}</span>
                <div className={`p-2 rounded-xl ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div>
                <div className="text-2xl font-extrabold text-white tracking-tight font-mono">{card.value}</div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>{card.change}</span>
                </div>
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Dataset Upload Trend */}
        <GlassCard hoverEffect={false} className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-cyan-400" />
                Dataset Upload Trend (.nc / .csv / .json)
              </h3>
              <p className="text-[11px] text-slate-400">Daily file volume & storage consumption growth</p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-500/20">
              7-Day Activity
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={uploadTrendData}>
                <defs>
                  <linearGradient id="colorUploads" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '12px', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="uploads" stroke="#38bdf8" strokeWidth={2} fillOpacity={1} fill="url(#colorUploads)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Daily AI Requests */}
        <GlassCard hoverEffect={false} className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-ocean-400" />
                Daily AI Requests & SQL Execution
              </h3>
              <p className="text-[11px] text-slate-400">Hourly throughput of natural language queries translated to SQL</p>
            </div>
            <span className="text-xs font-mono text-ocean-400 bg-ocean-500/10 px-2.5 py-1 rounded-full border border-ocean-500/20">
              Realtime Throughput
            </span>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={aiRequestsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0284c7', borderRadius: '12px', fontSize: '12px' }}
                />
                <Bar dataKey="requests" fill="#0284c7" radius={[6, 6, 0, 0]} />
                <Bar dataKey="sqlGenerated" fill="#38bdf8" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Bottom Activity Section: Recent Uploads & AI Questions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Dataset Uploads */}
        <GlassCard hoverEffect={false} className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-cyan-400" />
              Recent Dataset Uploads
            </h3>
            <a href="#/datasets" className="text-xs text-cyan-400 hover:underline">View All</a>
          </div>
          <div className="space-y-3">
            {datasets.slice(0, 3).map((ds) => (
              <div key={ds.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                <div className="min-w-0">
                  <p className="font-semibold text-slate-200 truncate">{ds.filename}</p>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5">
                    <span>{ds.fileSize}</span>
                    <span>•</span>
                    <span className="font-mono text-[10px] text-slate-500 truncate max-w-[120px]">{ds.sha256}</span>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  {ds.verificationStatus}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Recent AI Natural Language Questions */}
        <GlassCard hoverEffect={false} className="space-y-4">
          <div className="flex justify-between items-center border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-sky-400" />
              Recent Natural Language AI Queries
            </h3>
            <a href="#/ai-chat" className="text-xs text-cyan-400 hover:underline">Launch Chat</a>
          </div>
          <div className="space-y-3">
            {auditLogs.filter(a => a.action.includes('QUERY') || a.action.includes('USER') || a.action.includes('UPLOAD')).slice(0, 3).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 text-xs">
                <div className="flex justify-between items-center text-slate-300 font-medium">
                  <span>{log.description}</span>
                  <span className="text-[10px] text-slate-500 font-mono">{log.timestamp.slice(11)}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px] text-slate-400">
                  <span className="text-cyan-400">User: {log.username}</span>
                  <span>IP: {log.ipAddress}</span>
                  <span className="text-emerald-400">Status: {log.status}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

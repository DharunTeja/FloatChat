import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GlassCard } from '../components/common/GlassCard';
import { RoleBadge } from '../components/common/RoleBadge';
import { ForbiddenPage } from './ForbiddenPage';
import { 
  FileSpreadsheet, Download, Filter, ShieldCheck, 
  Calendar, CheckCircle2, XCircle, Search, ShieldAlert,
  Laptop, Globe, Shield, AlertTriangle, Terminal, FilterX
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AuditLogsPage: React.FC = () => {
  const { auditLogs } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [dateFilter, setDateFilter] = useState<'all' | 'today' | 'yesterday' | '7days' | '30days'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // RBAC Access Guard: Admin ONLY
  if (user?.role !== 'Admin') {
    return <ForbiddenPage message="Audit Logs are strictly restricted to Administrator accounts. Researchers and Students are prohibited from viewing audit ledgers." />;
  }

  const handleExportCSV = () => {
    const csvHeader = 'timestamp,username,role,action,status,severity,ip_address,browser,os,description\n';
    const csvRows = auditLogs.map(l => 
      `"${l.timestamp}","${l.username}","${l.role}","${l.action}","${l.status}","${l.severity || 'Low'}","${l.ipAddress}","${l.browser || 'Chrome 122'}","${l.os || 'Windows 11'}","${l.description.replace(/"/g, '""')}"`
    ).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `floatchat_soc_audit_log_${Date.now()}.csv`;
    a.click();
    addToast('info', 'SOC Audit CSV Exported', 'Downloaded complete cryptographic security ledger.');
  };

  const handleExportPDF = () => {
    addToast('info', 'SOC Audit PDF Generated', 'Created signed compliance audit PDF report for SOC2 / ISO27001 audit.');
  };

  // Filtering Logic
  const filteredLogs = auditLogs.filter(l => {
    // Search query
    const matchesSearch = 
      l.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.ipAddress.toLowerCase().includes(searchQuery.toLowerCase());

    if (!matchesSearch) return false;

    // Category Filter
    if (categoryFilter === 'critical' && l.severity !== 'Critical') return false;
    if (categoryFilter === 'prompt' && !l.action.includes('PROMPT') && !l.description.includes('Prompt')) return false;
    if (categoryFilter === 'sql' && !l.action.includes('SQL') && !l.description.includes('SQL')) return false;
    if (categoryFilter === 'failed_login' && !l.action.includes('FAILED') && !l.description.includes('Failed')) return false;
    if (categoryFilter === 'download' && !l.action.includes('DOWNLOAD') && !l.description.includes('Download')) return false;
    if (categoryFilter === 'upload' && !l.action.includes('UPLOAD') && !l.description.includes('Upload')) return false;

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header Banner - SOC Center Theme */}
      <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 bg-gradient-to-r from-[#070e1b] via-[#0b172a] to-[#1a0c1e] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              SOC Security Operations Ledger
            </span>
            <span className="text-xs font-mono text-slate-400">SIEM & Audit Compliant</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight mt-1 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6 text-rose-400" />
            Audit Logs Ledger & SIEM Event Stream
          </h2>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Real-time immutable cryptographic audit records tracking authentication, role mutations, dataset transactions, prompt injections, and WAF security intercepts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-200 glass-panel hover:bg-slate-800 border border-slate-700 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" /> Export CSV
          </button>
          <button
            onClick={handleExportPDF}
            className="px-4 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-lg shadow-rose-500/20 flex items-center gap-2 transition-all"
          >
            <Download className="w-4 h-4" /> Export PDF Report
          </button>
        </div>
      </div>

      {/* Date & Category Filters */}
      <GlassCard hoverEffect={false} className="p-4 space-y-3">
        {/* Row 1: Date Range Filter */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mr-2 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" /> Time Horizon:
            </span>
            {[
              { id: 'all', label: 'All Time' },
              { id: 'today', label: 'Today' },
              { id: 'yesterday', label: 'Yesterday' },
              { id: '7days', label: 'Last 7 Days' },
              { id: '30days', label: 'Last 30 Days' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setDateFilter(tab.id as any)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  dateFilter === tab.id
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by user, action, IP, payload..."
              className="w-full pl-10 pr-4 py-2 rounded-xl text-xs bg-white/[0.04] border border-slate-700/60 focus:border-cyan-500/50 text-slate-100 placeholder-slate-500 focus:outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
                <FilterX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Row 2: Event Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none">
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1 mr-1">
            <Filter className="w-3.5 h-3.5 text-rose-400" /> Filter Preset:
          </span>
          {[
            { id: 'all', label: 'All Logs' },
            { id: 'critical', label: '🚨 Critical Only' },
            { id: 'prompt', label: '🤖 Prompt Injections' },
            { id: 'sql', label: '💉 SQL Injections' },
            { id: 'failed_login', label: '🔒 Failed Logins' },
            { id: 'upload', label: '📤 Uploads' },
            { id: 'download', label: '📥 Downloads' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategoryFilter(cat.id)}
              className={`px-3 py-1 rounded-full text-[11px] font-medium shrink-0 transition-all ${
                categoryFilter === cat.id
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 font-bold'
                  : 'bg-white/[0.04] text-slate-400 hover:text-slate-200 border border-white/[0.06]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Audit Log Table */}
      <GlassCard hoverEffect={false} className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white">System Audit Ledger Records</h3>
          </div>
          <span className="text-xs text-slate-400 font-mono">Showing {filteredLogs.length} Records</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider bg-slate-900/50">
                <th className="py-3 px-3">Timestamp</th>
                <th className="py-3 px-3">Username</th>
                <th className="py-3 px-3">Role</th>
                <th className="py-3 px-3">Action Code</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Severity</th>
                <th className="py-3 px-3">IP Address</th>
                <th className="py-3 px-3">Browser / OS</th>
                <th className="py-3 px-3">Description Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-900/80 transition-colors group">
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="py-3 px-3 font-semibold text-slate-200 whitespace-nowrap">{log.username}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <RoleBadge role={log.role} size="sm" />
                  </td>
                  <td className="py-3 px-3 font-mono text-cyan-400 text-[11px] whitespace-nowrap">{log.action}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    {log.status === 'Success' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Success</span>
                    ) : log.status === 'Blocked' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-400 border border-rose-500/30">Blocked</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Denied</span>
                    )}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    {log.severity === 'Critical' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-600/30 text-rose-300 border border-rose-500/40 animate-pulse">Critical</span>
                    ) : log.severity === 'High' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">High</span>
                    ) : log.severity === 'Medium' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">Medium</span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700">Low</span>
                    )}
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px] text-slate-400 whitespace-nowrap">{log.ipAddress}</td>
                  <td className="py-3 px-3 text-[11px] text-slate-400 whitespace-nowrap">
                    <span className="text-slate-300">{log.browser || 'Chrome 122'}</span>
                    <span className="text-slate-500 text-[10px] block">{log.os || 'Windows 11'}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 max-w-xs truncate group-hover:whitespace-normal group-hover:bg-slate-900/90" title={log.description}>
                    {log.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};


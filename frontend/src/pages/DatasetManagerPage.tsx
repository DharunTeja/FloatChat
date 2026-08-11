import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GlassCard } from '../components/common/GlassCard';
import { DatasetItem } from '../types';
import { 
  Database, Search, Filter, Trash2, Eye, FileCode, 
  CheckCircle2, AlertTriangle, ShieldCheck, RefreshCw, ChevronLeft, ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const DatasetManagerPage: React.FC = () => {
  const { datasets, deleteDataset } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [formatFilter, setFormatFilter] = useState<string>('all');
  const [previewModalDataset, setPreviewModalDataset] = useState<DatasetItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredDatasets = datasets.filter((ds) => {
    const matchesSearch = ds.filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ds.sha256.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ds.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = formatFilter === 'all' || ds.format === formatFilter;
    return matchesSearch && matchesFormat;
  });

  const handleDelete = (id: string) => {
    deleteDataset(id);
    setDeleteConfirmId(null);
    addToast('info', 'Dataset Removed', `Dataset ID ${id} deleted from repository.`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 to-ocean-950/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Dataset Manager</h2>
          <p className="text-xs text-slate-300 mt-1">Manage NetCDF binary datasets, inspect SHA-256 cryptographic hashes, and resolve duplicate files.</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#/upload"
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-ocean-500 to-cyan-500 hover:from-ocean-400 hover:to-cyan-400 shadow-lg shadow-cyan-500/20"
          >
            + Upload New File
          </a>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <GlassCard hoverEffect={false} className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by filename, SHA-256 checksum, or uploader..."
            className="w-full pl-10 pr-4 py-2 rounded-xl text-xs glass-input placeholder-slate-400"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2 text-xs text-slate-300">
            <Filter className="w-3.5 h-3.5 text-cyan-400" /> Filter:
          </div>
          <select
            value={formatFilter}
            onChange={(e) => setFormatFilter(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs glass-input bg-slate-900 text-slate-200"
          >
            <option value="all">All Formats</option>
            <option value=".nc">.nc (NetCDF)</option>
            <option value=".csv">.csv</option>
            <option value=".json">.json</option>
          </select>
        </div>
      </GlassCard>

      {/* Dataset Ledger Table */}
      <GlassCard hoverEffect={false} className="space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Filename</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">SHA-256 Hash</th>
                <th className="py-3 px-4">Uploaded By</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4">Duplicate Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredDatasets.map((ds) => (
                <tr key={ds.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    {ds.filename}
                  </td>
                  <td className="py-3 px-4 font-mono text-cyan-400">{ds.format}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{ds.fileSize}</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400 max-w-[120px] truncate" title={ds.sha256}>
                    {ds.sha256.slice(0, 16)}...
                  </td>
                  <td className="py-3 px-4 text-slate-300">{ds.uploadedBy}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {ds.verificationStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    {ds.duplicateStatus === 'Duplicate Found' ? (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center gap-1 w-fit">
                        <AlertTriangle className="w-3 h-3" /> Duplicate
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                        Unique
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => setPreviewModalDataset(ds)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Preview Metadata"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                    {user?.role === 'Admin' && (
                      <button
                        onClick={() => setDeleteConfirmId(ds.id)}
                        className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                        title="Delete Dataset"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800 text-xs text-slate-400">
          <span>Showing 1 to {filteredDatasets.length} of {datasets.length} entries</span>
          <div className="flex items-center gap-2">
            <button disabled className="p-1.5 rounded-lg bg-slate-800 opacity-40">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-3 py-1 rounded-lg bg-cyan-500/20 text-cyan-300 font-mono font-bold">1</span>
            <button disabled className="p-1.5 rounded-lg bg-slate-800 opacity-40">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassCard>

      {/* Metadata Preview Modal */}
      <AnimatePresence>
        {previewModalDataset && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-6 rounded-3xl border border-cyan-500/30 max-w-lg w-full space-y-4"
            >
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Database className="w-4 h-4 text-cyan-400" /> Metadata Inspection: {previewModalDataset.filename}
                </h3>
                <button onClick={() => setPreviewModalDataset(null)} className="text-slate-400 hover:text-white">✕</button>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Latitude / Longitude</span>
                  <span className="font-mono text-cyan-400 mt-1 block">{previewModalDataset.metadata.latitude}°, {previewModalDataset.metadata.longitude}°</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Temperature</span>
                  <span className="font-mono text-cyan-400 mt-1 block">{previewModalDataset.metadata.temperature} °C</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Salinity</span>
                  <span className="font-mono text-cyan-400 mt-1 block">{previewModalDataset.metadata.salinity} PSU</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block">Depth</span>
                  <span className="font-mono text-cyan-400 mt-1 block">{previewModalDataset.metadata.depth} m</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[10px] space-y-1">
                <span className="text-slate-400 block font-bold uppercase">SHA-256 Checksum</span>
                <code className="text-cyan-300 break-all block">{previewModalDataset.sha256}</code>
              </div>

              <button
                onClick={() => setPreviewModalDataset(null)}
                className="w-full py-2.5 rounded-xl text-xs font-bold text-white bg-slate-800 hover:bg-slate-700"
              >
                Close Metadata Inspector
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="glass-panel p-6 rounded-3xl border border-rose-500/30 max-w-sm w-full space-y-4 text-center"
            >
              <div className="w-12 h-12 mx-auto rounded-2xl bg-rose-500/10 text-rose-400 flex items-center justify-center border border-rose-500/20">
                <Trash2 className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-white">Confirm Dataset Deletion?</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                This action will purge dataset ID <span className="text-rose-400 font-mono">{deleteConfirmId}</span> from the repository.
              </p>
              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2 rounded-xl text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 shadow-lg shadow-rose-500/25"
                >
                  Delete Dataset
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

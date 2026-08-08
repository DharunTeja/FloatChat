import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { GlassCard } from '../components/common/GlassCard';
import { ProgressBar } from '../components/common/SkeletonLoader';
import { 
  UploadCloud, FileCode, CheckCircle2, AlertTriangle, 
  ShieldCheck, Database, RefreshCw, Layers, Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const UploadPage: React.FC = () => {
  const { datasets, addDataset } = useData();
  const { user } = useAuth();
  const { addToast } = useToast();

  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [lastUploaded, setLastUploaded] = useState<any>(null);

  // Simulated drop/select upload handler
  const handleFileSimulated = (filename = 'argo_subpolar_profile_2026.nc', format: '.nc' | '.csv' | '.json' = '.nc') => {
    setIsUploading(true);
    setUploadProgress(10);
    setLastUploaded(null);

    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);

          // Simulated extracted metadata
          const lat = parseFloat((Math.random() * 80 - 40).toFixed(2));
          const lon = parseFloat((Math.random() * 360 - 180).toFixed(2));
          const temp = parseFloat((Math.random() * 25 + 2).toFixed(1));
          const pres = parseFloat((Math.random() * 1500 + 500).toFixed(1));
          const sal = parseFloat((Math.random() * 5 + 33.5).toFixed(2));
          const depth = Math.floor(Math.random() * 2000 + 200);

          const newDS = {
            filename,
            fileSize: `${(Math.random() * 30 + 10).toFixed(1)} MB`,
            format,
            duplicateStatus: 'Unique' as const,
            uploadedBy: user?.name || 'Dr. Sarah Jenkins',
            rowCount: Math.floor(Math.random() * 100000 + 50000),
            metadata: { latitude: lat, longitude: lon, temperature: temp, pressure: pres, salinity: sal, depth }
          };

          addDataset(newDS);
          setLastUploaded(newDS);
          addToast('upload_completed', 'Upload Verified', `${filename} uploaded with SHA-256 checksum.`);
          return 100;
        }
        return prev + 20;
      });
    }, 200);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 to-ocean-950/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Upload Ocean Dataset</h2>
          <p className="text-xs text-slate-300 mt-1">Upload NetCDF (.nc), CSV, or JSON ARGO profiles. Automated SHA-256 integrity validation & metadata extraction.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-xs font-semibold text-cyan-400">
          <ShieldCheck className="w-4 h-4" /> SHA-256 Engine Active
        </div>
      </div>

      {/* Drag & Drop Upload Zone */}
      <GlassCard hoverEffect={false} className="p-8 text-center space-y-6">
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragging(false);
            const files = e.dataTransfer.files;
            if (files.length > 0) {
              const name = files[0].name;
              const ext = name.endsWith('.csv') ? '.csv' : name.endsWith('.json') ? '.json' : '.nc';
              handleFileSimulated(name, ext);
            }
          }}
          className={`border-2 border-dashed rounded-3xl p-10 transition-all cursor-pointer ${
            isDragging
              ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
              : 'border-slate-700/80 hover:border-cyan-500/50 bg-slate-900/50'
          }`}
          onClick={() => handleFileSimulated('argo_subpolar_profile_2026.nc', '.nc')}
        >
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-cyan-400 to-ocean-600 flex items-center justify-center shadow-xl shadow-cyan-500/30">
            <UploadCloud className="w-8 h-8 text-white animate-bounce" />
          </div>

          <div className="space-y-2 mt-4">
            <h3 className="text-lg font-bold text-white">Drag & Drop NetCDF Dataset Here</h3>
            <p className="text-xs text-slate-400">Supported Formats: <span className="text-cyan-400 font-mono font-bold">.nc</span>, <span className="text-cyan-400 font-mono font-bold">.csv</span>, <span className="text-cyan-400 font-mono font-bold">.json</span> (Max File Size: 2 GB)</p>
            <p className="text-[11px] text-slate-500">Or click anywhere to simulate dataset upload</p>
          </div>
        </div>

        {/* Quick Sample Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <span className="text-xs text-slate-400">Sample Upload Presets:</span>
          <button
            onClick={() => handleFileSimulated('argo_pacific_deep_2026.nc', '.nc')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-mono border border-slate-700"
          >
            + Pacific_Deep.nc
          </button>
          <button
            onClick={() => handleFileSimulated('atlantic_salinity_curve.csv', '.csv')}
            className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 font-mono border border-slate-700"
          >
            + Atlantic_Salinity.csv
          </button>
        </div>

        {/* Upload Progress Bar */}
        {isUploading && (
          <div className="max-w-md mx-auto space-y-2 pt-2">
            <ProgressBar progress={uploadProgress} label="Extracting NetCDF Header & Hashing SHA-256..." />
          </div>
        )}
      </GlassCard>

      {/* Extracted Metadata Preview & SHA-256 Hash Card */}
      <AnimatePresence>
        {lastUploaded && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
          >
            <GlassCard hoverEffect={false} className="space-y-4 border-cyan-500/40">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-sm font-bold text-white">Extracted Metadata & SHA-256 Verification</h3>
                </div>
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Verification Status: PASSED
                </span>
              </div>

              {/* Extracted Metadata Table */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {[
                  { label: 'Latitude', val: `${lastUploaded.metadata.latitude}°` },
                  { label: 'Longitude', val: `${lastUploaded.metadata.longitude}°` },
                  { label: 'Temperature', val: `${lastUploaded.metadata.temperature} °C` },
                  { label: 'Pressure', val: `${lastUploaded.metadata.pressure} dbar` },
                  { label: 'Salinity', val: `${lastUploaded.metadata.salinity} PSU` },
                  { label: 'Depth', val: `${lastUploaded.metadata.depth} m` }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
                    <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{item.label}</span>
                    <span className="text-sm font-extrabold text-cyan-400 font-mono mt-1 block">{item.val}</span>
                  </div>
                ))}
              </div>

              {/* SHA-256 Hash Display */}
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 space-y-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Generated SHA-256 Checksum Hash</span>
                <code className="text-xs font-mono text-cyan-300 break-all select-all">
                  e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855
                </code>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Upload History Table */}
      <GlassCard hoverEffect={false} className="space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-cyan-400" />
            Upload History & Duplicate Detection Ledger
          </h3>
          <span className="text-xs text-slate-400">Total Files: {datasets.length}</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4">Filename</th>
                <th className="py-3 px-4">Format</th>
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">SHA-256 Hash</th>
                <th className="py-3 px-4">Uploaded By</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Verification</th>
                <th className="py-3 px-4">Duplicate Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {datasets.map((ds) => (
                <tr key={ds.id} className="hover:bg-slate-900/60 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-200 flex items-center gap-2">
                    <FileCode className="w-4 h-4 text-cyan-400" />
                    {ds.filename}
                  </td>
                  <td className="py-3 px-4 font-mono text-cyan-400">{ds.format}</td>
                  <td className="py-3 px-4 text-slate-300 font-mono">{ds.fileSize}</td>
                  <td className="py-3 px-4 font-mono text-[10px] text-slate-400 max-w-[140px] truncate" title={ds.sha256}>
                    {ds.sha256.slice(0, 16)}...
                  </td>
                  <td className="py-3 px-4 text-slate-300">{ds.uploadedBy}</td>
                  <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">{ds.uploadDate}</td>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
};

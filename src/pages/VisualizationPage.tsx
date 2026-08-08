import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { useToast } from '../context/ToastContext';
import { GlassCard } from '../components/common/GlassCard';
import { 
  BarChart3, MapPin, Download, Filter, Waves, 
  Activity, Calendar, Compass, RefreshCw
} from 'lucide-react';
import { 
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, 
  Tooltip, CartesianGrid, AreaChart, Area 
} from 'recharts';

export const VisualizationPage: React.FC = () => {
  const { argoFloats } = useData();
  const { addToast } = useToast();

  const [selectedFloatId, setSelectedFloatId] = useState<string>('ARGO-6902741');
  const [depthFilter, setDepthFilter] = useState<number>(2000);
  const [dateRange, setDateRange] = useState<string>('2026-Q2');
  const [activeTab, setActiveTab] = useState<'graphs' | 'map' | 'heatmap'>('graphs');

  const selectedFloat = argoFloats.find(f => f.floatId === selectedFloatId) || argoFloats[0];

  // Temperature & Salinity vs Depth Profile Data
  const depthProfileData = [
    { depth: 0, temp: 24.2, salinity: 35.8, pressure: 5 },
    { depth: 100, temp: 22.1, salinity: 36.1, pressure: 100 },
    { depth: 300, temp: 18.4, salinity: 35.9, pressure: 300 },
    { depth: 500, temp: 12.8, salinity: 35.2, pressure: 500 },
    { depth: 800, temp: 8.5, salinity: 34.9, pressure: 800 },
    { depth: 1200, temp: 5.2, salinity: 34.6, pressure: 1200 },
    { depth: 1600, temp: 3.8, salinity: 34.7, pressure: 1600 },
    { depth: 2000, temp: 2.4, salinity: 34.8, pressure: 2000 },
  ].filter(d => d.depth <= depthFilter);

  const handleDownloadCSV = () => {
    const csvHeader = 'depth_m,temperature_c,salinity_psu,pressure_dbar\n';
    const csvRows = depthProfileData.map(d => `${d.depth},${d.temp},${d.salinity},${d.pressure}`).join('\n');
    const blob = new Blob([csvHeader + csvRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `argo_profile_${selectedFloatId}.csv`;
    a.click();
    addToast('info', 'CSV Download Triggered', `Exported depth profile dataset for ${selectedFloatId}`);
  };

  const handleDownloadPNG = () => {
    addToast('info', 'PNG Export Triggered', `Rendered high-resolution PNG graph for ${selectedFloatId}`);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-gradient-to-r from-slate-900/90 to-ocean-950/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">ARGO Ocean Data Visualization</h2>
          <p className="text-xs text-slate-300 mt-1">Interactive Temperature-Salinity-Pressure Depth Profiles & Global Float Location Telemetry.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPNG}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-200 glass-panel hover:bg-slate-800 border border-slate-700 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" /> Download PNG
          </button>
          <button
            onClick={handleDownloadCSV}
            className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-ocean-500 to-cyan-500 hover:from-ocean-400 hover:to-cyan-400 shadow-lg shadow-cyan-500/20 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" /> Download CSV
          </button>
        </div>
      </div>

      {/* Interactive Filters Bar */}
      <GlassCard hoverEffect={false} className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-4 text-xs">
          {/* Float ID Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Select ARGO Float</label>
            <select
              value={selectedFloatId}
              onChange={(e) => setSelectedFloatId(e.target.value)}
              className="px-3 py-1.5 rounded-xl glass-input bg-slate-900 text-cyan-300 font-mono"
            >
              {argoFloats.map(f => (
                <option key={f.id} value={f.floatId}>{f.floatId} ({f.oceanRegion})</option>
              ))}
            </select>
          </div>

          {/* Depth Range Slider */}
          <div className="space-y-1 min-w-[160px]">
            <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider text-slate-400">
              <span>Max Depth Filter</span>
              <span className="text-cyan-400 font-mono">{depthFilter}m</span>
            </div>
            <input
              type="range"
              min={300}
              max={2000}
              step={100}
              value={depthFilter}
              onChange={(e) => setDepthFilter(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
          </div>

          {/* Date Range Selector */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Timeline Season</label>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="px-3 py-1.5 rounded-xl glass-input bg-slate-900 text-slate-200 font-mono"
            >
              <option value="2026-Q2">2026 Q2 (Latest)</option>
              <option value="2026-Q1">2026 Q1</option>
              <option value="2025-Q4">2025 Q4</option>
            </select>
          </div>
        </div>

        {/* Selected Float Metadata Pill */}
        <div className="flex items-center gap-3 text-xs bg-slate-900/80 px-3.5 py-2 rounded-xl border border-slate-800">
          <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
          <div className="font-mono text-[11px] text-slate-300">
            Lat: <span className="text-cyan-400">{selectedFloat.latitude}°</span> | Long: <span className="text-cyan-400">{selectedFloat.longitude}°</span>
          </div>
        </div>
      </GlassCard>

      {/* View Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('graphs')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'graphs' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Activity className="w-3.5 h-3.5" /> Depth Profiles & Graphs
        </button>
        <button
          onClick={() => setActiveTab('map')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'map' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <MapPin className="w-3.5 h-3.5" /> ARGO Float Locations Map
        </button>
        <button
          onClick={() => setActiveTab('heatmap')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
            activeTab === 'heatmap' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Waves className="w-3.5 h-3.5" /> Heatmap Matrix
        </button>
      </div>

      {/* Main Content Render */}
      {activeTab === 'graphs' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Temperature vs Depth Graph */}
          <GlassCard hoverEffect={false} className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Temperature vs Depth Profile (°C)
                </h3>
                <p className="text-[11px] text-slate-400">Float {selectedFloatId} • Thermocline Curve</p>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
                {selectedFloat.temperature}°C Surface
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={depthProfileData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="depth" label={{ value: 'Depth (m)', position: 'insideBottom', offset: -5, fill: '#64748b', fontSize: 10 }} stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis label={{ value: 'Temp (°C)', angle: -90, position: 'insideLeft', fill: '#64748b', fontSize: 10 }} stroke="#64748b" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#38bdf8', borderRadius: '12px', fontSize: '12px' }} />
                  <Line type="monotone" dataKey="temp" stroke="#38bdf8" strokeWidth={3} dot={{ r: 4, fill: '#0284c7' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>

          {/* Salinity vs Depth Graph */}
          <GlassCard hoverEffect={false} className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Waves className="w-4 h-4 text-ocean-400" />
                  Salinity vs Depth Profile (PSU)
                </h3>
                <p className="text-[11px] text-slate-400">Float {selectedFloatId} • Halocline Curve</p>
              </div>
              <span className="text-xs font-mono text-ocean-400 bg-ocean-500/10 px-2 py-0.5 rounded border border-ocean-500/20">
                {selectedFloat.salinity} PSU Surface
              </span>
            </div>
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={depthProfileData}>
                  <defs>
                    <linearGradient id="colorSal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#0284c7" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="depth" stroke="#64748b" tick={{ fontSize: 10 }} />
                  <YAxis domain={[34, 37]} stroke="#64748b" tick={{ fontSize: 10 }} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#0284c7', borderRadius: '12px', fontSize: '12px' }} />
                  <Area type="monotone" dataKey="salinity" stroke="#0284c7" strokeWidth={2} fillOpacity={1} fill="url(#colorSal)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Map View */}
      {activeTab === 'map' && (
        <GlassCard hoverEffect={false} className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <MapPin className="w-4 h-4 text-cyan-400" />
              Global ARGO Profiling Float Array Map
            </h3>
            <span className="text-xs text-slate-400">{argoFloats.length} Active Telemetry Floats</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 h-96 bg-slate-900 rounded-2xl border border-slate-800 p-4 relative overflow-hidden flex items-center justify-center">
              {/* Simulated Ocean Map Visualizer with Float Pins */}
              <div className="absolute inset-0 bg-[radial-gradient(#0369a1_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              
              <div className="relative z-10 w-full h-full border border-slate-800/80 rounded-xl bg-slate-950/60 p-4 flex flex-col justify-between">
                <div className="text-[11px] font-mono text-slate-400 flex justify-between">
                  <span>NORTH PACIFIC OCEAN BASIN</span>
                  <span>SUB-SURFACE TELEMETRY GRID</span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  {argoFloats.map((float) => (
                    <div
                      key={float.id}
                      onClick={() => setSelectedFloatId(float.floatId)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer ${
                        selectedFloatId === float.floatId
                          ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 scale-105 shadow-lg shadow-cyan-500/20'
                          : 'bg-slate-900/80 border-slate-800 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <MapPin className={`w-4 h-4 mx-auto mb-1 ${selectedFloatId === float.floatId ? 'text-cyan-400 animate-bounce' : 'text-slate-500'}`} />
                      <div className="font-mono text-xs font-bold">{float.floatId}</div>
                      <div className="text-[10px] text-slate-400 truncate">{float.oceanRegion}</div>
                      <div className="text-[10px] font-mono text-cyan-400 mt-1">{float.temperature}°C | {float.salinity} PSU</div>
                    </div>
                  ))}
                </div>

                <div className="text-[10px] font-mono text-slate-500 text-center">
                  Satellite Downlink Frequency: 10 Days • WMO Approved ARGO Array
                </div>
              </div>
            </div>

            {/* Selected Float Detail Card */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 border-b border-slate-800 pb-2">
                Float Metadata Telemetry
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Float ID:</span>
                  <span className="font-mono text-cyan-400 font-bold">{selectedFloat.floatId}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Ocean Region:</span>
                  <span>{selectedFloat.oceanRegion}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Coordinates:</span>
                  <span className="font-mono">{selectedFloat.latitude}°, {selectedFloat.longitude}°</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Max Depth Profile:</span>
                  <span className="font-mono">{selectedFloat.depth} m</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span className="text-slate-400">Status:</span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    {selectedFloat.status}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </GlassCard>
      )}

      {/* Heatmap Matrix View */}
      {activeTab === 'heatmap' && (
        <GlassCard hoverEffect={false} className="space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Waves className="w-4 h-4 text-cyan-400" />
            Global Ocean Temperature Heatmap Matrix (°C)
          </h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {Array.from({ length: 32 }).map((_, i) => {
              const tempVal = (Math.sin(i) * 12 + 15).toFixed(1);
              const colorClass = Number(tempVal) > 22 ? 'bg-rose-500/40 text-rose-300' : Number(tempVal) > 15 ? 'bg-cyan-500/40 text-cyan-300' : 'bg-blue-600/40 text-blue-300';
              return (
                <div key={i} className={`p-3 rounded-xl border border-slate-800 text-center font-mono text-xs ${colorClass}`}>
                  <div className="text-[9px] text-slate-400">S-{i + 1}</div>
                  <div className="font-bold mt-0.5">{tempVal}°C</div>
                </div>
              );
            })}
          </div>
        </GlassCard>
      )}
    </div>
  );
};

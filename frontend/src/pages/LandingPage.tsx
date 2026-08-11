import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Waves, Sparkles, ShieldCheck, Database, Cpu, Lock, 
  ArrowRight, Compass, Activity, Server, FileCode, CheckCircle2,
  Globe, Layers, ChevronRight, Play, X, BarChart3, MessageSquare, Search, LayoutDashboard, Bot
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [stats, setStats] = useState({ datasets: 0, queries: 0, profiles: 0, blocked: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        datasets: Math.min(prev.datasets + 150, 12450),
        queries: Math.min(prev.queries + 300, 48500),
        profiles: Math.min(prev.profiles + 1500, 142000),
        blocked: Math.min(prev.blocked + 20, 1204)
      }));
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-white relative font-sans">
      
      {/* Animated Ocean Background */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Gradients */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-[radial-gradient(circle_at_50%_50%,#0284c7_0%,transparent_50%)] blur-[120px] opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[100%] h-[100%] bg-[radial-gradient(circle_at_50%_50%,#0369a1_0%,transparent_60%)] blur-[150px] opacity-20"></div>
        
        {/* Floating Glowing Particles */}
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cyan-400 blur-[2px]"
            style={{
              width: Math.random() * 6 + 2 + 'px',
              height: Math.random() * 6 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}

        {/* Animated ARGO floats */}
        {Array.from({ length: 7 }).map((_, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute w-1.5 h-10 bg-amber-400/30 rounded-full blur-[1px]"
            style={{ left: (i * 15 + 5) + '%', bottom: '15%' }}
            animate={{ y: [0, -40, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        {/* Rotating globe overlay */}
        <motion.div 
          className="absolute right-[-15%] top-[5%] w-[600px] h-[600px] rounded-full border border-cyan-500/10 bg-cyan-500/5 blur-[80px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 max-w-7xl mx-auto px-6 py-6 flex items-center justify-between glass-panel border-b border-slate-800/50 rounded-b-3xl sticky top-0 backdrop-blur-xl bg-slate-950/70">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-ocean-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Waves className="w-5 h-5 text-white animate-pulse" />
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white">Float<span className="text-cyan-400">Chat</span></h1>
        </div>

        <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-slate-300">
          <a href="#" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#features" className="hover:text-cyan-400 transition-colors">Features</a>
          <a href="#security" className="hover:text-cyan-400 transition-colors">Security</a>
          <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">Contact</a>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="#/login"
            className="px-5 py-2 rounded-xl text-sm font-bold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 transition-all shadow-md"
          >
            Sign In
          </a>
          <a
            href="#/register"
            className="px-5 py-2 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-ocean-500 to-cyan-500 hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20"
          >
            Create Account
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-40 max-w-7xl mx-auto px-6 pt-20 pb-32 flex flex-col lg:flex-row items-center gap-16">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-cyan-500/30 text-xs font-bold text-cyan-300 shadow-xl bg-cyan-500/10"
          >
            <Sparkles className="w-4 h-4 text-cyan-400 animate-spin" />
            AI-Powered Conversational Interface
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1]"
          >
            Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">FloatChat</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-slate-300 leading-relaxed font-normal max-w-2xl"
          >
            AI Powered Ocean Data Discovery and Visualization Platform
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="#/login"
              className="group relative px-8 py-4 rounded-2xl font-bold text-base text-white bg-gradient-to-r from-ocean-500 to-cyan-500 hover:from-ocean-400 hover:to-cyan-400 shadow-[0_0_40px_rgba(6,182,212,0.4)] hover:shadow-[0_0_60px_rgba(6,182,212,0.6)] transition-all flex items-center gap-2 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative flex items-center gap-2">🚀 Let's Explore <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
            </a>
            
            <a
              href="#/register"
              className="px-8 py-4 rounded-2xl font-bold text-base text-slate-200 glass-panel border border-slate-700 hover:bg-slate-800 transition-all flex items-center gap-2"
            >
              Create Account
            </a>
          </motion.div>
        </div>

        {/* Floating Feature Cards */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex-1 relative h-[500px] w-full hidden md:block"
        >
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-10 left-10 p-4 glass-panel border-cyan-500/30 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-md bg-slate-900/80">
            <div className="p-2 bg-blue-500/20 rounded-lg"><Waves className="w-6 h-6 text-blue-400" /></div>
            <span className="font-bold text-white text-sm">Ocean Analytics</span>
          </motion.div>

          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity }} className="absolute top-40 right-0 p-4 glass-panel border-emerald-500/30 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-md bg-slate-900/80">
            <div className="p-2 bg-emerald-500/20 rounded-lg"><Bot className="w-6 h-6 text-emerald-400" /></div>
            <span className="font-bold text-white text-sm">AI Assistant</span>
          </motion.div>

          <motion.div animate={{ y: [0, -15, 0] }} transition={{ duration: 6, repeat: Infinity }} className="absolute bottom-40 left-0 p-4 glass-panel border-rose-500/30 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-md bg-slate-900/80">
            <div className="p-2 bg-rose-500/20 rounded-lg"><Globe className="w-6 h-6 text-rose-400" /></div>
            <span className="font-bold text-white text-sm">Interactive Maps</span>
          </motion.div>

          <motion.div animate={{ y: [0, 20, 0] }} transition={{ duration: 4.5, repeat: Infinity }} className="absolute bottom-10 right-20 p-4 glass-panel border-amber-500/30 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-md bg-slate-900/80">
            <div className="p-2 bg-amber-500/20 rounded-lg"><BarChart3 className="w-6 h-6 text-amber-400" /></div>
            <span className="font-bold text-white text-sm">Data Visualization</span>
          </motion.div>

          <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5.5, repeat: Infinity }} className="absolute top-[40%] left-[30%] p-4 glass-panel border-purple-500/30 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-md bg-slate-900/80">
            <div className="p-2 bg-purple-500/20 rounded-lg"><ShieldCheck className="w-6 h-6 text-purple-400" /></div>
            <span className="font-bold text-white text-sm">Enterprise Security</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-30 max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Platform Capabilities</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Explore the powerful tools we provide for oceanographic data analysis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: MessageSquare, title: 'AI Chat', desc: 'Natural Language Queries for complex datasets.', color: 'text-cyan-400', bg: 'bg-cyan-500/10', border: 'border-cyan-500/30' },
            { icon: Globe, title: 'Ocean Visualization', desc: 'Interactive Maps with real-time ARGO float data.', color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/30' },
            { icon: Search, title: 'Vector Search', desc: 'FAISS powered high-speed similarity search.', color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/30' },
            { icon: Database, title: 'Smart Database', desc: 'PostgreSQL architecture for robust data handling.', color: 'text-indigo-400', bg: 'bg-indigo-500/10', border: 'border-indigo-500/30' },
            { icon: ShieldCheck, title: 'Cyber Security', desc: 'JWT, RBAC, SHA-256, Prompt Injection Protection & Audit Logs.', color: 'text-rose-400', bg: 'bg-rose-500/10', border: 'border-rose-500/30' },
            { icon: LayoutDashboard, title: 'Enterprise Dashboard', desc: 'Comprehensive Analytics and System Monitoring.', color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/30' }
          ].map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`glass-panel p-8 rounded-3xl border ${feature.border} hover:bg-slate-900/80 transition-colors group relative overflow-hidden`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className={`w-14 h-14 rounded-2xl ${feature.bg} flex items-center justify-center mb-6`}>
                  <Icon className={`w-7 h-7 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Architecture Section */}
      <section id="architecture" className="relative z-30 max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">System Architecture</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">An advanced pipeline from raw NetCDF to Interactive Visualization.</p>
        </div>

        <div className="glass-panel p-8 md:p-12 rounded-3xl border-slate-700/50 relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
            {[
              { label: 'NetCDF Upload', icon: FileCode },
              { label: 'Validation', icon: ShieldCheck },
              { label: 'PostgreSQL', icon: Database },
              { label: 'FAISS', icon: Search },
              { label: 'LangChain', icon: Layers },
              { label: 'Groq LLM', icon: Cpu },
              { label: 'Visualization', icon: BarChart3 }
            ].map((step, idx, arr) => (
              <React.Fragment key={idx}>
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.15)] z-10 relative">
                    <step.icon className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold text-slate-300 text-center w-24">{step.label}</span>
                </motion.div>
                {idx < arr.length - 1 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="hidden md:block w-full h-1 bg-gradient-to-r from-cyan-500/50 to-blue-500/50 relative rounded-full"
                  >
                    <motion.div 
                      className="absolute top-0 left-0 h-full w-4 bg-white rounded-full shadow-[0_0_10px_white]"
                      animate={{ left: ['0%', '100%'] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.2 }}
                    />
                  </motion.div>
                )}
                {idx < arr.length - 1 && (
                  <div className="md:hidden h-8 w-1 bg-cyan-500/30"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="relative z-30 max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">Enterprise Security</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Your data is protected by state-of-the-art security measures.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'JWT Authentication', 'Role-Based Access Control', 'HTTPS', 
            'SHA-256 Integrity Verification', 'Prompt Injection Detection', 
            'SQL Injection Protection', 'Audit Logs', 'Zero-Trust Architecture'
          ].map((sec, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="glass-panel p-4 rounded-xl border-emerald-500/20 bg-emerald-500/5 flex items-center gap-3 hover:bg-emerald-500/10 transition-colors"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-xs sm:text-sm font-bold text-slate-200">{sec}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="relative z-30 max-w-7xl mx-auto px-6 py-24 border-t border-slate-800/50">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Datasets Processed', value: stats.datasets.toLocaleString() },
            { label: 'AI Queries', value: stats.queries.toLocaleString() },
            { label: 'Ocean Profiles', value: stats.profiles.toLocaleString() },
            { label: 'Security Events Blocked', value: stats.blocked.toLocaleString() }
          ].map((stat, idx) => (
            <div key={idx} className="text-center space-y-2">
              <div className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="relative z-30 max-w-4xl mx-auto px-6 py-24 border-t border-slate-800/50 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">About FloatChat</h2>
        <p className="text-lg text-slate-300 leading-relaxed">
          FloatChat is an innovative AI-powered conversational interface designed specifically for the discovery and visualization of ARGO ocean datasets. By bridging the gap between complex oceanographic data and natural language processing, FloatChat empowers researchers, government agencies, and students to seamlessly query, analyze, and visualize millions of ocean profiles in real-time, ensuring maximum security and data integrity.
        </p>
      </section>

      {/* Footer */}
      <footer className="relative z-30 border-t border-slate-800 bg-slate-950 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-2">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Waves className="w-5 h-5 text-cyan-400" />
              <span className="text-lg font-bold text-white">FloatChat</span>
            </div>
            <p className="text-xs text-slate-400">Smart India Hackathon 2025</p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-400">
            <span>Built with:</span>
            <span className="text-slate-300">FastAPI</span>
            <span className="text-slate-300">Groq</span>
            <span className="text-slate-300">LangChain</span>
            <span className="text-slate-300">PostgreSQL</span>
            <span className="text-slate-300">FAISS</span>
          </div>
        </div>
      </footer>

      {/* Demo Modal */}
      <AnimatePresence>
        {isDemoModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 max-w-2xl w-full relative shadow-2xl"
            >
              <button 
                onClick={() => setIsDemoModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-white mb-2">FloatChat Overview</h3>
                <p className="text-slate-400 text-sm">Discover how we transform ocean data analysis.</p>
              </div>
              <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center text-slate-500">
                <Play className="w-16 h-16 text-slate-700 mb-4" />
                <p>Demo Video Placeholder</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

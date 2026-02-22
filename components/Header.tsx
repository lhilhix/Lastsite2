import React from 'react';
import { useContent } from '../src/hooks/useContent';
import { motion } from 'framer-motion';

const Header: React.FC = () => {
    const { content, loading } = useContent();

    if (loading || !content) {
        return (
            <header className="bg-gray-50 min-h-[600px] flex items-center justify-center animate-pulse">
                <div className="h-12 bg-gray-200 w-3/4"></div>
            </header>
        );
    }

    return (
        <header className="relative bg-[#F5F5F4] min-h-[700px] md:h-screen overflow-hidden flex flex-col md:flex-row border-b border-black/5">
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

            {/* Left Side: Text Content */}
            <div className="w-full md:w-1/2 h-full flex flex-col justify-center px-8 md:px-20 py-20 md:py-0 relative z-10">
                <motion.div
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="flex items-center gap-3 mb-8">
                        <span className="w-8 h-[1px] bg-yellow-500"></span>
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-400">
                            Precision Engineering
                        </span>
                    </div>

                    <h1 className="text-6xl md:text-[120px] font-bold text-black leading-[0.88] tracking-tighter mb-10">
                        {content.header.title.split('\n').map((line, i) => (
                            <span key={i} className="block">{line}</span>
                        ))}
                    </h1>

                    <div className="max-w-md mb-12">
                        <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-light">
                            {content.header.subtitle}
                        </p>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
                        <a href="#produtos" className="group relative px-10 py-5 bg-black text-white font-bold uppercase text-[10px] tracking-[0.2em] overflow-hidden transition-all hover:pr-14">
                            <span className="relative z-10">Explorar Catálogo</span>
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all">→</span>
                        </a>
                        
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full border border-black/10 flex items-center justify-center text-xs font-bold">
                                01
                            </div>
                            <div className="text-[9px] font-bold uppercase tracking-widest text-gray-400 leading-tight">
                                Automotive<br/>Standards
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Vertical Rail Text */}
                <div className="absolute left-8 bottom-12 hidden md:block">
                    <div className="writing-mode-vertical rotate-180 text-[9px] font-bold uppercase tracking-[0.5em] text-gray-300">
                        EST. 1985 — PORTUGAL
                    </div>
                </div>
            </div>

            {/* Right Side: Visual Showcase */}
            <div className="w-full md:w-1/2 h-[400px] md:h-full relative bg-white md:bg-transparent">
                {/* Large Background Text */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                    <span className="text-[30vw] font-black text-black/[0.02] leading-none uppercase tracking-tighter">
                        BUESO
                    </span>
                </div>

                <motion.div 
                    initial={{ scale: 1.1, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 w-full h-full flex items-center justify-center p-12 md:p-24"
                >
                    <div className="relative w-full max-w-lg aspect-square">
                        {/* Decorative Circles */}
                        <div className="absolute inset-0 border border-yellow-500/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                        <div className="absolute inset-4 border border-black/5 rounded-full"></div>
                        
                        <img 
                            src={content.header.imageUrl || "https://picsum.photos/seed/bueso-part/1000/1000"} 
                            alt="Technical Component" 
                            className="w-full h-full object-contain relative z-10 drop-shadow-[0_35px_35px_rgba(0,0,0,0.15)]"
                            referrerPolicy="no-referrer"
                        />
                    </div>
                </motion.div>

                {/* Tech Specs Overlay */}
                <div className="absolute bottom-12 right-12 z-20 hidden lg:block">
                    <div className="p-6 bg-white/80 backdrop-blur-md border border-black/5 shadow-2xl max-w-[200px]">
                        <div className="text-[9px] font-bold uppercase tracking-widest text-yellow-600 mb-2">Technical Spec</div>
                        <div className="text-xs font-bold text-black mb-1">ISO 9001:2015</div>
                        <div className="text-[10px] text-gray-500 leading-relaxed">
                            Certified precision manufacturing and quality control systems.
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;

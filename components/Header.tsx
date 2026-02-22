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
        <header 
            className="relative bg-black min-h-screen overflow-hidden flex items-center justify-center text-center text-white p-6"
            style={{backgroundImage: `url(${content.header.imageUrl || 'https://picsum.photos/seed/hero-bg/1920/1080'})`, backgroundSize: 'cover', backgroundPosition: 'center'}}
        >
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/50"></div>

            <motion.div
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 max-w-4xl"
            >
                <div className="flex items-center justify-center gap-3 mb-6">
                    <span className="text-sm font-bold uppercase tracking-widest text-yellow-400">
                        Plásticos Bueso
                    </span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter mb-8">
                    {content.header.title.split('\n').map((line, i) => (
                        <span key={i} className="block">{line}</span>
                    ))}
                </h1>

                <div className="max-w-2xl mx-auto mb-10">
                    <p className="text-lg md:text-xl text-neutral-300 leading-relaxed">
                        {content.header.subtitle}
                    </p>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a href="#produtos" className="group relative px-8 py-4 bg-yellow-400 text-black font-bold uppercase text-xs tracking-widest overflow-hidden transition-all shadow-lg hover:shadow-yellow-400/30">
                        <span className="relative z-10">Ver Produtos</span>
                    </a>
                    <a href="#contacto" className="group relative px-8 py-4 bg-transparent border border-neutral-700 text-white font-bold uppercase text-xs tracking-widest overflow-hidden transition-all hover:bg-white hover:text-black">
                        <span className="relative z-10">Fale Connosco</span>
                    </a>
                </div>
            </motion.div>

             {/* Scroll Down Hint */}
            <motion.div 
                initial={{ y: 0, opacity: 0 }}
                animate={{ y: 20, opacity: 1 }}
                transition={{ delay: 1.5, duration: 1.5, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20"
            >
                <div className="w-6 h-10 border-2 border-neutral-500 rounded-full flex justify-center items-start p-1">
                    <div className="w-1 h-2 bg-neutral-500 rounded-full"></div>
                </div>
            </motion.div>
        </header>
    );
};

export default Header;

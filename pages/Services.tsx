import React, { useState } from 'react';
import { useContent } from '../src/hooks/useContent';
import { motion, AnimatePresence } from 'framer-motion';

const ServicesPage: React.FC = () => {
    const { content, loading } = useContent();
    const [activeTab, setActiveTab] = useState(0);

    if (loading || !content) {
        return <div className="text-center py-24 bg-white text-black">A carregar...</div>;
    }

    const activeService = content.services_page.services[activeTab];

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white text-black"
        >
            <header 
                className="py-32 md:py-40 text-center relative bg-cover bg-center"
                style={{backgroundImage: `url(https://picsum.photos/seed/services-hero/1920/1080)`}}
            >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.h1 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="text-4xl md:text-6xl font-black tracking-tighter mb-4 text-yellow-400"
                    >
                        {content.services_page.title}
                    </motion.h1>
                    <motion.p 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="text-lg md:text-xl text-neutral-200 max-w-2xl mx-auto"
                    >
                        {content.services_page.subtitle}
                    </motion.p>
                </div>
            </header>

            <main className="py-16 md:py-24">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center mb-12 md:mb-16 border-b border-neutral-200">
                        {content.services_page.services.map((service: any, index: number) => (
                            <button 
                                key={index}
                                onClick={() => setActiveTab(index)}
                                className={`px-4 md:px-6 py-4 text-xs md:text-sm font-bold uppercase tracking-wider transition-colors relative ${activeTab === index ? 'text-yellow-500' : 'text-neutral-500 hover:text-black'}`}
                            >
                                {service.name}
                                {activeTab === index && (
                                    <motion.div 
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                                        layoutId="underline"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -30 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <div className="grid lg:grid-cols-5 gap-8 md:gap-12 items-start">
                                <div className="lg:col-span-2">
                                    <h3 className="text-3xl font-bold mb-6 tracking-tight text-black">{activeService.name}</h3>
                                    <p className="text-neutral-600 leading-relaxed">{activeService.description}</p>
                                </div>
                                <div className="lg:col-span-3 grid grid-cols-2 gap-4">
                                    {activeService.portfolio.map((item: any, idx: number) => (
                                        <motion.div 
                                            key={idx} 
                                            className="aspect-square bg-neutral-100 overflow-hidden group border border-neutral-200 rounded-lg"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                                        >
                                            <img 
                                                src={item.imageUrl} 
                                                alt={item.caption} 
                                                className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                                            />
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </motion.div>
    );
};

export default ServicesPage;

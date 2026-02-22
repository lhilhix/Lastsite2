import React, { useState, useEffect, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Loader2, Download, ArrowLeft, X } from 'lucide-react';
import CatalogProductCard from '../components/CatalogProductCard';

export interface Product {
    id: number;
    name: string;
    code: string;
    imageUrl: string;
    drawingUrl?: string;
    description: string;
    specs: string[];
    material: string;
    finishType: 'Injeção' | 'Cromagem' | 'Pintura' | 'Metalização';
}

const Catalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [finishFilter, setFinishFilter] = useState<string[]>([]);
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearchQuery(searchQuery), 300);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const featuredProducts = useMemo(() => products.slice(0, 5), [products]);

    const nextSlide = () => setCurrentSlide(p => (p + 1) % featuredProducts.length);
    const prevSlide = () => setCurrentSlide(p => (p - 1 + featuredProducts.length) % featuredProducts.length);

    useEffect(() => {
        if (featuredProducts.length > 0) {
            const timer = setInterval(nextSlide, 5000);
            return () => clearInterval(timer);
        }
    }, [featuredProducts.length]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const finishTypes = useMemo(() => 
        [...new Set(products.map(p => p.finishType))],
        [products]
    );

    const handleFilterChange = (finish: string) => {
        setFinishFilter(prev => 
            prev.includes(finish) ? prev.filter(f => f !== finish) : [...prev, finish]
        );
    };

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
                              product.code.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            const finishMatch = finishFilter.length === 0 || finishFilter.includes(product.finishType);
            return nameMatch && finishMatch;
        });
    }, [products, debouncedSearchQuery, finishFilter]);

    const breakpointColumnsObj = { default: 3, 1100: 3, 700: 2, 500: 1 };

    return (
        <motion.main 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pt-24 pb-20 bg-white text-black min-h-screen"
        >
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-neutral-200 pb-8 mb-8">
                    <div>
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">Catálogo de Produtos</h1>
                        <p className="text-neutral-500 mt-2 text-sm uppercase tracking-widest">Soluções standard e customizadas</p>
                    </div>
                    <div className="flex space-x-2 mt-6 md:mt-0">
                        <a href="#home" className="flex items-center justify-center px-4 py-2 bg-white border border-neutral-300 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-neutral-100 transition">
                            <ArrowLeft size={12} className="mr-2" /> Voltar
                        </a>
                        <a 
                            href="/documents/catalog.pdf" 
                            download="Catalogo_Plasticos_Bueso.pdf"
                            className="flex items-center justify-center px-4 py-2 bg-yellow-400 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition"
                        >
                            <Download size={12} className="mr-2" /> Catálogo PDF
                        </a>
                    </div>
                </div>

                {!loading && featuredProducts.length > 0 && (
                    <div className="relative h-[400px] md:h-[500px] mb-12 md:mb-20 overflow-hidden group rounded-lg">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                className="absolute inset-0"
                            >
                                <img 
                                    src={featuredProducts[currentSlide].imageUrl} 
                                    alt={featuredProducts[currentSlide].name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                                <div className="absolute bottom-0 left-0 p-6 md:p-12">
                                    <motion.span 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3, duration: 0.5 }}
                                        className="text-yellow-400 font-bold text-xs uppercase tracking-[0.3em] mb-4 block"
                                    >
                                        Destaque
                                    </motion.span>
                                    <motion.h2 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4, duration: 0.5 }}
                                        className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-2xl leading-tight"
                                    >
                                        {featuredProducts[currentSlide].name}
                                    </motion.h2>
                                    <motion.a 
                                        href={`#produto/${featuredProducts[currentSlide].id}`}
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.5 }}
                                        className="inline-block mt-4 px-6 py-3 bg-yellow-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-yellow-500 transition"
                                    >
                                        Ver Detalhes
                                    </motion.a>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                        <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition opacity-0 group-hover:opacity-100"><ChevronLeft size={24} /></button>
                        <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition opacity-0 group-hover:opacity-100"><ChevronRight size={24} /></button>
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                            {featuredProducts.map((_, i) => (
                                <button key={i} onClick={() => setCurrentSlide(i)} className={`h-1.5 transition-all duration-300 rounded-full ${currentSlide === i ? 'w-8 bg-yellow-400' : 'w-4 bg-black/20 hover:bg-black/40'}`} />
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid md:grid-cols-12 gap-8">
                    <div className="md:col-span-3">
                        <div className="sticky top-28">
                            <label className="block text-xs font-semibold uppercase text-neutral-500 mb-2">Pesquisar</label>
                            <div className="relative mb-8">
                                <input type="text" placeholder="Nome ou código..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-white border border-neutral-300 p-3 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 rounded-md" />
                                <div className="absolute left-3 top-3.5 h-4 w-4 text-neutral-400">
                                    {searchQuery !== debouncedSearchQuery ? <Loader2 className="animate-spin h-4 w-4" /> : <Search className="h-4 w-4" />}
                                </div>
                            </div>

                            <label className="block text-xs font-semibold uppercase text-neutral-500 mb-4">Acabamento</label>
                            <div className="flex flex-wrap gap-2">
                                {finishTypes.map(finish => (
                                    <button 
                                        key={finish} 
                                        onClick={() => handleFilterChange(finish)}
                                        className={`px-3 py-1.5 text-xs font-bold rounded-full transition-colors ${finishFilter.includes(finish) ? 'bg-yellow-400 text-black' : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'}`}
                                    >
                                        {finish}
                                    </button>
                                ))}
                                {finishFilter.length > 0 && (
                                    <button onClick={() => setFinishFilter([])} className="p-1.5 text-neutral-400 hover:text-black"><X size={14} /></button>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-9">
                        {loading ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                {[...Array(9)].map((_, i) => <div key={i} className="bg-neutral-100 animate-pulse h-64 rounded-lg"></div>)}
                            </div>
                        ) : filteredProducts.length > 0 ? (
                            <Masonry breakpointCols={breakpointColumnsObj} className="flex -ml-8 w-auto" columnClassName="pl-8 bg-clip-padding">
                                {filteredProducts.map(product => (
                                    <div key={product.id} className="mb-8">
                                        <CatalogProductCard product={product} />
                                    </div>
                                ))}
                            </Masonry>
                        ) : (
                            <div className="text-center py-24 bg-neutral-50 rounded-lg">
                                <h3 className="text-lg font-semibold text-black">Nenhum produto encontrado</h3>
                                <p className="text-neutral-500 mt-2">Tente ajustar os filtros para encontrar o que procura.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.main>
    );
};

export default Catalog;

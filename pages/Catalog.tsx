import React, { useState, useEffect, useMemo } from 'react';
import Masonry from 'react-masonry-css';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Search, Loader2 } from 'lucide-react';
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

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
);

const Catalog: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');
    const [finishFilter, setFinishFilter] = useState('all');
    const [currentSlide, setCurrentSlide] = useState(0);

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery]);

    const featuredProducts = products.slice(0, 3);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % featuredProducts.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + featuredProducts.length) % featuredProducts.length);
    };

    useEffect(() => {
        if (featuredProducts.length > 0) {
            const timer = setInterval(nextSlide, 5000);
            return () => clearInterval(timer);
        }
    }, [featuredProducts.length]);

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

    useEffect(() => {
        fetchProducts();
    }, []);

    const finishTypes = useMemo(() => 
        ['all', ...Array.from(new Set(products.map(p => p.finishType)))],
        [products]
    );

    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            const nameMatch = product.name.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
                              product.code.toLowerCase().includes(debouncedSearchQuery.toLowerCase());
            const finishMatch = finishFilter === 'all' || product.finishType === finishFilter;
            return nameMatch && finishMatch;
        });
    }, [products, debouncedSearchQuery, finishFilter]);

    const breakpointColumnsObj = {
        default: 4,
        1100: 3,
        700: 2,
        500: 1
    };

    return (
        <main className="pt-24 pb-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center border-b border-gray-200 pb-8 mb-8">
                    <div>
                        <h1 className="text-4xl font-bold">Catálogo de Produtos</h1>
                        <p className="text-gray-500 mt-2 text-sm uppercase tracking-widest">Soluções standard e customizadas</p>
                    </div>
                    <div className="flex space-x-2 mt-6 md:mt-0">
                        <a href="#home" className="flex items-center justify-center px-4 py-2 bg-white border border-black text-black font-bold text-[10px] uppercase tracking-widest hover:bg-gray-100 transition">
                            <BackIcon /> Voltar
                        </a>
                        <a 
                            href="/documents/catalog.pdf" 
                            download="Catalogo_Plasticos_Bueso.pdf"
                            className="flex items-center justify-center px-4 py-2 bg-yellow-400 text-black font-bold text-[10px] uppercase tracking-widest hover:bg-yellow-500 transition"
                        >
                            <DownloadIcon /> Catálogo PDF
                        </a>
                    </div>
                </div>

                {/* Featured Carousel */}
                {!loading && featuredProducts.length > 0 && (
                    <div className="relative h-[400px] mb-16 overflow-hidden bg-gray-900 group">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.7 }}
                                className="absolute inset-0"
                            >
                                <img 
                                    src={featuredProducts[currentSlide].imageUrl} 
                                    alt={featuredProducts[currentSlide].name}
                                    className="w-full h-full object-cover opacity-60"
                                />
                                <div className="absolute inset-0 flex flex-col justify-center px-12 md:px-24">
                                    <motion.span 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="text-yellow-400 font-bold text-xs uppercase tracking-[0.3em] mb-4"
                                    >
                                        Destaque
                                    </motion.span>
                                    <motion.h2 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-4xl md:text-6xl font-bold text-white mb-6 max-w-2xl leading-tight"
                                    >
                                        {featuredProducts[currentSlide].name}
                                    </motion.h2>
                                    <motion.p 
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-gray-300 max-w-lg mb-8 line-clamp-2"
                                    >
                                        {featuredProducts[currentSlide].description}
                                    </motion.p>
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                    >
                                        <a 
                                            href={`#produto/${featuredProducts[currentSlide].id}`}
                                            className="inline-block px-8 py-3 bg-yellow-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-yellow-500 transition"
                                        >
                                            Ver Detalhes
                                        </a>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Carousel Controls */}
                        <button 
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition opacity-0 group-hover:opacity-100"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <button 
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition opacity-0 group-hover:opacity-100"
                        >
                            <ChevronRight size={24} />
                        </button>

                        {/* Indicators */}
                        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2">
                            {featuredProducts.map((_, i) => (
                                <button 
                                    key={i}
                                    onClick={() => setCurrentSlide(i)}
                                    className={`h-1 transition-all duration-300 ${currentSlide === i ? 'w-8 bg-yellow-400' : 'w-4 bg-white/30'}`}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {/* Filters */}
                <div className="flex flex-col md:flex-row gap-4 mb-12">
                    <div className="w-full md:w-1/2 lg:w-1/3">
                        <label htmlFor="search-filter" className="block text-xs font-semibold uppercase text-gray-500 mb-1">Pesquisar Produto</label>
                        <div className="relative">
                            <input 
                                type="text" 
                                id="search-filter" 
                                placeholder="Nome ou código do produto..."
                                value={searchQuery} 
                                onChange={e => setSearchQuery(e.target.value)} 
                                className="w-full bg-white border border-gray-300 p-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                            <div className="absolute left-3 top-2.5 h-4 w-4 text-gray-400">
                                {searchQuery !== debouncedSearchQuery ? (
                                    <Loader2 className="animate-spin h-4 w-4" />
                                ) : (
                                    <Search className="h-4 w-4" />
                                )}
                            </div>
                        </div>
                    </div>
                     <div className="w-full md:w-1/2 lg:w-1/4">
                        <label htmlFor="finish-filter" className="block text-xs font-semibold uppercase text-gray-500 mb-1">Filtrar por Acabamento</label>
                        <select 
                            id="finish-filter" 
                            value={finishFilter} 
                            onChange={e => setFinishFilter(e.target.value)} 
                            className="w-full bg-white border border-gray-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            {finishTypes.map(finish => (
                                <option key={finish} value={finish}>{finish === 'all' ? 'Todos os Acabamentos' : finish}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="bg-gray-100 animate-pulse h-64 border border-gray-200"></div>
                        ))}
                    </div>
                ) : filteredProducts.length > 0 ? (
                    <Masonry
                        breakpointCols={breakpointColumnsObj}
                        className="flex -ml-8 w-auto"
                        columnClassName="pl-8 bg-clip-padding"
                    >
                        {filteredProducts.map(product => (
                            <div key={product.id} className="mb-8">
                                <CatalogProductCard product={product} />
                            </div>
                        ))}
                    </Masonry>
                ) : (
                    <div className="text-center py-16 bg-gray-50">
                        <h3 className="text-lg font-semibold text-black">Nenhum produto encontrado</h3>
                        <p className="text-gray-600 mt-2">Tente ajustar os filtros para encontrar o que procura.</p>
                    </div>
                )}
            </div>
        </main>
    );
};

export default Catalog;

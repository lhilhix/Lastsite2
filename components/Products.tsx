import React, { useState, useRef, useEffect } from 'react';
import ProductCard from './ProductCard';
import type { DetailedProduct } from '../data/productsData';

const Products: React.FC = () => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [productsData, setProductsData] = useState<DetailedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFeatured = async () => {
            try {
                const response = await fetch('/api/featured-products');
                const data = await response.json();
                setProductsData(data);
            } catch (error) {
                console.error('Error fetching featured products:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeatured();
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = 300;
            carouselRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
        }
    };
    
    return (
        <section id="produtos" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wider text-black">Produtos em Destaque</h2>
                        <p className="text-neutral-500 mt-2 max-w-2xl">Excelência técnica em cada componente produzido.</p>
                    </div>
                    <div className="flex space-x-2 mt-6 md:mt-0">
                        <button onClick={() => scroll('left')} className="w-12 h-12 bg-white shadow-sm border border-neutral-200 text-black hover:bg-neutral-100 transition text-xl rounded-full flex items-center justify-center">‹</button>
                        <button onClick={() => scroll('right')} className="w-12 h-12 bg-white shadow-sm border border-neutral-200 text-black hover:bg-neutral-100 transition text-xl rounded-full flex items-center justify-center">›</button>
                    </div>
                </div>

                <div ref={carouselRef} className="flex overflow-x-auto space-x-8 no-scrollbar snap-x pb-8 px-2 -mx-2">
                    {productsData.map(product => (
                        <a key={product.id} href={`#produto/${product.id}`} className="block w-80 flex-shrink-0 snap-start">
                            <ProductCard 
                                title={product.title} 
                                description={product.description}
                                imageUrl={product.imageUrl}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;

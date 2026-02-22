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
        <section id="produtos" className="py-24 bg-neutral-100">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold uppercase tracking-wider">Produtos em Destaque</h2>
                    <p className="text-gray-500 mt-2 max-w-2xl mx-auto">Excelência técnica em cada componente produzido.</p>
                    <div className="flex justify-center space-x-2 mt-6">
                        <button onClick={() => scroll('left')} className="px-4 py-2 bg-white shadow-sm border border-gray-200 text-black hover:bg-gray-50 transition text-lg rounded-full">←</button>
                        <button onClick={() => scroll('right')} className="px-4 py-2 bg-white shadow-sm border border-gray-200 text-black hover:bg-gray-50 transition text-lg rounded-full">→</button>
                    </div>
                </div>

                <div ref={carouselRef} className="flex overflow-x-auto space-x-8 no-scrollbar snap-x pb-8 px-2">
                    {productsData.map(product => (
                        <a key={product.id} href={`#produto/${product.id}`}>
                            <ProductCard 
                                title={product.title} 
                                description={product.description}
                                imageUrl={product.imageUrl}
                                onClick={() => {}}
                            />
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;

import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import type { Product } from '../pages/Catalog';

interface CatalogProductCardProps {
    product: Product;
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({ product }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <a 
            href={`#produto/${product.id}`}
            className="bg-white border border-neutral-200 h-full flex flex-col transition-all duration-300 hover:border-yellow-400/50 hover:shadow-lg a cursor-pointer group rounded-lg overflow-hidden"
        >
            <div className={`aspect-video bg-neutral-100 ${isLoading ? 'animate-pulse' : ''} overflow-hidden`}>
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} group-hover:scale-110`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <div className="flex-grow">
                    <p className="text-xs text-neutral-500 mb-1 uppercase tracking-widest">{product.code}</p>
                    <h3 className="font-bold text-base mb-3 text-black group-hover:text-yellow-500 transition-colors">{product.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-[10px] bg-neutral-100 px-2 py-1 rounded-full uppercase font-semibold text-neutral-700 border border-neutral-200">
                            {product.material}
                        </span>
                        <span className="text-[10px] bg-yellow-400/20 px-2 py-1 rounded-full uppercase font-semibold text-yellow-800 border border-yellow-400/30">
                            {product.finishType}
                        </span>
                    </div>
                </div>
                 
                 <div className="mt-auto pt-4 border-t border-neutral-200 flex items-center justify-between">
                     <span className="text-xs font-bold uppercase tracking-widest text-yellow-500">Ver Detalhes</span>
                     <ArrowRight size={16} className="text-yellow-500 transform group-hover:translate-x-1 transition-transform" />
                 </div>
            </div>
        </a>
    );
};

export default CatalogProductCard;
import React, { useState } from 'react';
import type { Product } from '../data/catalogProducts';

interface CatalogProductCardProps {
    product: any;
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({ product }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <a 
            href={`#produto/${product.id}`}
            className="bg-white border border-gray-200 h-full flex flex-col transition-all duration-300 hover:scale-[1.02] hover:shadow-lg cursor-pointer group"
        >
            <div className={`aspect-video bg-gray-100 ${isLoading ? 'animate-pulse' : ''} overflow-hidden`}>
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    className={`w-full h-full object-cover transition-all duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'} group-hover:scale-110`}
                    loading="lazy"
                    decoding="async"
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <div className="p-4 flex flex-col flex-grow">
                <div className="flex-grow">
                    <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest">{product.code}</p>
                    <h3 className="font-bold text-base mb-2 group-hover:text-yellow-600 transition-colors">{product.name}</h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                        <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded uppercase font-semibold text-gray-600 border border-gray-200">
                            {product.material}
                        </span>
                        <span className="text-[10px] bg-yellow-50 px-2 py-0.5 rounded uppercase font-semibold text-yellow-700 border border-yellow-200">
                            {product.finishType}
                        </span>
                    </div>
                </div>
                 <p className="text-sm text-gray-600 mt-2 line-clamp-2 leading-relaxed">{product.description}</p>
                 
                 <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                     <span className="text-[10px] font-bold uppercase tracking-widest text-yellow-600">Ver Ficha Técnica</span>
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-600 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                     </svg>
                 </div>
            </div>
        </a>
    );
};

export default CatalogProductCard;
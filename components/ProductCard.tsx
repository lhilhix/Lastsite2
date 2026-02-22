import React from 'react';

interface ProductCardProps {
    title: string;
    description: string;
    imageUrl?: string;
    onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, imageUrl, onClick }) => {
    return (
        <div className="flex flex-col flex-shrink-0 w-[280px] snap-start text-center group cursor-pointer" onClick={onClick}>
            <div className="bg-gray-200 mb-4 overflow-hidden aspect-[4/3] relative">
                <img 
                    src={imageUrl || `https://picsum.photos/seed/${title}/400/300`} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            
            <div className="flex-grow px-1">
                <h3 className="font-bold text-base group-hover:text-yellow-600 transition-colors">{title}</h3>
                <p className="text-sm text-gray-600 my-2">{description}</p>
            </div>

            <div className="pt-2 pb-1">
                <button 
                    className="inline-block text-xs font-bold uppercase tracking-wider text-black border-b border-black group-hover:border-yellow-600 group-hover:text-yellow-600 transition"
                >
                    Saber Mais
                </button>
            </div>
        </div>
    );
};

export default ProductCard;
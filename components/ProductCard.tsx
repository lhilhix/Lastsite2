import React from 'react';

interface ProductCardProps {
    title: string;
    description: string;
    imageUrl?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, description, imageUrl }) => {
    return (
        <div className="flex flex-col bg-white group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <div className="bg-gray-200 overflow-hidden aspect-[4/3] relative">
                <img 
                    src={imageUrl || `https://picsum.photos/seed/${title}/400/300`} 
                    alt={title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                />
            </div>
            
            <div className="flex-grow p-6 text-left">
                <h3 className="font-bold text-base text-black group-hover:text-yellow-600 transition-colors">{title}</h3>
                <p className="text-sm text-gray-600 my-2">{description}</p>
            </div>

            <div className="p-6 pt-0 text-left">
                 <span className="inline-block text-xs font-bold uppercase tracking-wider text-black transition-colors duration-300 border-b border-black group-hover:border-yellow-600 group-hover:text-yellow-600">
                    Saber Mais
                </span>
            </div>
        </div>
    );
};

export default ProductCard;
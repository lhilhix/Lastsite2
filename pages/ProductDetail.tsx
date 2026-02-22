import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ArrowLeft, Package, Shield, Settings, Info } from 'lucide-react';
import type { Product } from './Catalog';

interface ProductDetailProps {
    productId: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/products');
                const data: Product[] = await response.json();
                const found = data.find(p => p.id === productId);
                setProduct(found || null);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
        window.scrollTo(0, 0);
    }, [productId]);

    if (loading) {
        return (
            <div className="pt-32 pb-20 max-w-7xl mx-auto px-6 animate-pulse">
                <div className="h-8 bg-gray-200 w-1/4 mb-8"></div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="aspect-square bg-gray-100"></div>
                    <div className="space-y-4">
                        <div className="h-10 bg-gray-200 w-3/4"></div>
                        <div className="h-6 bg-gray-100 w-1/2"></div>
                        <div className="h-32 bg-gray-50 w-full"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="pt-32 pb-20 text-center">
                <h2 className="text-2xl font-bold mb-4">Produto não encontrado</h2>
                <a href="#catalogo" className="text-yellow-600 hover:underline">Voltar ao catálogo</a>
            </div>
        );
    }

    return (
        <main className="pt-24 pb-20 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto px-6">
                {/* Breadcrumbs / Back */}
                <div className="mb-8">
                    <a 
                        href="#catalogo" 
                        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-gray-400 hover:text-black transition-colors"
                    >
                        <ArrowLeft size={14} className="mr-2" /> Voltar ao Catálogo
                    </a>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Product Image */}
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="relative"
                    >
                        <div className="aspect-square bg-gray-50 border border-gray-100 overflow-hidden rounded-2xl shadow-sm">
                            <img 
                                src={product.imageUrl} 
                                alt={product.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Badges */}
                        <div className="absolute top-6 left-6 flex flex-col gap-2">
                            <span className="bg-black text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                {product.code}
                            </span>
                            <span className="bg-yellow-400 text-black text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow-lg">
                                {product.finishType}
                            </span>
                        </div>
                    </motion.div>

                    {/* Product Info */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex flex-col"
                    >
                        <div className="mb-8">
                            <span className="text-yellow-600 font-bold text-xs uppercase tracking-[0.3em] mb-2 block">
                                Detalhes do Produto
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                {product.name}
                            </h1>
                            <p className="text-gray-500 text-sm uppercase tracking-widest font-medium">
                                Referência: {product.code}
                            </p>
                        </div>

                        <div className="prose prose-neutral max-w-none mb-10">
                            <p className="text-lg text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        {/* Specs Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-4 text-black">
                                    <Package size={20} />
                                    <h3 className="font-bold uppercase text-xs tracking-widest">Material Base</h3>
                                </div>
                                <p className="text-sm font-medium text-gray-700">{product.material}</p>
                            </div>
                            <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
                                <div className="flex items-center gap-3 mb-4 text-black">
                                    <Shield size={20} />
                                    <h3 className="font-bold uppercase text-xs tracking-widest">Acabamento</h3>
                                </div>
                                <p className="text-sm font-medium text-gray-700">{product.finishType}</p>
                            </div>
                        </div>

                        {/* Technical Specifications */}
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Settings size={20} className="text-yellow-600" />
                                <h3 className="font-bold uppercase text-sm tracking-widest">Especificações Técnicas</h3>
                            </div>
                            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden mb-8">
                                <table className="w-full text-sm">
                                    <tbody className="divide-y divide-gray-100">
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest w-1/3">Material</td>
                                            <td className="px-6 py-4 text-gray-700">{product.material}</td>
                                        </tr>
                                        <tr className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">Acabamento</td>
                                            <td className="px-6 py-4 text-gray-700">{product.finishType}</td>
                                        </tr>
                                        {product.specs && product.specs.map((spec, index) => {
                                            const [label, value] = spec.includes(':') ? spec.split(':') : [spec, ''];
                                            return (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                    <td className="px-6 py-4 font-bold text-gray-400 uppercase text-[10px] tracking-widest">
                                                        {label.trim()}
                                                    </td>
                                                    <td className="px-6 py-4 text-gray-700">
                                                        {value.trim()}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>

                            {product.drawingUrl && (
                                <div className="space-y-4">
                                    <h4 className="font-bold uppercase text-xs tracking-widest text-gray-400">Desenho Técnico</h4>
                                    <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 p-4">
                                        {product.drawingUrl.toLowerCase().endsWith('.pdf') ? (
                                            <div className="flex items-center justify-between">
                                                <span className="text-sm font-medium">Ficha Técnica PDF</span>
                                                <a 
                                                    href={product.drawingUrl} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="text-xs font-bold uppercase tracking-widest text-yellow-600 hover:text-yellow-700"
                                                >
                                                    Abrir PDF →
                                                </a>
                                            </div>
                                        ) : (
                                            <img 
                                                src={product.drawingUrl} 
                                                alt="Desenho Técnico" 
                                                className="w-full h-auto rounded-lg shadow-sm"
                                            />
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button 
                                onClick={() => window.location.href = '#contacto'}
                                className="flex-1 bg-black text-white font-bold py-4 uppercase text-xs tracking-widest hover:bg-gray-800 transition shadow-lg"
                            >
                                Solicitar Orçamento
                            </button>
                            {product.drawingUrl ? (
                                <a 
                                    href={product.drawingUrl}
                                    download
                                    className="flex-1 border border-black text-black font-bold py-4 uppercase text-xs tracking-widest hover:bg-gray-50 transition text-center"
                                >
                                    Descarregar Desenho
                                </a>
                            ) : (
                                <button className="flex-1 border border-black text-black font-bold py-4 uppercase text-xs tracking-widest hover:bg-gray-50 transition opacity-50 cursor-not-allowed">
                                    Ficha Indisponível
                                </button>
                            )}
                        </div>
                    </motion.div>
                </div>

                {/* Related Info */}
                <div className="mt-24 pt-16 border-t border-gray-100">
                    <div className="flex items-center gap-3 mb-8">
                        <Info size={24} className="text-yellow-600" />
                        <h2 className="text-2xl font-bold uppercase tracking-tight">Informação Adicional</h2>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm uppercase tracking-widest">Qualidade Certificada</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Todos os nossos produtos seguem rigorosos padrões de qualidade IATF 16949, garantindo a máxima precisão e durabilidade para a indústria automóvel.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm uppercase tracking-widest">Sustentabilidade</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Utilizamos processos de injeção otimizados para reduzir o desperdício de material e priorizamos polímeros recicláveis sempre que as especificações técnicas o permitem.
                            </p>
                        </div>
                        <div className="space-y-3">
                            <h4 className="font-bold text-sm uppercase tracking-widest">Customização</h4>
                            <p className="text-sm text-gray-500 leading-relaxed">
                                Oferecemos soluções à medida, desde o desenvolvimento do molde até ao acabamento final em metalização ou pintura, adaptando-nos às suas necessidades específicas.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default ProductDetail;

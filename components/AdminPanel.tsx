import React, { useState } from 'react';

interface AdminPanelProps {
    onClose: () => void;
    onProductAdded: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onClose, onProductAdded }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [activeTab, setActiveTab] = useState<'add' | 'manage' | 'content' | 'featured' | 'services' | 'catalog'>('add');
    const [products, setProducts] = useState<any[]>([]);
    const [featuredProducts, setFeaturedProducts] = useState<any[]>([]);
    const [services, setServices] = useState<any[]>([]);
    const [content, setContent] = useState<any>(null);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);
    const [isLoadingFeatured, setIsLoadingFeatured] = useState(false);
    const [isLoadingServices, setIsLoadingServices] = useState(false);
    const [isLoadingContent, setIsLoadingContent] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const [name, setName] = useState('');
    const [code, setCode] = useState('');
    const [description, setDescription] = useState('');
    const [material, setMaterial] = useState('');
    const [finishType, setFinishType] = useState('Injeção');
    const [image, setImage] = useState<File | null>(null);
    const [drawing, setDrawing] = useState<File | null>(null);
    const [specs, setSpecs] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [catalogFile, setCatalogFile] = useState<File | null>(null);

    const fetchProducts = async () => {
        setIsLoadingProducts(true);
        try {
            const response = await fetch('/api/products');
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            console.error('Error fetching products:', err);
        } finally {
            setIsLoadingProducts(false);
        }
    };

    const fetchContent = async () => {
        setIsLoadingContent(true);
        try {
            const response = await fetch('/api/content');
            const data = await response.json();
            setContent(data);
        } catch (err) {
            console.error('Error fetching content:', err);
        } finally {
            setIsLoadingContent(false);
        }
    };

    const fetchFeatured = async () => {
        setIsLoadingFeatured(true);
        try {
            const response = await fetch('/api/featured-products');
            const data = await response.json();
            setFeaturedProducts(data);
        } catch (err) {
            console.error('Error fetching featured products:', err);
        } finally {
            setIsLoadingFeatured(false);
        }
    };

    const fetchServices = async () => {
        setIsLoadingServices(true);
        try {
            const response = await fetch('/api/services');
            const data = await response.json();
            setServices(data);
        } catch (err) {
            console.error('Error fetching services:', err);
        } finally {
            setIsLoadingServices(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            const data = await response.json();
            if (data.success) {
                setIsLoggedIn(true);
                setError('');
                fetchProducts();
                fetchContent();
                fetchFeatured();
                fetchServices();
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor');
        }
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!image) {
            setError('Por favor, selecione uma imagem.');
            return;
        }
        setIsSubmitting(true);
        setError('');

        const formData = new FormData();
        formData.append('name', name);
        formData.append('code', code);
        formData.append('description', description);
        formData.append('material', material);
        formData.append('finishType', finishType);
        formData.append('image', image);
        if (drawing) formData.append('drawing', drawing);
        
        // Convert specs string to array
        const specsArray = specs.split('\n').filter(s => s.trim() !== '');
        formData.append('specs', JSON.stringify(specsArray));

        try {
            const response = await fetch('/api/admin/products', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                alert('Produto adicionado com sucesso!');
                onProductAdded();
                setName('');
                setCode('');
                setDescription('');
                setMaterial('');
                setFinishType('Injeção');
                setSpecs('');
                setImage(null);
                setDrawing(null);
                setActiveTab('manage');
                fetchProducts();
            } else {
                const data = await response.json();
                setError(data.message || 'Erro ao adicionar produto.');
            }
        } catch (err) {
            setError('Erro ao conectar ao servidor.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleContentUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/admin/content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(content),
            });
            const data = await response.json();
            if (data.success) {
                alert('Conteúdo atualizado com sucesso!');
            } else {
                alert('Erro ao atualizar conteúdo');
            }
        } catch (err) {
            alert('Erro ao conectar ao servidor');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleFeaturedUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/admin/featured-products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(featuredProducts),
            });
            if (response.ok) alert('Produtos destacados atualizados!');
        } catch (err) {
            alert('Erro ao atualizar produtos destacados');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleServicesUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/admin/services', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(services),
            });
            if (response.ok) alert('Serviços atualizados!');
        } catch (err) {
            alert('Erro ao atualizar serviços');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCatalogUpload = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!catalogFile) return;
        setIsSubmitting(true);
        const formData = new FormData();
        formData.append('catalog', catalogFile);
        try {
            const response = await fetch('/api/admin/upload-catalog', {
                method: 'POST',
                body: formData,
            });
            if (response.ok) alert('Catálogo PDF atualizado com sucesso!');
        } catch (err) {
            alert('Erro ao carregar catálogo');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!confirm('Tem a certeza que deseja remover este produto?')) return;

        try {
            const response = await fetch(`/api/admin/products/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (data.success) {
                setProducts(products.filter(p => p.id !== id));
                onProductAdded(); // Refresh catalog
            } else {
                alert('Erro ao remover produto');
            }
        } catch (err) {
            alert('Erro ao conectar ao servidor');
        }
    };

    if (!isLoggedIn) {
        return (
            <div className="p-6">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest">Acesso Restrito</h2>
                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Utilizador</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                            className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Palavra-passe</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                            className="w-full border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button 
                        type="submit" 
                        className="w-full bg-black text-white font-bold py-3 uppercase tracking-widest hover:bg-gray-800 transition"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        );
    }

    return (
        <div className="p-6 max-h-[80vh] overflow-y-auto no-scrollbar">
            <div className="flex border-b border-gray-200 mb-6 overflow-x-auto no-scrollbar whitespace-nowrap">
                <button 
                    onClick={() => setActiveTab('add')}
                    className={`pb-2 px-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'add' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    Novo Prod.
                </button>
                <button 
                    onClick={() => setActiveTab('manage')}
                    className={`pb-2 px-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'manage' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    Gerir ({products.length})
                </button>
                <button 
                    onClick={() => setActiveTab('featured')}
                    className={`pb-2 px-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'featured' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    Destaques
                </button>
                <button 
                    onClick={() => setActiveTab('services')}
                    className={`pb-2 px-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'services' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    Serviços
                </button>
                <button 
                    onClick={() => setActiveTab('content')}
                    className={`pb-2 px-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'content' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    Textos
                </button>
                <button 
                    onClick={() => setActiveTab('catalog')}
                    className={`pb-2 px-4 text-[10px] font-bold uppercase tracking-widest transition-colors ${activeTab === 'catalog' ? 'border-b-2 border-yellow-400 text-black' : 'text-gray-400 hover:text-black'}`}
                >
                    PDF
                </button>
            </div>

            {activeTab === 'add' ? (
                <>
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Novo Produto</h2>
                    <form onSubmit={handleProductSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Nome do Produto</label>
                                <input 
                                    type="text" 
                                    value={name} 
                                    onChange={e => setName(e.target.value)}
                                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Código (Referência)</label>
                                <input 
                                    type="text" 
                                    value={code} 
                                    onChange={e => setCode(e.target.value)}
                                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Descrição</label>
                            <textarea 
                                value={description} 
                                onChange={e => setDescription(e.target.value)}
                                className="w-full border border-gray-300 p-2 h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Material</label>
                                <input 
                                    type="text" 
                                    value={material} 
                                    onChange={e => setMaterial(e.target.value)}
                                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Tipo de Acabamento</label>
                                <select 
                                    value={finishType} 
                                    onChange={e => setFinishType(e.target.value)}
                                    className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                >
                                    <option value="Injeção">Injeção</option>
                                    <option value="Cromagem">Cromagem</option>
                                    <option value="Pintura">Pintura</option>
                                    <option value="Metalização">Metalização</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Especificações (uma por linha)</label>
                            <textarea 
                                value={specs} 
                                onChange={e => setSpecs(e.target.value)}
                                placeholder="Ex: Material: ABS&#10;Resistência: 100°C"
                                className="w-full border border-gray-300 p-2 h-24 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Imagem do Produto</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={e => setImage(e.target.files ? e.target.files[0] : null)}
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Desenho Técnico (Opcional)</label>
                            <input 
                                type="file" 
                                accept="image/*,application/pdf"
                                onChange={e => setDrawing(e.target.files ? e.target.files[0] : null)}
                                className="w-full border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                            />
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

                        <div className="flex space-x-4 pt-4">
                            <button 
                                type="button"
                                onClick={onClose}
                                className="flex-1 border border-black text-black font-bold py-3 uppercase tracking-widest hover:bg-gray-100 transition"
                            >
                                Cancelar
                            </button>
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="flex-1 bg-yellow-400 text-black font-bold py-3 uppercase tracking-widest hover:bg-yellow-500 transition disabled:opacity-50"
                            >
                                {isSubmitting ? 'A guardar...' : 'Adicionar Produto'}
                            </button>
                        </div>
                    </form>
                </>
            ) : activeTab === 'manage' ? (
                <div className="space-y-4">
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Gestão de Produtos</h2>
                    {isLoadingProducts ? (
                        <p className="text-center py-8">A carregar produtos...</p>
                    ) : products.length === 0 ? (
                        <p className="text-center py-8 text-gray-500">Nenhum produto encontrado.</p>
                    ) : (
                        <div className="divide-y divide-gray-200">
                            {products.map(product => (
                                <div key={product.id} className="py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 bg-gray-100 border border-gray-200 overflow-hidden">
                                            <img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase">{product.code}</p>
                                            <h4 className="font-bold text-sm">{product.name}</h4>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={() => handleDelete(product.id)}
                                        className="text-red-500 hover:text-red-700 text-xs font-bold uppercase tracking-widest"
                                    >
                                        Remover
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="pt-6">
                        <button 
                            onClick={onClose}
                            className="w-full border border-black text-black font-bold py-3 uppercase tracking-widest hover:bg-gray-100 transition"
                        >
                            Fechar
                        </button>
                    </div>
                </div>
            ) : activeTab === 'featured' ? (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Produtos Destacados (Home)</h2>
                    {isLoadingFeatured ? <p>A carregar...</p> : (
                        <form onSubmit={handleFeaturedUpdate} className="space-y-8">
                            {featuredProducts.map((p, idx) => (
                                <div key={p.id} className="p-4 border border-gray-200 space-y-4">
                                    <h3 className="font-bold text-xs uppercase text-yellow-600">Destaque {idx + 1}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <input 
                                            type="text" 
                                            placeholder="Título"
                                            value={p.title}
                                            onChange={e => {
                                                const newFeatured = [...featuredProducts];
                                                newFeatured[idx].title = e.target.value;
                                                setFeaturedProducts(newFeatured);
                                            }}
                                            className="w-full border border-gray-300 p-2 text-sm"
                                        />
                                        <input 
                                            type="text" 
                                            placeholder="Descrição Curta"
                                            value={p.description}
                                            onChange={e => {
                                                const newFeatured = [...featuredProducts];
                                                newFeatured[idx].description = e.target.value;
                                                setFeaturedProducts(newFeatured);
                                            }}
                                            className="w-full border border-gray-300 p-2 text-sm"
                                        />
                                    </div>
                                    <textarea 
                                        placeholder="Descrição Detalhada"
                                        value={p.detailedDescription}
                                        onChange={e => {
                                            const newFeatured = [...featuredProducts];
                                            newFeatured[idx].detailedDescription = e.target.value;
                                            setFeaturedProducts(newFeatured);
                                        }}
                                        className="w-full border border-gray-300 p-2 text-sm h-24"
                                    />
                                </div>
                            ))}
                            <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-400 text-black font-bold py-3 uppercase tracking-widest hover:bg-yellow-500 transition">
                                {isSubmitting ? 'A guardar...' : 'Atualizar Destaques'}
                            </button>
                        </form>
                    )}
                </div>
            ) : activeTab === 'services' ? (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Gerir Serviços</h2>
                    {isLoadingServices ? <p>A carregar...</p> : (
                        <form onSubmit={handleServicesUpdate} className="space-y-8">
                            {services.map((s, idx) => (
                                <div key={s.id} className="p-4 border border-gray-200 space-y-4">
                                    <h3 className="font-bold text-xs uppercase text-yellow-600">{s.title}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Título</label>
                                            <input 
                                                type="text" 
                                                value={s.title}
                                                onChange={e => {
                                                    const newServices = [...services];
                                                    newServices[idx].title = e.target.value;
                                                    setServices(newServices);
                                                }}
                                                className="w-full border border-gray-300 p-2 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Imagem URL</label>
                                            <input 
                                                type="text" 
                                                value={s.imageUrl}
                                                onChange={e => {
                                                    const newServices = [...services];
                                                    newServices[idx].imageUrl = e.target.value;
                                                    setServices(newServices);
                                                }}
                                                className="w-full border border-gray-300 p-2 text-sm"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Descrição Curta</label>
                                        <textarea 
                                            value={s.description}
                                            onChange={e => {
                                                const newServices = [...services];
                                                newServices[idx].description = e.target.value;
                                                setServices(newServices);
                                            }}
                                            className="w-full border border-gray-300 p-2 text-sm h-20"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Descrição Detalhada</label>
                                        <textarea 
                                            value={s.detailedDescription}
                                            onChange={e => {
                                                const newServices = [...services];
                                                newServices[idx].detailedDescription = e.target.value;
                                                setServices(newServices);
                                            }}
                                            className="w-full border border-gray-300 p-2 text-sm h-32"
                                        />
                                    </div>
                                </div>
                            ))}
                            <button type="submit" disabled={isSubmitting} className="w-full bg-yellow-400 text-black font-bold py-3 uppercase tracking-widest hover:bg-yellow-500 transition">
                                {isSubmitting ? 'A guardar...' : 'Atualizar Serviços'}
                            </button>
                        </form>
                    )}
                </div>
            ) : activeTab === 'catalog' ? (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Upload do Catálogo PDF</h2>
                    <form onSubmit={handleCatalogUpload} className="space-y-4">
                        <div className="p-8 border-2 border-dashed border-gray-200 text-center">
                            <input 
                                type="file" 
                                accept="application/pdf"
                                onChange={e => setCatalogFile(e.target.files ? e.target.files[0] : null)}
                                className="hidden"
                                id="catalog-upload"
                            />
                            <label htmlFor="catalog-upload" className="cursor-pointer">
                                <div className="text-gray-400 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                    </svg>
                                </div>
                                <p className="text-sm font-bold uppercase tracking-widest">{catalogFile ? catalogFile.name : 'Selecionar Catálogo PDF'}</p>
                            </label>
                        </div>
                        <button type="submit" disabled={!catalogFile || isSubmitting} className="w-full bg-black text-white font-bold py-3 uppercase tracking-widest hover:bg-gray-800 transition disabled:opacity-50">
                            {isSubmitting ? 'A carregar...' : 'Substituir Catálogo Atual'}
                        </button>
                    </form>
                </div>
            ) : (
                <div className="space-y-6">
                    <h2 className="text-xl font-bold mb-6 uppercase tracking-widest">Editar Conteúdo do Site</h2>
                    {isLoadingContent || !content ? (
                        <p className="text-center py-8">A carregar conteúdo...</p>
                    ) : (
                        <form onSubmit={handleContentUpdate} className="space-y-8">
                            {/* Header Section */}
                            <div className="space-y-4 border-b border-gray-100 pb-6">
                                <h3 className="text-sm font-bold uppercase text-yellow-600">Cabeçalho (Hero)</h3>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Título Principal</label>
                                    <input 
                                        type="text" 
                                        value={content.header.title} 
                                        onChange={e => setContent({...content, header: {...content.header, title: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Subtítulo</label>
                                    <textarea 
                                        value={content.header.subtitle} 
                                        onChange={e => setContent({...content, header: {...content.header, subtitle: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm h-20 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">URL da Imagem de Destaque</label>
                                    <input 
                                        type="text" 
                                        value={content.header.imageUrl || ''} 
                                        onChange={e => setContent({...content, header: {...content.header, imageUrl: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                            </div>

                            {/* About Section */}
                            <div className="space-y-4 border-b border-gray-100 pb-6">
                                <h3 className="text-sm font-bold uppercase text-yellow-600">Sobre Nós</h3>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={content.about.title} 
                                        onChange={e => setContent({...content, about: {...content.about, title: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Subtítulo</label>
                                    <textarea 
                                        value={content.about.subtitle} 
                                        onChange={e => setContent({...content, about: {...content.about, subtitle: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm h-20 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Parágrafo 1</label>
                                    <textarea 
                                        value={content.about.content1} 
                                        onChange={e => setContent({...content, about: {...content.about, content1: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm h-32 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Parágrafo 2</label>
                                    <textarea 
                                        value={content.about.content2} 
                                        onChange={e => setContent({...content, about: {...content.about, content2: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm h-32 focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-bold uppercase text-gray-400">Galeria (URLs das Imagens)</h4>
                                    {(content.about.gallery || []).map((url: string, idx: number) => (
                                        <div key={idx}>
                                            <label className="block text-[9px] text-gray-400 mb-1">Imagem {idx + 1}</label>
                                            <input 
                                                type="text" 
                                                value={url} 
                                                onChange={e => {
                                                    const newGallery = [...(content.about.gallery || [])];
                                                    newGallery[idx] = e.target.value;
                                                    setContent({...content, about: {...content.about, gallery: newGallery}});
                                                }}
                                                className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* CTA Section */}
                            <div className="space-y-4 pb-6">
                                <h3 className="text-sm font-bold uppercase text-yellow-600">Newsletter (CTA)</h3>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Título</label>
                                    <input 
                                        type="text" 
                                        value={content.cta.title} 
                                        onChange={e => setContent({...content, cta: {...content.cta, title: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Subtítulo</label>
                                    <input 
                                        type="text" 
                                        value={content.cta.subtitle} 
                                        onChange={e => setContent({...content, cta: {...content.cta, subtitle: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">Texto do Botão</label>
                                    <input 
                                        type="text" 
                                        value={content.cta.buttonText} 
                                        onChange={e => setContent({...content, cta: {...content.cta, buttonText: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-[10px] font-bold uppercase text-gray-400 mb-1">URL da Imagem de Fundo (Opcional)</label>
                                    <input 
                                        type="text" 
                                        value={content.cta.bgImage || ''} 
                                        onChange={e => setContent({...content, cta: {...content.cta, bgImage: e.target.value}})}
                                        className="w-full border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-yellow-400 outline-none"
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <button 
                                    type="button"
                                    onClick={onClose}
                                    className="flex-1 border border-black text-black font-bold py-3 uppercase tracking-widest hover:bg-gray-100 transition"
                                >
                                    Cancelar
                                </button>
                                <button 
                                    type="submit" 
                                    disabled={isSubmitting}
                                    className="flex-1 bg-yellow-400 text-black font-bold py-3 uppercase tracking-widest hover:bg-yellow-500 transition disabled:opacity-50"
                                >
                                    {isSubmitting ? 'A guardar...' : 'Atualizar Conteúdo'}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminPanel;

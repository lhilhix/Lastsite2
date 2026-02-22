import React, { useState } from 'react';
import { LogIn, Plus, List, Edit, Star, Settings, FileText, UploadCloud, Trash2, Loader2 } from 'lucide-react';

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
                setName(''); setCode(''); setDescription(''); setMaterial('');
                setFinishType('Injeção'); setSpecs(''); setImage(null); setDrawing(null);
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
            if (response.ok) alert('Conteúdo atualizado com sucesso!');
            else alert('Erro ao atualizar conteúdo');
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
            if (response.ok) {
                setProducts(products.filter(p => p.id !== id));
                onProductAdded();
            } else {
                alert('Erro ao remover produto');
            }
        } catch (err) {
            alert('Erro ao conectar ao servidor');
        }
    };

    const AdminInput = (props: any) => <input {...props} className={`w-full bg-white border border-neutral-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition ${props.className}`} />;
    const AdminTextarea = (props: any) => <textarea {...props} className={`w-full bg-white border border-neutral-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition ${props.className}`} />;
    const AdminSelect = (props: any) => <select {...props} className={`w-full bg-white border border-neutral-300 rounded-md p-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 transition ${props.className}`} />;
    const AdminLabel = (props: any) => <label {...props} className={`block text-xs font-semibold uppercase text-neutral-500 mb-2 ${props.className}`} />;
    const PrimaryButton = ({ children, ...props }: any) => <button {...props} className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-yellow-400 text-black font-bold text-xs uppercase tracking-widest hover:bg-yellow-500 transition rounded-md shadow-lg hover:shadow-yellow-400/20 disabled:opacity-50 disabled:cursor-not-allowed ${props.className}`}>{children}</button>;
    const SecondaryButton = ({ children, ...props }: any) => <button {...props} className={`inline-flex items-center justify-center gap-2 px-6 py-3 bg-white border border-neutral-300 text-black font-bold text-xs uppercase tracking-widest hover:bg-neutral-100 transition rounded-md ${props.className}`}>{children}</button>;

    if (!isLoggedIn) {
        return (
            <div className="bg-white text-black p-8 rounded-lg max-w-md w-full">
                <h2 className="text-2xl font-bold mb-6 uppercase tracking-widest text-center">Acesso Restrito</h2>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <AdminLabel htmlFor="username">Utilizador</AdminLabel>
                        <AdminInput type="text" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <AdminLabel htmlFor="password">Palavra-passe</AdminLabel>
                        <AdminInput type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <PrimaryButton type="submit" className="w-full"><LogIn size={14} /> Entrar</PrimaryButton>
                </form>
            </div>
        );
    }

    const TabButton = ({ tabName, label, icon: Icon, count }: { tabName: string, label: string, icon: React.ElementType, count?: number }) => (
        <button 
            onClick={() => setActiveTab(tabName as any)}
            className={`flex items-center gap-2 pb-3 px-4 text-xs font-bold uppercase tracking-widest transition-colors whitespace-nowrap ${activeTab === tabName ? 'border-b-2 border-yellow-500 text-black' : 'text-neutral-500 hover:text-black'}`}
        >
            <Icon size={14} /> {label} {count !== undefined && <span className='bg-neutral-200 text-yellow-600 text-[10px] font-bold px-1.5 py-0.5 rounded-full'>{count}</span>}
        </button>
    );

    return (
        <div className="bg-white text-black p-4 sm:p-8 rounded-lg max-h-[90vh] w-full max-w-5xl flex flex-col">
            <div className="flex border-b border-neutral-200 mb-6 overflow-x-auto no-scrollbar">
                <TabButton tabName="add" label="Novo Produto" icon={Plus} />
                <TabButton tabName="manage" label="Gerir Produtos" icon={List} count={products.length} />
                <TabButton tabName="featured" label="Destaques" icon={Star} />
                <TabButton tabName="services" label="Serviços" icon={Settings} />
                <TabButton tabName="content" label="Textos do Site" icon={Edit} />
                <TabButton tabName="catalog" label="Catálogo PDF" icon={FileText} />
            </div>

            <div className="overflow-y-auto pr-4 -mr-4 flex-grow">
                {activeTab === 'add' && (
                    <form onSubmit={handleProductSubmit} className="space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div><AdminLabel>Nome do Produto</AdminLabel><AdminInput type="text" value={name} onChange={e => setName(e.target.value)} required /></div>
                            <div><AdminLabel>Código (Referência)</AdminLabel><AdminInput type="text" value={code} onChange={e => setCode(e.target.value)} required /></div>
                        </div>
                        <div><AdminLabel>Descrição</AdminLabel><AdminTextarea value={description} onChange={e => setDescription(e.target.value)} required rows={3} /></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div><AdminLabel>Material</AdminLabel><AdminInput type="text" value={material} onChange={e => setMaterial(e.target.value)} required /></div>
                            <div><AdminLabel>Tipo de Acabamento</AdminLabel><AdminSelect value={finishType} onChange={e => setFinishType(e.target.value)}><option>Injeção</option><option>Cromagem</option><option>Pintura</option><option>Metalização</option></AdminSelect></div>
                        </div>
                        <div><AdminLabel>Especificações (uma por linha)</AdminLabel><AdminTextarea value={specs} onChange={e => setSpecs(e.target.value)} placeholder="Ex: Cor: Preto\nDimensões: 10x20cm" rows={3} /></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            <div><AdminLabel>Imagem do Produto</AdminLabel><input type="file" accept="image/*" onChange={e => setImage(e.target.files ? e.target.files[0] : null)} required className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 transition" /></div>
                            <div><AdminLabel>Desenho Técnico (Opcional)</AdminLabel><input type="file" accept="image/*,application/pdf" onChange={e => setDrawing(e.target.files ? e.target.files[0] : null)} className="w-full text-sm text-neutral-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200 transition" /></div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex justify-end space-x-4 pt-4">
                            <SecondaryButton type="button" onClick={onClose}>Cancelar</SecondaryButton>
                            <PrimaryButton type="submit" disabled={isSubmitting}>{isSubmitting ? <><Loader2 className="animate-spin h-4 w-4"/>A guardar...</> : 'Adicionar Produto'}</PrimaryButton>
                        </div>
                    </form>
                )}
                {activeTab === 'manage' && (
                    <div className="space-y-4">
                        {isLoadingProducts ? <p className="text-center py-8">A carregar...</p> : products.length === 0 ? <p className="text-center py-8 text-neutral-500">Nenhum produto.</p> : (
                            <div className="divide-y divide-neutral-200">
                                {products.map(p => (
                                    <div key={p.id} className="py-3 flex items-center justify-between">
                                        <div className="flex items-center space-x-4">
                                            <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-cover rounded-md bg-neutral-100" />
                                            <div>
                                                <p className="text-xs text-neutral-500 uppercase">{p.code}</p>
                                                <h4 className="font-bold text-sm text-black">{p.name}</h4>
                                            </div>
                                        </div>
                                        <button onClick={() => handleDelete(p.id)} className="text-red-500 hover:text-red-400"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
                {activeTab === 'catalog' && (
                     <form onSubmit={handleCatalogUpload} className="space-y-6">
                        <AdminLabel>Upload do Catálogo PDF</AdminLabel>
                        <div className="p-8 border-2 border-dashed border-neutral-300 text-center rounded-lg">
                            <input type="file" accept="application/pdf" onChange={e => setCatalogFile(e.target.files ? e.target.files[0] : null)} className="hidden" id="catalog-upload" />
                            <label htmlFor="catalog-upload" className="cursor-pointer">
                                <UploadCloud className="h-12 w-12 mx-auto text-neutral-400 mb-2" />
                                <p className="text-sm font-bold uppercase tracking-widest text-neutral-700">{catalogFile ? catalogFile.name : 'Selecionar Catálogo PDF'}</p>
                            </label>
                        </div>
                        <PrimaryButton type="submit" disabled={!catalogFile || isSubmitting} className="w-full">{isSubmitting ? 'A carregar...' : 'Substituir Catálogo'}</PrimaryButton>
                    </form>
                )}
                {(activeTab === 'content' || activeTab === 'featured' || activeTab === 'services') && (
                    <p className='text-center py-16 text-neutral-500'>Gestão de conteúdo em desenvolvimento.</p>
                )}
            </div>
        </div>
    );
};

export default AdminPanel;

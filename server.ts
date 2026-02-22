import express from 'express';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import cors from 'cors';

const PORT = 3000;
const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');
const FEATURED_DATA_FILE = path.join(process.cwd(), 'data', 'featured_products.json');
const SERVICES_DATA_FILE = path.join(process.cwd(), 'data', 'services.json');
const CONTENT_FILE = path.join(process.cwd(), 'data', 'content.json');
const UPLOADS_DIR = path.join(process.cwd(), 'public', 'uploads');
const DOCUMENTS_DIR = path.join(process.cwd(), 'public', 'documents');

// Ensure directories exist
if (!fs.existsSync(path.join(process.cwd(), 'data'))) {
    fs.mkdirSync(path.join(process.cwd(), 'data'));
}
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
if (!fs.existsSync(DOCUMENTS_DIR)) {
    fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });
}

// Initial content if file doesn't exist
if (!fs.existsSync(CONTENT_FILE)) {
    const initialContent = {
        header: {
            title: "Injetor e Acabamentos \nPremium em Braga",
            subtitle: "Soluções integradas de metalização e pintura para a indústria exigente.",
            imageUrl: "https://picsum.photos/seed/bueso-chair/800/1000"
        },
        about: {
            title: "A Nossa História de Precisão",
            subtitle: "Fundada no coração industrial de Braga, a nossa paixão é transformar polímeros em componentes de alta performance.",
            content1: "Desde a nossa fundação, a Plásticos Bueso tem sido um pilar de inovação e qualidade na indústria de injeção de plásticos. Nascemos com a missão de fornecer soluções técnicas para os setores mais exigentes, com um foco especial na indústria automóvel.",
            content2: "A nossa filosofia assenta em três pilares: precisão absoluta, tecnologia de ponta e uma parceria próxima com os nossos clientes. Cada peça que produzimos é o resultado de um processo meticuloso, desde a seleção do material até ao acabamento final, seja ele uma metalização sofisticada ou uma cromagem de elevada resistência.",
            gallery: [
                "https://picsum.photos/seed/old-factory/400/400",
                "https://picsum.photos/seed/first-machine/400/400",
                "https://picsum.photos/seed/founding-team/400/400",
                "https://picsum.photos/seed/early-product/400/400"
            ]
        },
        cta: {
            title: "SUBSCREVA A NEWSLETTER",
            subtitle: "Aproveite 15% de desconto na primeira compra.",
            buttonText: "Subscrever",
            bgImage: ""
        }
    };
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(initialContent, null, 2));
}

// Initial featured products if file doesn't exist
if (!fs.existsSync(FEATURED_DATA_FILE)) {
    const initialFeatured = [
        {
            id: 1,
            title: 'Peça Técnica Automóvel',
            description: 'Acabamento em cromagem galvânica.',
            detailedDescription: 'Um componente crítico para sistemas de transmissão, injetado em polímero de alta performance e posteriormente tratado com cromagem para máxima resistência ao desgaste e à corrosão. A precisão dimensional é garantida por controlo de qualidade a laser.',
            applications: ['Sistemas de transmissão', 'Componentes de motor', 'Atuadores'],
            imageUrl: 'https://picsum.photos/seed/auto-part/800/450',
            specs: [
                { key: 'Material Base', value: 'PA66 com 40% Fibra de Vidro' },
                { key: 'Tratamento', value: 'Cromagem Galvânica (15μm)' },
                { key: 'Tolerância', value: '±0.05mm' }
            ]
        },
        {
            id: 2,
            title: 'Painel Decorativo',
            description: 'Metalização por vácuo de alta precisão.',
            detailedDescription: 'Painel para o interior de veículos de luxo, com um acabamento sofisticado de alumínio escovado obtido através de metalização PVD. O processo garante um aspeto idêntico ao metal real, mas com a leveza e versatilidade de design do plástico.',
            applications: ['Consolas centrais de automóveis', 'Painéis de portas', 'Frentes de eletrodomésticos premium'],
            imageUrl: 'https://picsum.photos/seed/panel/800/450',
            specs: [
                { key: 'Material Base', value: 'ABS de alto brilho' },
                { key: 'Acabamento', value: 'PVD Alumínio + Verniz Anti-riscos' },
                { key: 'Espessura da camada', value: '~200nm' }
            ]
        },
        {
            id: 3,
            title: 'Suporte Customizado',
            description: 'Injeção técnica com polímeros reforçados.',
            detailedDescription: 'Suporte estrutural concebido para substituir uma peça de metal, oferecendo uma redução de peso superior a 50% sem comprometer a rigidez. O uso de polímeros reforçados com fibra de carbono permite otimizar a geometria para máxima performance.',
            applications: ['Suportes de motor', 'Chassis de drones', 'Equipamento desportivo'],
            imageUrl: 'https://picsum.photos/seed/support/800/450',
            specs: [
                { key: 'Material Base', value: 'PPA com 30% Fibra de Carbono' },
                { key: 'Resistência à tração', value: '280 MPa' },
                { key: 'Temp. de Deflexão', value: '250°C' }
            ]
        },
        {
            id: 4,
            title: 'Componente Eletrónico',
            description: 'Pintura especializada com proteção EMI.',
            detailedDescription: 'Carcaça para um dispositivo de comunicação sensível. A pintura condutiva aplicada internamente cria uma Gaiola de Faraday, protegendo os componentes eletrónicos de interferências eletromagnéticas (EMI) e garantindo a integridade do sinal.',
            applications: ['Routers e modems', 'Equipamento médico de diagnóstico', 'Sistemas de controlo industrial'],
            imageUrl: 'https://picsum.photos/seed/electronic/800/450',
            specs: [
                { key: 'Material Base', value: 'PC/ABS (UL94 V-0)' },
                { key: 'Pintura', value: 'Tinta à base de Níquel' },
                { key: 'Atenuação EMI', value: '> 60dB (1-10 GHz)' }
            ]
        }
    ];
    fs.writeFileSync(FEATURED_DATA_FILE, JSON.stringify(initialFeatured, null, 2));
}

// Initial services if file doesn't exist
if (!fs.existsSync(SERVICES_DATA_FILE)) {
    const initialServices = [
        {
            id: 'injection',
            title: "Injeção de Plásticos",
            description: "Processo de moldagem de alta precisão para criar peças plásticas complexas com repetibilidade e eficiência.",
            materials: "ABS, PC, PA6, PP, PE, PBT.",
            benefits: "Alta produção, baixo custo unitário, geometrias complexas, excelente acabamento superficial.",
            detailedDescription: "Utilizamos máquinas de injeção de última geração com controlo de processo em tempo real. A nossa equipa especializada otimiza cada ciclo para garantir peças com as dimensões exatas, livres de defeitos e com as propriedades mecânicas desejadas. Desde a seleção do material até ao design do molde, oferecemos um serviço completo.",
            applications: ['Componentes estruturais para automóveis', 'Caixas para dispositivos eletrónicos', 'Artigos de consumo duráveis', 'Dispositivos médicos'],
            imageUrl: 'https://picsum.photos/seed/injection-process/800/450'
        },
        {
            id: 'vacuum',
            title: "Metalização por Vácuo",
            description: "Aplicação de uma fina camada de metal sobre uma superfície plástica em ambiente de vácuo, criando um acabamento decorativo e funcional.",
            materials: "Alumínio (Al), Cobre (Cu), Estanho (Sn).",
            benefits: "Acabamento espelhado/metálico, leveza, aplicável a plásticos sensíveis, versatilidade de cores.",
            detailedDescription: "A metalização por vácuo (PVD - Physical Vapor Deposition) é ideal para obter acabamentos premium sem adicionar peso significativo. O processo envolve a vaporização do metal, que depois se condensa sobre a peça, formando uma camada uniforme e aderente. É uma alternativa ecológica à cromagem tradicional para muitas aplicações decorativas.",
            applications: ['Refletores de faróis', 'Painéis decorativos interiores', 'Embalagens de cosméticos de luxo', 'Componentes de telemóveis'],
            imageUrl: 'https://picsum.photos/seed/vacuum-chamber/800/450'
        },
        {
            id: 'chrome',
            title: "Cromagem Galvânica",
            description: "Processo eletroquímico que deposita uma camada de cromo sobre a peça, conferindo durabilidade, resistência à corrosão e um brilho superior.",
            materials: "Cromo trivalente e hexavalente sobre ABS especial (ABS/PC).",
            benefits: "Elevada dureza superficial, resistência à abrasão e corrosão, estética premium, toque frio.",
            detailedDescription: "A nossa linha de cromagem galvânica foi desenhada para a indústria automóvel, cumprindo os mais rigorosos padrões de qualidade. O processo multi-camadas (cobre, níquel, cromo) assegura uma adesão perfeita ao substrato plástico e uma resistência excecional a ciclos térmicos e ambientes agressivos. O resultado é um acabamento impecável e duradouro.",
            applications: ['Grelhas frontais de veículos', 'Puxadores de porta e frisos', 'Comandos e botões interiores', 'Acessórios de casa de banho de gama alta'],
            imageUrl: 'https://picsum.photos/seed/chrome-plating-line/800/450'
        }
    ];
    fs.writeFileSync(SERVICES_DATA_FILE, JSON.stringify(initialServices, null, 2));
}

// Initial data if file doesn't exist
if (!fs.existsSync(DATA_FILE)) {
    const initialData = [
        {
            id: 1,
            name: 'Injetor de Alta Pressão',
            code: 'PB-INJ-001',
            imageUrl: 'https://picsum.photos/seed/injector/800/600',
            description: 'Componente de precisão para sistemas de injeção de combustível, com tolerâncias rigorosas e acabamento resistente.',
            specs: ['Material: PA66-GF30', 'Resistência Térmica: 220°C', 'Pressão Máx: 150 bar'],
            material: 'PA66-GF30',
            finishType: 'Injeção',
        },
        {
            id: 2,
            name: 'Emblema Frontal Cromado',
            code: 'PB-CR-004',
            imageUrl: 'https://picsum.photos/seed/emblem/800/600',
            description: 'Emblema para a indústria automóvel com acabamento em cromagem galvânica de alto brilho e durabilidade.',
            specs: ['Material: ABS/PC', 'Acabamento: Cromo Hexavalente', 'Resistência UV: 5 anos'],
            material: 'ABS/PC',
            finishType: 'Cromagem',
        },
        {
            id: 3,
            name: 'Caixa para Eletrónica',
            code: 'PB-BOX-012',
            imageUrl: 'https://picsum.photos/seed/electronics-box/800/600',
            description: 'Caixa robusta para alojamento de circuitos eletrónicos, com opções de pintura para blindagem EMI/RFI.',
            specs: ['Material: PC-ABS V0', 'Proteção: IP67', 'Blindagem: > 40dB @ 1GHz'],
            material: 'PC-ABS V0',
            finishType: 'Pintura',
        },
        {
            id: 4,
            name: 'Difusor de Ar Metalizado',
            code: 'PB-MET-007',
            imageUrl: 'https://picsum.photos/seed/air-diffuser/800/600',
            description: 'Peça decorativa para interiores de veículos, com acabamento em metalização a vácuo com efeito de alumínio escovado.',
            specs: ['Material: ABS', 'Acabamento: PVD Alumínio', 'Textura: Escovado Fino'],
            material: 'ABS',
            finishType: 'Metalização',
        },
        {
            id: 5,
            name: 'Conector Selado',
            code: 'PB-CON-031',
            imageUrl: 'https://picsum.photos/seed/sealed-connector/800/600',
            description: 'Conector elétrico de alta performance com sobreinjeção de TPE para garantir selagem contra humidade e poeira.',
            specs: ['Material: PBT + TPE', 'Proteção: IP68', 'Voltagem Máx: 600V'],
            material: 'PBT + TPE',
            finishType: 'Injeção',
        },
        {
            id: 6,
            name: 'Lente para Sensor Ótico',
            code: 'PB-LNS-002',
            imageUrl: 'https://picsum.photos/seed/optic-lens/800/600',
            description: 'Lente de policarbonato com elevada transparência e precisão ótica, moldada para sensores de presença.',
            specs: ['Material: PC Ótico', 'Transmissão Luz: >92%', 'Acabamento: Polido espelhado'],
            material: 'PC Ótico',
            finishType: 'Injeção',
        }
    ];
    fs.writeFileSync(DATA_FILE, JSON.stringify(initialData, null, 2));
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

async function startServer() {
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use('/uploads', express.static(UPLOADS_DIR));

    // API Routes
    app.get('/api/products', (req, res) => {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        res.json(data);
    });

    app.get('/api/content', (req, res) => {
        if (fs.existsSync(CONTENT_FILE)) {
            const data = JSON.parse(fs.readFileSync(CONTENT_FILE, 'utf-8'));
            res.json(data);
        } else {
            res.status(404).json({ message: 'Content not found' });
        }
    });

    app.get('/api/featured-products', (req, res) => {
        const data = JSON.parse(fs.readFileSync(FEATURED_DATA_FILE, 'utf-8'));
        res.json(data);
    });

    app.get('/api/services', (req, res) => {
        const data = JSON.parse(fs.readFileSync(SERVICES_DATA_FILE, 'utf-8'));
        res.json(data);
    });

    app.post('/api/admin/content', (req, res) => {
        // In a real app, we'd verify the token here
        const content = req.body;
        fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2));
        res.json({ success: true });
    });

    app.post('/api/admin/featured-products', (req, res) => {
        const data = req.body;
        fs.writeFileSync(FEATURED_DATA_FILE, JSON.stringify(data, null, 2));
        res.json({ success: true });
    });

    app.post('/api/admin/services', (req, res) => {
        const data = req.body;
        fs.writeFileSync(SERVICES_DATA_FILE, JSON.stringify(data, null, 2));
        res.json({ success: true });
    });

    app.post('/api/admin/upload-catalog', upload.single('catalog'), (req, res) => {
        if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
        
        const oldPath = req.file.path;
        const newPath = path.join(DOCUMENTS_DIR, 'catalog.pdf');
        
        // Ensure documents dir exists (already handled at startup but good to be safe)
        if (!fs.existsSync(DOCUMENTS_DIR)) fs.mkdirSync(DOCUMENTS_DIR, { recursive: true });

        fs.copyFileSync(oldPath, newPath);
        fs.unlinkSync(oldPath); // remove temp file
        res.json({ success: true, url: '/documents/catalog.pdf' });
    });

    app.use('/documents', express.static(DOCUMENTS_DIR));

    app.post('/api/contact', upload.single('attachment'), (req, res) => {
        const { name, email, subject, message } = req.body;
        const attachment = req.file ? `/uploads/${req.file.filename}` : null;

        console.log('Novo contacto recebido:', { name, email, subject, message, attachment });
        
        // In a real app, we would save this to a database or send an email
        res.json({ success: true, message: 'Mensagem enviada com sucesso' });
    });

    app.post('/api/admin/login', (req, res) => {
        const { username, password } = req.body;
        const adminUser = process.env.ADMIN_USERNAME || 'admin';
        const adminPass = process.env.ADMIN_PASSWORD || 'bueso2024##';

        if (username === adminUser && password === adminPass) {
            res.json({ success: true, token: 'fake-jwt-token' });
        } else {
            res.status(401).json({ success: false, message: 'Credenciais inválidas' });
        }
    });

    app.post('/api/admin/products', upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'drawing', maxCount: 1 }
    ]), (req, res) => {
        // In a real app, we'd verify the token here
        const { name, code, description, material, finishType, specs } = req.body;
        const files = req.files as { [fieldname: string]: Express.Multer.File[] };
        
        const imageUrl = files['image'] ? `/uploads/${files['image'][0].filename}` : '';
        const drawingUrl = files['drawing'] ? `/uploads/${files['drawing'][0].filename}` : '';

        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        const newProduct = {
            id: data.length > 0 ? Math.max(...data.map((p: any) => p.id)) + 1 : 1,
            name,
            code,
            description,
            material,
            finishType,
            imageUrl,
            drawingUrl,
            specs: specs ? JSON.parse(specs) : []
        };

        data.push(newProduct);
        fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));

        res.json({ success: true, product: newProduct });
    });

    app.delete('/api/admin/products/:id', (req, res) => {
        const { id } = req.params;
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
        const filteredData = data.filter((p: any) => p.id !== parseInt(id));
        
        if (data.length === filteredData.length) {
            return res.status(404).json({ success: false, message: 'Produto não encontrado' });
        }

        fs.writeFileSync(DATA_FILE, JSON.stringify(filteredData, null, 2));
        res.json({ success: true });
    });

    // Vite middleware for development
    if (process.env.NODE_ENV !== 'production') {
        const vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'spa',
        });
        app.use(vite.middlewares);
    } else {
        app.use(express.static(path.join(process.cwd(), 'dist')));
        app.get('*', (req, res) => {
            res.sendFile(path.join(process.cwd(), 'dist', 'index.html'));
        });
    }

    app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
    });
}

startServer();

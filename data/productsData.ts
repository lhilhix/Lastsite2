export interface DetailedProduct {
    id: number;
    title: string;
    description: string;
    detailedDescription: string;
    applications: string[];
    specs: { key: string; value: string; }[];
    imageUrl?: string;
}

export const productsData: DetailedProduct[] = [
    {
        id: 1,
        title: 'Peça Técnica Automóvel',
        description: 'Acabamento em cromagem galvânica.',
        detailedDescription: 'Um componente crítico para sistemas de transmissão, injetado em polímero de alta performance e posteriormente tratado com cromagem para máxima resistência ao desgaste e à corrosão. A precisão dimensional é garantida por controlo de qualidade a laser.',
        applications: ['Sistemas de transmissão', 'Componentes de motor', 'Atuadores'],
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
        specs: [
            { key: 'Material Base', value: 'PC/ABS (UL94 V-0)' },
            { key: 'Pintura', value: 'Tinta à base de Níquel' },
            { key: 'Atenuação EMI', value: '> 60dB (1-10 GHz)' }
        ]
    }
];

export interface Product {
    id: number;
    name: string;
    code: string;
    imageUrlSeed: string;
    description: string;
    specs: string[];
    material: string;
    finishType: 'Injeção' | 'Cromagem' | 'Pintura' | 'Metalização';
}

export const catalogProducts: Product[] = [
    {
        id: 1,
        name: 'Injetor de Alta Pressão',
        code: 'PB-INJ-001',
        imageUrlSeed: 'injector',
        description: 'Componente de precisão para sistemas de injeção de combustível, com tolerâncias rigorosas e acabamento resistente.',
        specs: ['Material: PA66-GF30', 'Resistência Térmica: 220°C', 'Pressão Máx: 150 bar'],
        material: 'PA66-GF30',
        finishType: 'Injeção',
    },
    {
        id: 2,
        name: 'Emblema Frontal Cromado',
        code: 'PB-CR-004',
        imageUrlSeed: 'emblem',
        description: 'Emblema para a indústria automóvel com acabamento em cromagem galvânica de alto brilho e durabilidade.',
        specs: ['Material: ABS/PC', 'Acabamento: Cromo Hexavalente', 'Resistência UV: 5 anos'],
        material: 'ABS/PC',
        finishType: 'Cromagem',
    },
    {
        id: 3,
        name: 'Caixa para Eletrónica',
        code: 'PB-BOX-012',
        imageUrlSeed: 'electronics-box',
        description: 'Caixa robusta para alojamento de circuitos eletrónicos, com opções de pintura para blindagem EMI/RFI.',
        specs: ['Material: PC-ABS V0', 'Proteção: IP67', 'Blindagem: > 40dB @ 1GHz'],
        material: 'PC-ABS V0',
        finishType: 'Pintura',
    },
    {
        id: 4,
        name: 'Difusor de Ar Metalizado',
        code: 'PB-MET-007',
        imageUrlSeed: 'air-diffuser',
        description: 'Peça decorativa para interiores de veículos, com acabamento em metalização a vácuo com efeito de alumínio escovado.',
        specs: ['Material: ABS', 'Acabamento: PVD Alumínio', 'Textura: Escovado Fino'],
        material: 'ABS',
        finishType: 'Metalização',
    },
    {
        id: 5,
        name: 'Conector Selado',
        code: 'PB-CON-031',
        imageUrlSeed: 'sealed-connector',
        description: 'Conector elétrico de alta performance com sobreinjeção de TPE para garantir selagem contra humidade e poeira.',
        specs: ['Material: PBT + TPE', 'Proteção: IP68', 'Voltagem Máx: 600V'],
        material: 'PBT + TPE',
        finishType: 'Injeção',
    },
    {
        id: 6,
        name: 'Lente para Sensor Ótico',
        code: 'PB-LNS-002',
        imageUrlSeed: 'optic-lens',
        description: 'Lente de policarbonato com elevada transparência e precisão ótica, moldada para sensores de presença.',
        specs: ['Material: PC Ótico', 'Transmissão Luz: >92%', 'Acabamento: Polido espelhado'],
        material: 'PC Ótico',
        finishType: 'Injeção',
    },
    {
        id: 7,
        name: 'Tampa de Depósito Estilizada',
        code: 'PB-MET-015',
        imageUrlSeed: 'tank-cap',
        description: 'Tampa de depósito com acabamento metalizado de alta resistência química e estética premium.',
        specs: ['Material: PA6', 'Acabamento: Metalização Cr', 'Resistência: Hidrocarbonetos'],
        material: 'PA6',
        finishType: 'Metalização',
    },
    {
        id: 8,
        name: 'Suporte de Espelho Retrovisor',
        code: 'PB-INJ-088',
        imageUrlSeed: 'mirror-support',
        description: 'Suporte estrutural injetado com polímero de alta rigidez para fixação de espelhos retrovisores exteriores.',
        specs: ['Material: PA66-GF50', 'Carga Ruptura: >2000N', 'Vibração: Norma ISO 16750'],
        material: 'PA66-GF50',
        finishType: 'Injeção',
    },
    {
        id: 9,
        name: 'Grelha de Ventilação Premium',
        code: 'PB-PNT-022',
        imageUrlSeed: 'vent-grille',
        description: 'Grelha de ventilação interior com pintura soft-touch para um toque aveludado e aspeto mate elegante.',
        specs: ['Material: ABS', 'Acabamento: Pintura Soft-Touch', 'Cor: Preto Piano'],
        material: 'ABS',
        finishType: 'Pintura',
    }
];
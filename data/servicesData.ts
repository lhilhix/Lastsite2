import React from 'react';

export interface Service {
    id: string;
    title: string;
    description: string;
    materials: string;
    benefits: string;
    detailedDescription: string;
    applications: string[];
}

export const servicesData: Service[] = [
    {
        id: 'injection',
        title: "Injeção de Plásticos",
        description: "Processo de moldagem de alta precisão para criar peças plásticas complexas com repetibilidade e eficiência.",
        materials: "ABS, PC, PA6, PP, PE, PBT.",
        benefits: "Alta produção, baixo custo unitário, geometrias complexas, excelente acabamento superficial.",
        detailedDescription: "Utilizamos máquinas de injeção de última geração com controlo de processo em tempo real. A nossa equipa especializada otimiza cada ciclo para garantir peças com as dimensões exatas, livres de defeitos e com as propriedades mecânicas desejadas. Desde a seleção do material até ao design do molde, oferecemos um serviço completo.",
        applications: ['Componentes estruturais para automóveis', 'Caixas para dispositivos eletrónicos', 'Artigos de consumo duráveis', 'Dispositivos médicos']
    },
    {
        id: 'vacuum',
        title: "Metalização por Vácuo",
        description: "Aplicação de uma fina camada de metal sobre uma superfície plástica em ambiente de vácuo, criando um acabamento decorativo e funcional.",
        materials: "Alumínio (Al), Cobre (Cu), Estanho (Sn).",
        benefits: "Acabamento espelhado/metálico, leveza, aplicável a plásticos sensíveis, versatilidade de cores.",
        detailedDescription: "A metalização por vácuo (PVD - Physical Vapor Deposition) é ideal para obter acabamentos premium sem adicionar peso significativo. O processo envolve a vaporização do metal, que depois se condensa sobre a peça, formando uma camada uniforme e aderente. É uma alternativa ecológica à cromagem tradicional para muitas aplicações decorativas.",
        applications: ['Refletores de faróis', 'Painéis decorativos interiores', 'Embalagens de cosméticos de luxo', 'Componentes de telemóveis']
    },
    {
        id: 'chrome',
        title: "Cromagem Galvânica",
        description: "Processo eletroquímico que deposita uma camada de cromo sobre a peça, conferindo durabilidade, resistência à corrosão e um brilho superior.",
        materials: "Cromo trivalente e hexavalente sobre ABS especial (ABS/PC).",
        benefits: "Elevada dureza superficial, resistência à abrasão e corrosão, estética premium, toque frio.",
        detailedDescription: "A nossa linha de cromagem galvânica foi desenhada para a indústria automóvel, cumprindo os mais rigorosos padrões de qualidade. O processo multi-camadas (cobre, níquel, cromo) assegura uma adesão perfeita ao substrato plástico e uma resistência excecional a ciclos térmicos e ambientes agressivos. O resultado é um acabamento impecável e duradouro.",
        applications: ['Grelhas frontais de veículos', 'Puxadores de porta e frisos', 'Comandos e botões interiores', 'Acessórios de casa de banho de gama alta']
    }
];


import { Scenario } from './types';

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    title: "Cenário 1",
    subtitle: "Parceria Estratégica de Leads e Prospecção Conjunta",
    description: "Nesta fase inicial de baixa complexidade, Labirintar e IDB formalizam um acordo de compartilhamento de leads para otimizar a prospecção. Labirintar busca acelerar sua validação de clientes, enquanto o IDB necessita testar sua descoberta de clientes em um ecossistema real.",
    benefits: {
      labirintar: [
        "Acesso a uma base de potenciais clientes qualificados pelo IDB.",
        "Validação inicial do interesse do mercado em inteligência de dados.",
        "Potencial redução do Custo de Aquisição de Clientes (CAC) via indicações."
      ],
      idb: [
        "Acesso à rede de escolas e educadores da Labirintar para prospecção.",
        "Oportunidade de testar e validar o modelo de 'descoberta de cliente'.",
        "Geração de 'testemunhos' e casos de uso iniciais com baixo risco."
      ]
    },
    remuneration: "Inicialmente, a troca de indicações não é remunerada, focando no feedback mútuo. Prevê-se uma comissão simbólica (ex: 2%) sobre o faturamento inicial de um lead convertido para incentivar a qualidade.",
  },
  {
    id: 2,
    title: "Cenário 2",
    subtitle: "Integração de Valor: Solução IDB na Plataforma Labirintar",
    description: "Evoluindo a parceria, o IDB integraria suas funcionalidades de inteligência de dados e dashboards preditivos à plataforma Labirintar, transformando-a em uma fonte viva de dados e elevando sua proposta de valor.",
    benefits: {
      labirintar: [
        "Oferta de insights sobre retenção, engajamento e desempenho curricular.",
        "Aumento do valor percebido da plataforma, atraindo escolas e investidores.",
        "Diferenciação competitiva significativa no mercado EdTech."
      ],
      idb: [
        "Ganho de escala ao ter sua solução embarcada e testada em um ecossistema crescente.",
        "Acesso a uma base de dados real e rica para refinar seus modelos preditivos.",
        "Validação de mercado e credibilidade ao ter sua tecnologia em uso por uma EdTech."
      ]
    },
    remuneration: "Labirintar remunera o IDB com uma taxa de serviço (fixa ou por usuário). Adicionalmente, o IDB recebe uma porcentagem (5-10%) sobre a receita incremental gerada pelas funcionalidades de inteligência de dados.",
    equity: "Como contrapartida pelos ativos (tecnologia e dados), a Labirintar poderia ceder uma participação minoritária (1-2%) de equity ao IDB, alinhando interesses a longo prazo."
  },
  {
    id: 3,
    title: "Cenário 3",
    subtitle: "Spin-off Estratégica e Fusão Operacional",
    description: "O IDB é vinculado à Labirintar como uma 'spin-off estratégica', com a Labirintar atuando como investidora. Esta fase evolui para a fusão das operações de mercado, produção e financeiro, criando um fluxo unificado para formar uma 'plataforma nacional de inteligência educacional'.",
    benefits: {
      labirintar: [
        "Posicionamento como 'hub de inovação' e criação de um novo braço de negócio (data intelligence).",
        "Acesso prioritário a inovações do IDB, fortalecendo o portfólio.",
        "Maximização de sinergias e eficiências operacionais com a fusão."
      ],
      idb: [
        "Aceleração do desenvolvimento com suporte estruturado e mentoria.",
        "Minimização de custos e acesso a um pipeline de clientes qualificado.",
        "Estrutura robusta para escalar nacionalmente através da operação integrada."
      ]
    },
    remuneration: "A Labirintar realiza um aporte (financeiro ou em serviços) no IDB. Com a fusão, as receitas são combinadas e os custos geridos centralmente, com a governança unificada sob um Acordo de Acionistas.",
    equity: "A Labirintar recebe uma participação societária no IDB (ex: 5-10%). Na fusão, o 'cap table' é consolidado, redefinindo as participações com base no valuation e nos ativos estratégicos de cada empresa."
  }
];

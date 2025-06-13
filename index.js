// index.js (Versão para Cloud Run Service com Express)
const express = require('express');
const { VertexAI } = require('@google-cloud/vertexai');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const CUSTOM_SEARCH_API_KEY = process.env.CUSTOM_SEARCH_API_KEY;
const CUSTOM_SEARCH_CX = process.env.CUSTOM_SEARCH_CX;

// Inicialize o Vertex AI - Use a detecção automática do Google
const vertex_ai = new VertexAI({ project: process.env.GCLOUD_PROJECT, location: 'southamerica-east1' });
const model = 'gemini-1.0-pro';
const generativeModel = vertex_ai.getGenerativeModel({ model });

const labirintarContext = `
    --- INÍCIO DO CONTEXTO ESTRATÉGICO E DE NEGÓCIOS ---

    Relatório Abrangente para Investidores: LABirintar
    Este documento organiza informações cruciais sobre a LABirintar, seu modelo de negócio, estratégias, contexto de mercado e saúde financeira, visando fornecer uma base de conhecimento para investidores.
    1. Visão Geral da LABirintar A LABirintar é uma plataforma de EdTech inovadora que conecta Educadores Empreendedores (EE) a escolas para oferecer atividades extracurriculares no contraturno escolar. Opera como um agente integrador, fornecendo uma solução completa que abrange curadoria de experiências, formação contínua de educadores e um sistema tecnológico robusto para gestão pedagógica e operacional. Sua essência é promover uma "educação viva, integral e sensível", valorizando o protagonismo dos educadores e a experiência das crianças.
    • Modelo de Negócio LABirintar: A empresa se posiciona como um ecossistema de serviços para escolas, integrando diversos negócios e oferecendo uma solução extracurricular completa. A LABirintar acredita na "Rede de Valor" em oposição à "Cadeia de Valor" tradicional, buscando capturar valor ao aumentar a economia de escala e escopo para seus clientes demandantes e ofertantes.
    • Proposição de Valor:
    ◦ Para Escolas: Ocupar espaços ociosos e gerar receita sem o ônus da gestão, com conteúdo de qualidade e alinhamento ao desenvolvimento integral.
    ◦ Para Famílias: Acesso a atividades de qualidade que promovem o desenvolvimento integral das crianças e uma conexão emocional.
    ◦ Para Educadores Empreendedores (EEs): Acesso ao mercado de escolas, modelo de remuneração diferenciado (porcentagem do faturamento), sistema de gestão e formação, e a possibilidade de se tornarem sócios minoritários da rede com base em um score de engajamento.
    • Diferenciais Competitivos:
    ◦ Tecnologia: Software próprio de gestão automatizada (matrícula, pagamento, controle financeiro, formação, trilha formativa) com desenvolvimento ágil ("no-code"), facilitando a escalabilidade.
    ◦ Pedagogia Inovadora: Abordagem moderna e de alta qualidade, focada na educação integral e em honrar as infâncias, diferenciando-se de ofertas tradicionais.
    ◦ Comunidade e Engajamento: Criação de uma comunidade para educadores e empreendedores para mobilização, trocas e construção de portfólio pedagógico, fomentando um senso de pertencimento.
    ◦ Rede de Valor: Capacidade de integrar múltiplos fornecedores para uma solução completa e competir como um ecossistema, gerando maior valor para os demandantes e reduzindo custos operacionais.
    • Time: Maria Lívia Comparini Nogueira de Sá é empreendedora e especialista em educação/pedagogia, com forte autoridade no setor. Rafael Darrouy possui experiência em startups e desenvolvimento de tecnologias digitais. Edu Moreira atua na inteligência de negócios. Investidores valorizam equipes fortes e complementares.
    2. Momento da Empresa e Estratégia de Crescimento A LABirintar está em uma fase crucial de validação do modelo comercial e de expansão.
    • Estágio da Startup: A LABirintar está entre a fase de Operação e Tração, buscando validar seu modelo de negócio inovador e crescer. O Product Market Fit (PMF) está em fase de validação, especialmente no que tange à comunicação da proposta de valor e aceitação do mercado.
    • Objetivos e Metas:
    ◦ Curto Prazo: Conquistar mais escolas, com uma meta de 4 novas escolas no próximo semestre. Negociar e implementar o novo modelo de parceria (10% do faturamento para a LABirintar) com escolas existentes até junho.
    ◦ Longo Prazo: Expandir a base de clientes, escalar o negócio nacionalmente, e consolidar a visão de um ecossistema de serviços para escolas. Atingir um crescimento acelerado e potencializar o valuation para um futuro exit.
    • Estratégia de Entrada no Mercado e Expansão:
    ◦ Canais de Vendas: Prospecção direta (Maria Lívia, Henrique), presença digital (website, redes sociais). Representantes para venda direta e parcerias externas também são considerados.
    ◦ Parcerias Estratégicas: Colaborações com empresas como Rent A Pro (RAP), FestPay e Agência Freela para troca de leads e acesso a bases de clientes, visando reduzir o Custo de Aquisição de Clientes (CAC).
    ◦ Expansão Geográfica: Foco inicial em escolas privadas em São Paulo e sua região metropolitana, com estratégia de expansão para todo o Brasil, seguindo a ordem de adensamento demográfico nas grandes cidades.
    ◦ Senso de Urgência: A LABirintar busca criar um senso de urgência e escassez para incentivar parceiros e investidores a tomar decisões, mostrando seu potencial de crescimento e valorização.
    3. Análise de Mercado O mercado de educação básica no Brasil movimenta R$100 bilhões anualmente, com R$40 bilhões especificamente em atividades extracurriculares, demonstrando um mercado de grande porte.
    • TAM, SAM, SOM: A empresa deve demonstrar o potencial total do mercado (TAM), a fatia que pode ser alcançada (SAM) e a porção que se pode capturar no curto prazo com o investimento (SOM/TG).
    • Cenário Competitivo: O mercado de atividades extracurriculares em São Paulo é um "Oceano Vermelho", caracterizado por forte competição e imitação entre empresas maduras que disputam market share com base em preço, amplitude de oferta e metodologias (e.g., BMQ Sports, ARC Sports, UP Gestão Esportiva, Rent A Pro). A LABirintar busca criar seu próprio "Oceano Azul", um novo ambiente de negócios fora dessa competição acirrada, através de inovação no DNA.
    • Oportunidades: Legislação favorece o contraturno; valorização da economia do cuidado no pós-pandemia; engajar famílias através de comunicação inovadora.
    4. Indicadores Econômico-Financeiros e Valuation A análise da saúde financeira e o valuation da LABirintar são elementos cruciais para atrair investidores.
    • Saúde Financeira e Histórico:
    ◦ A LABirintar, embora capitalizada por uma investidora anjo (Sara), precisa gerenciar custos e buscar sustentabilidade.
    ◦ A meta de margem de contribuição mínima é de 40%, um indicador crucial para a sustentabilidade e atração de investidores.
    ◦ A gestão transparente das finanças é vital, com registros contábeis organizados, conciliação de extratos e rastreamento detalhado de receitas e despesas.
    • Modelo de Receita e Fluxo de Caixa:
    ◦ O modelo de receita é baseado em comissionamento, onde a LABirintar retém uma porcentagem (10%) sobre o faturamento gerado pelas famílias.
    ◦ Utiliza um gateway de pagamento (como Stripe) que realiza o "split" dos valores entre a escola, os educadores e a LABirintar, otimizando a gestão financeira.
    ◦ O Lucro Operacional (EBIT) é um indicador importante da capacidade de autofinanciamento da Necessidade de Capital de Giro (NCG) e, consequentemente, do crescimento.
    • Capital de Giro (CDG):
    ◦ A administração do capital de giro é um processo de planejamento e controle de recursos aplicados no ativo circulante.
    ◦ O modelo Fleuriet é um instrumento essencial para a análise dinâmica e tomada de decisões financeiras, avaliando a liquidez e estrutura de financiamento da empresa.
    ◦ Indicadores do Modelo Fleuriet:
    ▪ Capital de Giro Líquido (CCL): Recursos da empresa para se manter em funcionamento.
    ▪ Necessidade de Capital de Giro (NCG): Saldo das contas cíclicas em relação às operações. NCG positiva indica necessidade de financiamento adicional; NCG negativa indica financiamento excedente.
    ▪ Saldo de Tesouraria (ST): Avalia se o ativo circulante financeiro é suficiente para quitar obrigações de curto prazo, evidenciando a margem de segurança financeira.
    ◦ A classificação resultante do modelo Fleuriet indica a saúde econômico-financeira da empresa (Excelente, Sólida, Insatisfatória, Péssima, Muito Ruim, Alto Risco).
    • Valuation da Startup:
    ◦ A avaliação de startups é complexa devido à falta de histórico financeiro, focando no fator inovação e potencial de crescimento futuro.
    ◦ Metodologias Aplicáveis: Fluxo de Caixa Descontado (DCF), Múltiplos de Mercado (Comparáveis), Método de Venture Capital, Scorecard Method / Berkus Method (mais qualitativos para estágios iniciais).
    ◦ Impacto da Parceria com RAP: A base de clientes e reputação da RAP podem aumentar significativamente o valuation da LABirintar.
    • KPIs (Key Performance Indicators): Investidores buscam indicadores que refletem o desempenho da empresa em números.
    ◦ GMV (Gross Merchandise Volume) e Take Rate: O GMV representa a riqueza circulando no ecossistema da LABirintar, enquanto o take rate é o percentual do GMV que se torna receita da LABirintar. Essenciais para investidores.
    ◦ CAC (Custo de Aquisição de Clientes) e LTV (Lifetime Value): KPIs críticos para entender a rentabilidade do cliente no longo prazo. A LABirintar busca um CAC próximo de zero através de trocas de indicações.
    ◦ Ticket Médio: Importante para o negócio, tende a aumentar com a frequência das atividades.
    ◦ Cash burn: Gasto médio mensal da empresa.
    ◦ Taxa de Conversão: Monitoramento do funil de vendas.
    ◦ Milestones: Marcos que a empresa busca atingir com os recursos captados.
    • Uso dos Recursos Captados (Use of Proceeds): Detalhar como o investimento será utilizado (e.g., marketing, operações, desenvolvimento). Investidores tendem a preferir investimentos em marketing, pois entendem que geram mais vendas.
    5. Governança Corporativa e Riscos A governança corporativa é fundamental para o sucesso e sustentabilidade do investimento, especialmente em startups.
    • Princípios de Governança (IBGC): Transparência, Equidade, Prestação de Contas (Accountability) e Responsabilidade Corporativa são a base da governança pós-investimento.
    • Estrutura de Governança: Sócios, Conselho de Administração, Diretoria e Órgãos de Fiscalização e Controle são agentes e estruturas que compõem o sistema de governança.
    • Conselho Consultivo/Administração: A estruturação de um conselho consultivo ou de administração é recomendada na fase de tração e escala para orientação estratégica e aprimoramento do processo decisório.
    • Gestão de Riscos:
    ◦ Disparidade Salarial de Educadores: A diferença na remuneração horária entre educadores da RAP (R$ 75/h) e da LABirintar (R$ 150/h) é um risco significativo de impacto na integração cultural, retenção de talentos e viabilidade operacional. A mitigação requer uma estrutura de remuneração equitativa e comunicação transparente.
    ◦ Riscos Legais e Contratuais: Questões como a propriedade intelectual do software "no-code", formalização da rede de Educadores Empreendedores (riscos trabalhistas/societários), e conflitos de interesse/cláusulas de não concorrência com parceiros (e.g., RAP) devem ser minuciosamente abordados.
    ◦ Riscos Culturais: Diferenças culturais (e.g., "rigidez" da RAP vs. "agilidade" e "valorização do educador" da LABirintar) são o maior desafio para a integração. A preservação da autonomia e cultura da LABirintar é crucial.
    ◦ Risco de Mercado: O ambiente competitivo e a necessidade de validação do Product Market Fit geram incerteza sobre a escalabilidade das vendas.
    • Pendências: É importante informar sobre quaisquer pendências tributárias ou trabalhistas.
    6. Estratégia de Saída (Exit Strategy) Para investidores, a estratégia de saída é um fator determinante.
    • Objetivo da RAP: A Rent A Pro busca solidificar seu valuation para uma estratégia de saída em 7-10 anos, e o investimento na LABirintar pode ser um meio para isso.
    • M&A (Fusões e Aquisições): Aquisição por empresas maiores é uma possível estratégia de saída para investidores.
    • Cláusulas de Acionistas: Cláusulas como Drag-Along e Tag-Along no Acordo de Acionistas são fundamentais para alinhar todos os acionistas para uma venda conjunta que maximize o retorno no momento do exit.
    7. Impacto Socioambiental (ESG) A LABirintar destaca seu impacto positivo.
    • Impacto Social: Foco na educação integral, valorização da infância, transformação da educação e capacitação de educadores, inclusive de comunidades de baixa renda.
    • Mensuração de Impacto: A empresa já utiliza instrumentos de avaliação formativa com as crianças e pretende medir e apresentar esses resultados aos parceiros. A alinhamento com Objetivos de Desenvolvimento Sustentável (ODS) pode ser destacado.


    --- INÍCIO DOS DADOS E PREMISSAS FINANCEIRAS ---
    
    Principais Resultados do Valuation:
    - Valuation (VPL do Fluxo de Caixa Descontado): R$ 4.317.619
    - Taxa Interna de Retorno (TIR): 98,69%
    - Custo do Capital Próprio (Ke): 26,75% a.a.
    - Taxa Livre de Risco (Rf): 14,75%
    - Beta (b): 1.5

    Projeções Financeiras Anuais (Resumo - Ano 1 até Ano 10):
    - RECEITA: Inicia com R$ 394 mil no Ano 1 e cresce para R$ 14,4 milhões a partir do Ano 6.
    - CUSTO TOTAL: Inicia com R$ 565 mil no Ano 1 e se estabiliza em torno de R$ 11 milhões a partir do Ano 6.
    - LUCRO/PREJUÍZO LÍQUIDO (RLE): Prejuízo de R$ 170 mil no Ano 1, atinge o ponto de equilíbrio no Ano 2 com lucro de R$ 21 mil, e cresce para R$ 3,3 milhões no Ano 10.
    - FLUXO DE CAIXA OPERACIONAL (EBITDA): Negativo no Ano 1 (-R$170 mil), torna-se positivo no Ano 2 (R$21 mil) e atinge R$ 3,5 milhões a partir do ano 6.
    - ATIVO TOTAL: Cresce de R$ 901 mil no Ano 1 para R$ 5,3 milhões no Ano 10.
    - PATRIMÔNIO LÍQUIDO: Cresce de R$ 895 mil no Ano 1 para R$ 5,1 milhões no Ano 10.

    Premissas de Mercado e Operação:
    - Ticket Médio por família: R$ 223,50 (constante).
    - Matrículas: Crescem de 20 no Mês 1 para 5.700 a partir do Mês 55.
    - Escolas Parceiras: Aumentam de 1 no Mês 1 para 114 a partir do Mês 61.
    - Estrutura de Pessoal: Inicia com 9 pessoas no Mês 1 e escala para 320 pessoas no final do período.
    - Investimento em Software (Capex): Total de R$ 1.470.000, concentrado nos primeiros 24 meses.

    Estrutura de Custos:
    - Pessoal representa a maior parte dos custos, tanto fixos quanto variáveis.
    - Custos com Marketing (Propaganda e Publicidade) são relevantes nos primeiros anos.
    - Honorários da diretoria (CEO, CDO, COO) estão provisionados e crescem ao longo do tempo.
    - Comissão de captação (vendas) é de 3% sobre a receita.

    --- FIM DO CONTEXTO ---
`;

async function searchWeb(query) {
    if (!CUSTOM_SEARCH_API_KEY || !CUSTOM_SEARCH_CX) return "Busca na web não configurada.";
    const url = `https://www.googleapis.com/customsearch/v1?key=${CUSTOM_SEARCH_API_KEY}&cx=${CUSTOM_SEARCH_CX}&q=${encodeURIComponent(query)}`;
    try {
        const { data } = await axios.get(url);
        if (data.items && data.items.length > 0) {
            return data.items.slice(0, 4).map(item => `Fonte: ${item.link}\nTítulo: ${item.title}\nConteúdo: ${item.snippet}`).join('\n\n');
        }
        return "Nenhum resultado relevante encontrado na web.";
    } catch (error) {
        return "Não foi possível realizar a busca na web no momento.";
    }
}

app.post('/perguntar', async (req, res) => {
    const { pergunta } = req.body;
    if (!pergunta) {
        return res.status(400).json({ error: "Nenhuma pergunta foi fornecida." });
    }
    try {
        const webContext = await searchWeb(pergunta);
        const fullContextPrompt = `
            ${labirintarContext}
            --- CONTEXTO DA WEB ---
            ${webContext}
            --- FIM DO CONTEXTO ---
            Pergunta do Investidor: "${pergunta}"`;
        
        const request = { contents: [{ role: 'user', parts: [{ text: fullContextPrompt }] }] };
        const result = await generativeModel.generateContent(request);
        const responseText = result.response.candidates[0].content.parts[0].text;
        
        res.status(200).json({ resposta: responseText });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao processar a pergunta com a IA." });
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});

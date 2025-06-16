// index.js (Versão Final e Completa)
const express = require('express');
const { VertexAI } = require('@google-cloud/vertexai');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// ===================================================================
//   INFORMAÇÕES DO SEU AMBIENTE - TUDO PREENCHIDO
// ===================================================================
const PROJECT_ID = 'empreendecao-ia-fresh-start'; 
const LOCATION = 'global'; 
const AGENT_ID = 'advisor-agent_1750090559374';

// Variáveis para a Busca na Web - Inseridas no código para simplicidade do deploy
const CUSTOM_SEARCH_API_KEY = 'AIzaSyDRqT16VLtVpWUiG3uLwdvljmU62977vEo';
const CUSTOM_SEARCH_CX = 'c7a45c5252eeb4954';
// ===================================================================

const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });
const generativeAgent = vertexAI.getGenerativeModel({ model: AGENT_ID });

// Esta função agora é um backup, caso a busca nativa do agente falhe.
async function searchWeb(query) {
  if (!CUSTOM_SEARCH_API_KEY || !CUSTOM_SEARCH_CX) return "Busca na web não configurada.";
  const url = `https://www.googleapis.com/customsearch/v1?key=${CUSTOM_SEARCH_API_KEY}&cx=${CUSTOM_SEARCH_CX}&q=${encodeURIComponent(query)}`;
  try {
    const { data } = await axios.get(url);
    if (data.items && data.items.length > 0) return data.items.slice(0, 3).map(item => `Fonte: ${item.link}\nTítulo: ${item.title}\nConteúdo: ${item.snippet}`).join('\n\n');
    return "Nenhum resultado relevante encontrado na web para complementar a resposta.";
  } catch (error) { 
      console.error("Erro na busca na web:", error.response?.data?.error?.message || error.message);
      return "Ocorreu um erro ao tentar buscar informações na web.";
  }
}

app.post('/perguntar', async (req, res) => {
  const { pergunta } = req.body;
  if (!pergunta) return res.status(400).json({ error: "Pergunta não fornecida." });

  try {
    const session = generativeAgent.startChat();
    console.log(`Enviando pergunta diretamente para o agente: "${pergunta}"`);
    
    // O agente da Vertex AI já está configurado para buscar nos seus documentos e na web.
    // Nós simplesmente enviamos a pergunta do usuário.
    const result = await session.sendMessage(pergunta);
    
    const responseText = result.response.candidates[0].content.parts[0].text;
    res.status(200).json({ resposta: responseText });

  } catch (error) {
    console.error("Erro no endpoint /perguntar:", error);
    res.status(500).json({ error: `Erro ao processar: ${error.message}` });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));

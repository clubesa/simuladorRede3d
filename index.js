// index.js (Versão Final para Vertex AI RAG Agent/App)
const express = require('express');
const { VertexAI } = require('@google-cloud/vertexai');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// ===================================================================
//   INFORMAÇÕES DO SEU AGENTE CRIADO NA VERTEX AI SEARCH
// ===================================================================
const PROJECT_ID = 'clube-s-a-olw97d'; 
const LOCATION = 'global';
const AGENT_ID = 'labirintar-investor-agent_1749919019359';
// ===================================================================


// Inicialize o cliente da Vertex AI.
// A autenticação padrão do Cloud Run deve ser suficiente.
const vertexAI = new VertexAI({ project: PROJECT_ID, location: LOCATION });

// Cria uma referência para o seu Agente
const generativeAgent = vertexAI.getGenerativeModel({
  model: AGENT_ID,
});

// Função para enviar uma mensagem para o agente
async function sendMessageToAgent(text) {
    // Inicia uma nova sessão de chat para cada pergunta.
    const session = generativeAgent.startChat();
    
    console.log(`Enviando pergunta para o agente: "${text}"`);

    const result = await session.sendMessage(text);
    
    // Verificação de segurança para garantir que a resposta existe
    if (!result.response.candidates?.[0]?.content?.parts?.[0]?.text) {
        console.error("Resposta da IA inválida ou vazia:", JSON.stringify(result, null, 2));
        throw new Error("A IA não retornou uma resposta válida.");
    }

    return result.response.candidates[0].content.parts[0].text;
}

// Endpoint que a sua página HTML vai chamar
app.post('/perguntar', async (req, res) => {
    const { pergunta } = req.body;
    
    if (!pergunta) {
        return res.status(400).json({ error: "Nenhuma pergunta foi fornecida." });
    }
    
    try {
        const responseText = await sendMessageToAgent(pergunta);
        res.status(200).json({ resposta: responseText });
    } catch (error) {
        console.error("Erro no endpoint /perguntar:", error);
        res.status(500).json({ error: `Erro ao processar sua pergunta: ${error.message}` });
    }
});

// Inicia o servidor na porta fornecida pelo Cloud Run
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor rodando e ouvindo na porta ${port}`);
});

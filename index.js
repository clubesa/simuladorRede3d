// index.js (Teste Simplificado CORRIGIDO)
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/perguntar', (req, res) => {
    // CORREÇÃO: Lendo diretamente de req.body
    const pergunta = req.body.pergunta;
    console.log(`Recebi a pergunta: ${pergunta}`);

    if (!pergunta) {
        return res.status(400).json({ error: "Nenhuma pergunta foi recebida no corpo da requisição." });
    }
    
    res.status(200).json({
        resposta: `Olá! Você perguntou sobre '${pergunta}'. A conexão está funcionando perfeitamente.`
    });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Servidor de teste rodando na porta ${port}`);
});

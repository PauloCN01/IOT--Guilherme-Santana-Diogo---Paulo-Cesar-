const express = require('express')
const app = express()
const routes = require('express').Router()

// 1. Variável global para armazenar o ÚLTIMO valor do sensor.
// Este é o mecanismo que permite o compartilhamento de dados entre as rotas.
let ultimoValorSensor = '' 

// --- ROTAS ---

// Rota 1: RECEBER DADO (Arduino)
// Esta rota é responsável por ATUALIZAR o valor do sensor.
routes.get('/teste/:sensor', (req, res) => {
    const valorRecebido = req.params.sensor
    
    // **AÇÃO CRUCIAL:** Armazena o valor recebido na variável global.
    ultimoValorSensor = valorRecebido

    console.log(`[DADOS] Valor recebido e armazenado: ${valorRecebido}`)
    
    res.send(`
        <html>
            <body>
                <h1>Dados Recebidos: ${valorRecebido}</h1>
                <p>O valor foi armazenado para ser exibido no dashboard.</p>
            </body>
        </html>
    `)
})


// Rota 2: NOVO ENDPOINT DE API
// Esta rota retorna apenas o último valor armazenado (JSON).
routes.get('/api/status/vaga', (req, res) => {
    const valorParaDashboard = ultimoValorSensor;
    console.log(`[API] Último valor lido: ${valorParaDashboard}`);
    
    // Retorna o valor em JSON
    res.json({
        valorSensor: valorParaDashboard
    });
});

// Rota 3: Rota para servir o index.html (seu dashboard)
// O :sensor é opcional ou removido, pois o valor será buscado via API.
// Aqui você deve servir o arquivo index.html, não o HTML gerado.

// Se você estiver usando Express para servir o arquivo estático:
app.use(express.static('public')) // Assumindo que index.html está em 'public'
// Ou para servir o arquivo index.html diretamente:
const path = require('path')
routes.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// --- CONFIGURAÇÃO DO SERVIDOR ---
app.use('/', routes)

app.listen(3000, () => {
    console.log('Aplicação rodando na porta 3000!')
})
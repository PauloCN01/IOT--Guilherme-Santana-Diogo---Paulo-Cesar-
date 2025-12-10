const express = require('express')
const path = require('path')
const app = express()

// servir arquivos estáticos (CSS, JS, imagens) diretamente da raiz do projeto
app.use(express.static(__dirname))

const routes = express.Router()
routes.get('/teste/:sensor', (req, res) => {
    const valor = req.params.sensor
    let resposta = "";
    if (valor > 5) {
        resposta = "Ocupado"
    } else {
        resposta = "Livre"
    }
    console.log('valor recebido', valor)
    console.log('resposta enviada', resposta)
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.use('/', routes)

app.listen(3000, () => {
    console.log('Aplicacao rodando! Acesse http://localhost:3000')
})
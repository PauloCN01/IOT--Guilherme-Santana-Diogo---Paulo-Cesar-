const express = require('express')
app = express()
routes = require('express').Router()

routes.get('/teste/:sensor', (req, res) => {
    const valor = req.params.sensor
    console.log('valor recebido', valor)
    res.send(`
        <html>
            <body>
                <h1>valor lido: ${valor}</h1>
            </body>
        </html>\r\n\r\n
`)
})
app.use('/', routes)
app.listen(3000, () => {
    console.log('Aplicação rodando!')
})

routes.get('/teste/dashboard/:sensor', (req, res) => {
    const valor = req.params.sensor
    console.log('valor recebido no dashboard', valor)
    res.send(`
        <html>
            <body>
                <h1>Dashboard - valor lido: ${valor}</h1>
            </body>
        </html>\r\n\r\n
`)

    // res.sendFile(__dirname + '/index.html')
})
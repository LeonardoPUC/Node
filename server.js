require('dotenv').config()
console.log('Chave', process.env.SECRET_KEY);

const express = require('express'); // Importa o módulo do Express Framework
const app = express(); // Inicializa um objeto de aplicação Express
const morgan = require('morgan'); 
app.use(morgan('common'));

app.use ('/site', express.static('public'))

app.get('/', (req, res) => {
    res.redirect('/site');
});

app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/site2', (req, res) => {
    res.render('index', { nome: 'Leonardo Neves' });
})

const apiRouter = require('./routes/apiRouter');
app.use ('/api', apiRouter);

const apiRouter2 = require('./routes/apiRouter2');
app.use ('/api/v2', apiRouter2);

const apiRouterSeg = require('./routes/apiRouterSeg');
app.use ('/api/seg', apiRouterSeg);

app.use ((req, res) => {    
    res.status(404);
    res.send('Recurso solicitado não existe');
})

// Inicializa o servidor HTTP na porta 3000
const port = 3000
const servidor = '127.0.0.1'
app.listen(port, function () {
  console.log(`Servidor rodando em http://${servidor}:${port}`);
});

const { Client } = require('pg'); 
const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const PORTA = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Cliente
const con = new Client ({
    host: 'localhost',
    user: 'postgres',
    port: 5432,
    password: 'postgres',
    database: 'acervolivro',
})

// Conexão com banco
con.connect().then(() => console.log("Conexão estabelecida com sucesso"));

// Rotas
// Adicionar livros
app.post('/livro', (req, res) => {
    const insertQuery = 'INSERT INTO livro(isbn, titulo, autor, descricao, pk_idgenero) VALUES ($1,$2,$3,$4,$5)';
    const {isbn, titulo, autor, descricao, idgenero} = req.body;

    con.query(insertQuery, [isbn, titulo, autor, descricao, idgenero], (err, result) => {
        if(err){
            res.status(401).json({err})
            console.log(err);
        }else{
            res.status(200).json({message: "Livro inserido com sucesso!"})
        }
    })
})

// Visualizar livros
app.get('/livro', (req, res) => {
    const fetchQuery = 'SELECT * FROM livro';

    con.query(fetchQuery, (err, result) => {
        if(err){
            res.status(401).json({err});
            console.log("Livros não encontrados");
        }else{
            res.status(200).send(result.rows);
        }
    })
})

// Visualizar generos
app.get('/genero', (req, res) => {
    const fetchQuery = 'SELECT * FROM genero';

    con.query(fetchQuery, (err, result) => {
        if(err){
            res.status(401).json({err});
            console.log("Generos não encontrados");
        }else{
            res.status(200).send(result.rows);
        }
    })
})

// Ligar API
app.listen(PORTA, () => {
    console.log(`Servidor rodando em: http://localhost:${PORTA}`)
})


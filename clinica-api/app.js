const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'clinica'
});

connection.connect(error => {
    if (error) throw error;
    console.log('Conectado ao banco de dados MySQL.');
});

app.get('/medicos', (req, res) => {
    connection.query('SELECT * FROM medicos', (error, results) => {
        if (error) throw error;
        res.send(results);
    });
});

app.post('/medicos', (req, res) => {
    const medico = req.body;
    connection.query('INSERT INTO medicos SET ?', medico, (error, results) => {
        if (error) throw error;
        res.send({ id: results.insertId, ...medico });
    });
});

app.put('/medicos/:id', (req, res) => {
    const { id } = req.params;
    const medico = req.body;
    connection.query('UPDATE medicos SET ? WHERE id = ?', [medico, id], (error, results) => {
        if (error) throw error;
        res.send(medico);
    });
});

app.delete('/medicos/:id', (req, res) => {
    const { id } = req.params;
    connection.query('DELETE FROM medicos WHERE id = ?', id, (error, results) => {
        if (error) throw error;
        res.send({ message: 'Médico deletado com sucesso.' });
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

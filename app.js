const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());


let receitas = [];

app.post('/receitas', (req, res) => {
    const { id, nomeReceita, ingredientesReceita, preparoDaReceita } = req.body;
    const novaReceita = { id, nomeReceita, ingredientesReceita, preparoDaReceita };
    receitas.push(novaReceita);
    res.status(201).json(novaReceita);
});


app.get('/receitas', (req, res) => {
    res.json(receitas);
});

app.get('/receitas/:id', (req, res) => {
    const { id } = req.params;
    const receita = receitas.find(r => r.id === id);
    if (receita) {
        res.json(receita);
    } else {
        res.status(404).json({ message: 'Receita não encontrada' });
    }
});

app.put('/receitas/:id', (req, res) => {
    const { id } = req.params;
    const { nomeReceita, ingredientesReceita, preparoDaReceita } = req.body;
    const index = receitas.findIndex(r => r.id === id);
    if (index !== -1) {
        receitas[index] = { id, nomeReceita, ingredientesReceita, preparoDaReceita };
        res.json(receitas[index]);
    } else {
        res.status(404).json({ message: 'Receita não encontrada' });
    }
});


app.delete('/receitas/:id', (req, res) => {
    const { id } = req.params;
    receitas = receitas.filter(r => r.id !== id);
    res.json({ message: 'Receita removida com sucesso' });
});


app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

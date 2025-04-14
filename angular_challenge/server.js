// server.js
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/login', (req, res) => {
  const { email, senha } = req.body;
  if (email === 'teste@ford.com' && senha === '123456') {
    res.json({ autenticado: true, nome: 'Pablo' });
  } else {
    res.json({ autenticado: false });
  }
});

app.listen(3000, () => console.log('API rodando na porta 3000'));

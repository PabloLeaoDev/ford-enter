import { createServer } from 'http';
import { readFile, writeFile } from 'fs';

let PORT = 3000;
let tries = 1;

function changePort(tries) {
  switch (tries) {
    case 1:
      PORT = 8000; 
      break;
    case 2:
      PORT = 8888; 
      break;
    case 3:
      PORT = 5000; 
      break;
    default:
      PORT = 3000;
      break;
  }
}

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
  
    if (req.url === '/' && req.method === 'GET') {
      res.writeHead(200);
      res.end('QUIET');
      return;
    }
  
    if (req.url === '/ping' && req.method === 'GET') {
      res.writeHead(200);
      res.end('OK');
      return;
    }

    if (req.method === 'POST' && req.url === '/save') {
        let body = '';

        req.on('data', (chunk) => body += chunk.toString());

        console.log(body);

        req.on('end', () => {
            try {
                const newData = JSON.parse(body);

                readFile('data.json', 'utf8', (err, fileData) => {
                    let jsonData = [];

                    if (!err && fileData) jsonData = JSON.parse(fileData);

                    for (let obj of jsonData) {
                        if (obj.cpf === newData.cpf) throw new Error('This datas exists in database.');
                    }

                    jsonData.push(newData);

                    writeFile('data.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
                        if (err) {
                            res.writeHead(500, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ error: 'Erro ao salvar os dados' }));
                        } else {
                            res.writeHead(200, { "Content-Type": "application/json" });
                            res.end(JSON.stringify({ message: 'Dados salvos com sucesso!' }));
                        }
                    });
                });
            } catch (error) {
                res.writeHead(400, { "Content-Type": "application/json" });
                res.end(JSON.stringify({ error: 'Erro ao processar os dados' }));
            }
        });
    } else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Porta ${PORT} em uso, tentando reiniciar...`);
    setTimeout(() => server.listen(PORT), 1000);
    changePort(tries);
    tries++;
    if (tries > 3) tries = 1;
  } else {
    console.error('Erro no servidor:', err);
  }
});

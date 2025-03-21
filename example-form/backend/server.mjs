import { createServer } from 'http';
import { readFile, writeFile } from 'fs';
import 'dotenv/config';

const server = createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === process.env.OPT) {
        res.writeHead(204);
        res.end();
        return;
    }

    if (req.method === process.env.METHOD && req.url === process.env.URL) {
        let body = '';

        req.on('data', (chunk) => body += chunk.toString());

        console.log(body);

        req.on('end', () => {
            try {
                const newData = JSON.parse(body);

                readFile(process.env.DATA_FILE, process.env.CHAR_CODE, (err, fileData) => {
                    let jsonData = [];

                    if (!err && fileData) jsonData = JSON.parse(fileData);

                    for (let obj of jsonData) {
                        if (obj.cpf === newData.cpf) throw new Error('This datas exists in database.');
                    }

                    jsonData.push(newData);

                    writeFile(process.env.DATA_FILE, JSON.stringify(jsonData, null, 2), process.env.CHAR_CODE, (err) => {
                        if (err) {
                            res.writeHead(500, JSON.parse(process.env.HEADERS));
                            res.end(JSON.stringify({ error: 'Erro ao salvar os dados' }));
                        } else {
                            res.writeHead(200, JSON.parse(process.env.HEADERS));
                            res.end(JSON.stringify({ message: 'Dados salvos com sucesso!' }));
                        }
                    });
                });
            } catch (error) {
                res.writeHead(400, JSON.parse(process.env.HEADERS));
                res.end(JSON.stringify({ error: 'Erro ao processar os dados' }));
            }
        });
    } else {
        res.writeHead(404, JSON.parse(process.env.HEADERS));
        res.end(JSON.stringify({ error: 'Rota não encontrada' }));
    }
});

server.listen(process.env.PORT, () => {
    console.log(`Servidor rodando em http://localhost:${process.env.PORT}`);
});

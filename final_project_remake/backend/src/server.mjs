import { FileReadError, DataAlreadyExistsError, SavingDataError } from './errors.mjs';
import fs from 'fs';
import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3001;

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('QUIET');
});

app.get('/ping', (req, res) => {
  res.send('OK');
});

app.post('/save', (req, res) => {
  const newData = req.body;

  const __filename = fileURLToPath(import.meta.url),
        __dirname = path.dirname(__filename);
  const dataFilePath = path.resolve(__dirname, 'data.json');

  fs.readFile(dataFilePath, 'utf8', (err, fileData) => {
    try {
        let jsonData = [];

        if (!err && fileData) {
            jsonData = JSON.parse(fileData);
        } else if (!fileData) {
            throw new FileReadError('Erro ao ler o arquivo JSON existente.');
        }
    
        const exists = jsonData.some(obj => obj.cpf === newData.cpf);
    
        if (exists) {
          throw new DataAlreadyExistsError('This data exists in database.');
        }
    
        jsonData.push(newData);
    
        fs.writeFile('data.json', JSON.stringify(jsonData, null, 2), 'utf8', (err) => {
          if (err) {
            throw new SavingDataError('Erro ao salvar os dados');
          }
    
          res.status(200).json({ message: 'Dados salvos com sucesso!' });
        });
    } catch (error) {
        if (error instanceof FileReadError) {
            return res.status(500).json({ error: error.message });
        } else if (error instanceof DataAlreadyExistsError) {
            return res.status(400).json({ error: error.message });
        } else if (error instanceof SavingDataError) {
            return res.status(500).json({ error: error.message });
        }
    }
  });
});

app.post('/login', (req, res) => {
    try {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({
                message: 'O campo de usuário ou senha não foi preenchido!'
            });
        }

        if (username !== 'admin' || password !== '123456') {
            return res.status(404).json({
                message: 'O nome de usuário ou senha está incorreto ou não foi cadastrado!'
            });
        }

        return res.status(200).json({
            id: 1,
            success: true,
            nome: 'admin',
            email: 'admin@email.com'
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Falha na comunicação com o servidor!'
        });
    }
});

app.get('/vehicle', (req, res) => {
    try {
        const vehicles = [
            {
                id: 1,
                model: 'Ranger',
                sales: 4158,
                connected: 700,
                updated: 1550,
                img: '/img/ranger.png'
            },
            {
                id: 2,
                model: 'Mustang',
                sales: 1500,
                connected: 500,
                updated: 750,
                img: '/img/mustang.png'
            },
            {
                id: 3,
                model: 'Territory',
                sales: 4560,
                connected: 1200,
                updated: 3050,
                img: '/img/territory.png'
            },
            {
                id: 4,
                model: 'Bronco Sport',
                sales: 2791,
                connected: 900,
                updated: 2140,
                img: '/img/broncoSport.png'
            }
        ];

        const { vehicleModel } = req.query;

        if (!vehicleModel) {
            return res.status(200).json(vehicles);
        }

        const vehicle = vehicles.find((v) => 
            v.model.toLowerCase() === vehicleModel.toLowerCase()
        );

        if (!vehicle) {
            return res.status(404).json({
                message: 'Veículo não encontrado!'
            });
        }

        return res.status(200).json([vehicle]);

    } catch (error) {
        return res.status(500).json({
            message: 'Falha na comunicação com o servidor!'
        });
    }
});

app.get('/vehicleData', (req, res) => {
    try {
        const { vin } = req.query;

        switch (vin) {
            case '2FRHDUYS2Y63NHD22454':
                return res.status(200).json({
                    id: 1,
                    odometro: 50000,
                    nivelCombustivel: 90,
                    status: 'on',
                    lat: -12.2322,
                    long: -35.2314
                });
            
            case '2RFAASOYS4E4HDU34875':
                return res.status(200).json({
                    id: 2,
                    odometro: 10000,
                    nivelCombustivel: 90,
                    status: 'on',
                    lat: -12.2322,
                    long: -35.2314
                });
        
            default:
                return res.status(404).json({
                    message: 'Código VIN utilizado não foi encontrado!'
                });
        }


    } catch (error) {
        return res.status(500).json({
            message: 'Falha na comunicação com o servidor!'
        });
    }
})

app.use((req, res) => {
  res.status(404).json({ error: 'Rota não encontrada' });
});

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}/`);
});

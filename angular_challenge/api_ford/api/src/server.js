const express = require('express');
const path = require('path');
const cors = require('cors')

const app = express();

app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, '..', 'public')));

app.post('/login', (req, res) => {
    try {
        const { nome, senha } = req.body

        if (!nome || !senha) {
            return res.status(400).json({
                message: 'O campo de usuário ou senha não foi preenchido!'
            });
        }

        if (nome !== 'admin' || senha !== '123') {
            return res.status(404).json({
                message: 'O nome de usuário ou senha está incorreto ou não foi cadastrado!'
            });
        }

        return res.status(200).json({
            id: 1,
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
                sales: 1500,
                connected: 500,
                updated: 750,
                img: 'http://localhost:3000/img/ranger.png'
            },
            {
                id: 2,
                model: 'Mustang',
                sales: 1500,
                connected: 500,
                updated: 750,
                img: 'http://localhost:3000/img/mustang.png'
            },
            {
                id: 3,
                model: 'Territory',
                sales: 1500,
                connected: 500,
                updated: 750,
                img: 'http://localhost:3000/img/territory.png'
            },
            {
                id: 4,
                model: 'Bronco Sport',
                sales: 1500,
                connected: 500,
                updated: 750,
                img: 'http://localhost:3000/img/broncoSport.png'
            }
        ];

        const { vehicleModel } = req.query;

        if (!vehicleModel) {
            return res.status(400).json({
                message: 'O campo de veículo não foi preenchido!'
            });
        }

        const vehicle = vehicles.find((vehicle) => vehicle.model.toLowerCase() === vehicleModel.toLocaleLowerCase());

        if (!vehicle) {
            return res.status(404).json({
                message: 'Veículo não encontrado!'
            });
        }

        return res.status(200).json({ ...vehicle });

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

app.listen(3000, () => {
    console.log('http://localhost:3000/');
});

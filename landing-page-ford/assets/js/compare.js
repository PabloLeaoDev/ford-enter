class Car {
    constructor() {
        this.name = "";
        this.price = 0;
        this.heightBucket = 0;
        this.heightVehicle = 0;
        this.heightSoil = 0;
        this.loadCapacity = 0;
        this.volumeBucket = 0;
        this.engine = null;
        this.wheel = null;
        this.image = "";
    }
}

class Engine {
    constructor(name, power) {
        this.name = name;
        this.power = power;
    }
}

class CarBuilder {
    constructor() {
        this.car = new Car();
    }

    commercialCharacteristicsBuilder(name, price) {
        this.car.name = name;
        this.car.price = price;
        return this;
    }

    carBodyBuilder(heightBucket, heightVehicle, heightSoil, loadCapacity, volumeBucket) {
        this.car.heightBucket = heightBucket;
        this.car.heightVehicle = heightVehicle;
        this.car.heightSoil = heightSoil;
        this.car.loadCapacity = loadCapacity;
        this.car.volumeBucket = volumeBucket;
        return this;
    }

    engineBuilder(name, power) {
        this.car.engine = new Engine(name, power);
        return this;
    }

    wheelBuilder(wheel) {
        this.car.wheel = wheel;
        return this;
    }

    imageBuilder(image) {
        this.car.image = image;
        return this;
    }

    build() {
        return this.car;
    }
}

const xl = new CarBuilder()
    .commercialCharacteristicsBuilder('Ranger XL Cabine Dupla Diesel 4x4 2022', 180_000)
    .carBodyBuilder(1.1, 1.8, 0.3, 1000, 1.9)
    .engineBuilder('Motor 2.2 Turbo Diesel', 160)
    .wheelBuilder('Rodas Aro 16')
    .imageBuilder('./assets/img/XL Cabine.jpg')
    .build();                        

const xls = new CarBuilder()
    .commercialCharacteristicsBuilder('Ranger XLS 2.2 Diesel 4x4 2022', 240_000)
    .carBodyBuilder(1.2, 1.85, 0.3, 1200, 2.2) 
    .engineBuilder('Motor 2.2 Turbo Diesel', 160)
    .wheelBuilder('Rodas Aro 17')
    .imageBuilder('./assets/img/xls 2.2 diesel.jpg')
    .build();

const storm = new CarBuilder()
    .commercialCharacteristicsBuilder('Ranger Storm Diesel 4x4 2022', 300_000)
    .carBodyBuilder(1.3, 1.9, 0.3, 1300, 2.4) 
    .engineBuilder('Motor 3.2 Turbo Diesel', 200)
    .wheelBuilder('Rodas Aro 18 Off-road')
    .imageBuilder('./assets/img/storm.jpg')
    .build();

let car;
let isModalActive = false;
const cars = [];
const checkbox = document.querySelectorAll('.check.in');
const btn = document.getElementById('btn-compare');
const dialog = document.getElementById('dinamic-dialog');
const closeDialogBtn = document.getElementById('close-dialog');

function changeModalFlag() {
    isModalActive = !isModalActive;
}

function carPositionInList(car) {
    for (let i in cars) {
        if (cars[i].nome === car.nome) {
            return i;
        }
    }

    return -1;
}

function whenClickingOnCheckbox(checkbox) {
    if (!checkbox.checked) {
        const carIdx = carPositionInList(car);

        if (carIdx > -1) cars.splice(carIdx, 1);

        return;
    }

    if (cars.length > 1) {
        checkbox.checked = false;
        alert('Não pode selecionar mais de 2 carros');

        return;
    }

    car = checkbox.nextElementSibling.childNodes[1].textContent.trim().split(' ')[1];

    switch (car.toLowerCase()) {
        case 'xl':
            cars.push(xl);
            break;
        case 'xls':
            cars.push(xls);
            break;
        case 'storm':
            cars.push(storm);
            break;
    }
}

function updateFieldTable(firstEl, secondEl, field, symbol = '', key = 'innerHTML') {
    const elements = [firstEl, secondEl];
    for (let i in elements) {
        // if (symbol === 'R$') elements[i][key] = `${cars[i][field]}${symbol}`
        elements[i][key] = `${cars[i][field]}${symbol}`
    };
}

function updateData() {
    const tdImage1 = document.getElementById('car-image1');
    const tdImage2 = document.getElementById('car-image2');
    updateFieldTable(tdImage1, tdImage2, 'image', key = 'src');
    
    const tdName1 = document.getElementById('car-name1');
    const tdName2 = document.getElementById('car-name2');
    updateFieldTable(tdName1, tdName2, 'name', key = 'name');

    const tdPrice1 = document.getElementById('car-price1');
    const tdPrice2 = document.getElementById('car-price2');
    tdPrice1.innerHTML = `R$ ${cars[0].price}`;
    tdPrice2.innerHTML = `R$ ${cars[1].price}`;

    const tdHbucket1 = document.getElementById('car-hbucket1');
    const tdHbucket2 = document.getElementById('car-hbucket2');
    tdHbucket1.innerHTML = `${cars[0].heightBucket}m`;
    tdHbucket2.innerHTML = `${cars[1].heightBucket}m`;

    const tdHvehicle1 = document.getElementById('car-hvehicle1');
    const tdHvehicle2 = document.getElementById('car-hvehicle2');
    tdHvehicle1.innerHTML = `${cars[0].heightVehicle}m`;
    tdHvehicle2.innerHTML = `${cars[1].heightVehicle}m`;

    const tdHsoil1 = document.getElementById('car-hsoil1');
    const tdHsoil2 = document.getElementById('car-hsoil2');
    tdHsoil1.innerHTML = `${cars[0].heightSoil}cm`;
    tdHsoil2.innerHTML = `${cars[1].heightSoil}cm`;

    const tdLoadCapacity1 = document.getElementById('car-lcapacity1');
    const tdLoadCapacity2 = document.getElementById('car-lcapacity2');
    tdLoadCapacity1.innerHTML = `${cars[0].loadCapacity}kg`;
    tdLoadCapacity2.innerHTML = `${cars[1].loadCapacity}kg`;

    const tdVolumeBucket1 = document.getElementById('car-vbucket1');
    const tdVolumeBucket2 = document.getElementById('car-vbucket2');
    tdVolumeBucket1.innerHTML = `${cars[0].volumeBucket}m³`;
    tdVolumeBucket2.innerHTML = `${cars[1].volumeBucket}m³`;

    const tdEngineName1 = document.getElementById('car-engname1');
    const tdEngineName2 = document.getElementById('car-engname2');
    tdEngineName1.innerHTML = cars[0].engine.name;
    tdEngineName2.innerHTML = cars[1].engine.name;

    const tdEnginePower1 = document.getElementById('car-engpower1');
    const tdEnginePower2 = document.getElementById('car-engpower2');
    tdEnginePower1.innerHTML = `${cars[0].engine.power}cv`;
    tdEnginePower2.innerHTML = `${cars[1].engine.power}cv`;
    
    const tdWheel1 = document.getElementById('car-wheel1');
    const tdWheel2 = document.getElementById('car-wheel2');
    tdWheel1.innerHTML = cars[0].wheel;
    tdWheel2.innerHTML = cars[1].wheel;
}

function showCompare() {
    if (cars.length !== 2) {
        alert('O número de carros tem que ser 2');
        return;
    }

    updateData();
    
    if (!isModalActive) dialog.showModal();  
    
    changeModalFlag();
}

function hideCompare() {
    changeModalFlag();
    dialog.close();
}

checkbox.forEach((input) => input.addEventListener('click', () => whenClickingOnCheckbox(input)));
btn.addEventListener('click', () => showCompare());
closeDialogBtn.addEventListener('click', () => hideCompare());
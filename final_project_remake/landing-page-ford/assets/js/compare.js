class Car {
    constructor() {
        this.name = '';
        this.price = 0;
        this.bucketHeight = 0;
        this.vehicleHeight = 0;
        this.soilHeight = 0;
        this.loadCapacity = 0;
        this.bucketVolume = 0;
        this.engine = null;
        this.wheel = null;
        this.image = '';
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

    carBodyBuilder(bucketHeight, vehicleHeight, soilHeight, loadCapacity, bucketVolume) {
        this.car.bucketHeight = bucketHeight;
        this.car.vehicleHeight = vehicleHeight;
        this.car.soilHeight = soilHeight;
        this.car.loadCapacity = loadCapacity;
        this.car.bucketVolume = bucketVolume;
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
    .commercialCharacteristicsBuilder('Ranger XL Cabine Diesel 4x4 2022', 180_000)
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

let carName;
let isModalActive = false;
const cars = [];
const checkbox = document.querySelectorAll('.check.in');
const btn = document.getElementById('btn-compare');
const dialog = document.getElementById('dinamic-dialog');
const closeDialogBtn = document.getElementById('close-dialog');

function changeModalFlag() {
    isModalActive = !isModalActive;
}

function carPositionInList(carName) {
    for (let i in cars) {
        if (cars[i].name === carName) {
            return i;
        }
    }

    return -1;
}

function whenClickingOnCheckbox(checkbox) {
    carName = checkbox.nextElementSibling.childNodes[1].textContent;

    if (!checkbox.checked) {
        const carIdx = carPositionInList(carName);

        if (carIdx > -1) cars.splice(carIdx, 1);

        return;
    }

    if (cars.length > 1) {
        checkbox.checked = false;
        alert('Não pode selecionar mais de 2 carros');

        return;
    }

    carName = carName.split(' ')[1];

    switch (carName.toLowerCase()) {
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

function updateFieldTable(index, element, field, symbolR = '', symbolL = '', domKey = 'innerHTML', isEngine = false) {
    let text = `${symbolR} ${cars[index - 1][field]}${symbolL}`;

    if (isEngine) text = `${cars[index - 1].engine[field]}${symbolL}`;

    if (element) element[domKey] = text.trim();
}

function updateData() {
    const ids = [
        'name',
        'price',
        'hbucket',
        'hvehicle',
        'hsoil',
        'lcapacity',
        'vbucket',
        'engname',
        'engpower',
        'wheel',
        'image'
    ];

    const fields = [
        'name',
        'price',
        'bucketHeight',
        'vehicleHeight',
        'soilHeight',
        'loadCapacity',
        'bucketVolume',
        'name',
        'power',
        'wheel',
        'image'
    ];

    ids.forEach((id, index) => {
        for (let i = 1; i <= 2; i++) {
            const element = document.getElementById(`car-${id}${i}`);

            if (id === 'price') {
                updateFieldTable(i, element, fields[index], ' R$');
                continue;
            } else if (id === 'hbucket' || id === 'hvehicle') {
                updateFieldTable(i, element, fields[index], '', ' m');
                continue;
            } else if (id === 'hsoil') {
                updateFieldTable(i, element, fields[index], '', ' cm');
                continue;
            } else if (id === 'lcapacity') {
                updateFieldTable(i, element, fields[index], '', ' kg');
                continue;
            } else if (id === 'vbucket') {
                updateFieldTable(i, element, fields[index], '', ' m³');
                continue;
            } else if (id === 'image') {
                updateFieldTable(i, element, fields[index], '', '', 'src');
                continue;
            } else if (id === 'engname' && index > 0) {
                updateFieldTable(i, element, fields[index], '', '', 'innerHTML', true);
                continue;
            } else if (id === 'engpower') {
                updateFieldTable(i, element, fields[index], '', ' hp', 'innerHTML', true);
                continue;
            }

            updateFieldTable(i, element, fields[index]);
        }
    });
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

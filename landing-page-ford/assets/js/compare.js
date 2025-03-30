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
    .commercialCharacteristicsBuilder("Caminhão X", 100000)
    .carBodyBuilder(2.5, 4.0, 0.5, 5000, 15)
    .engineBuilder("Motor Turbo", 450)
    .wheelBuilder("Rodas Off-road")
    .imageBuilder("imagem.png")
    .build();                        
const xls = new CarBuilder()
    .commercialCharacteristicsBuilder("Caminhão X", 100000)
    .carBodyBuilder(2.5, 4.0, 0.5, 5000, 15)
    .engineBuilder("Motor Turbo", 450)
    .wheelBuilder("Rodas Off-road")
    .imageBuilder("imagem.png")
    .build();
const storm = new CarBuilder()
    .commercialCharacteristicsBuilder("Caminhão X", 100000)
    .carBodyBuilder(2.5, 4.0, 0.5, 5000, 15)
    .engineBuilder("Motor Turbo", 450)
    .wheelBuilder("Rodas Off-road")
    .imageBuilder("imagem.png")
    .build();

let car;
const cars = [];
const btn = document.getElementById('btn-compare');
const checkbox = document.querySelectorAll('.check.in');

function whenClickingOnCheckbox(checkbox) {
    if(!checkbox.checked) {
        const carIdx = carPositionInList(car);
        cars.splice(carIdx, 1);

        return;
    }

    if(cars.length > 1) {
        checkbox.checked = false;
        alert('Não pode selecionar mais de duas pessoas');

        return;
    }

    car = checkbox.nextElementSibling.childNodes[1].textContent.split('')[1];

    switch (car) {
        case car.toLowerCase() === 'xl':
            cars.push(xl);
            break;
        case car.toLowerCase() === 'xls':
            cars.push(xls);
            break;
        case car.toLowerCase() === 'storm':
            cars.push(storm);
            break;
    }
}

function carPositionInList(pessoa) {
    for(let i = 0; i < cars.length; i++){
        if(cars[i].nome === pessoa.nome) {
            return i;
        }
    }
    return -1;
}

function AtualizarDados() {

    const img = document.getElementById('pessoa-imagem-1')
    const img1 = document.getElementById('pessoa-imagem-2')

    img.src = cars[0].image
    img1.src = cars[1].image
    
    // Adiciona nome na tabela
    const tdNomeUm = document.getElementById('pessoa-nome-1')
    const tdNomeDois = document.getElementById('pessoa-nome-2')

    tdNomeUm.innerHTML = cars[0].nome
    tdNomeDois.innerHTML = cars[1].nome


    // Adiciona idade na tabela
    const tdIdadeUm = document.getElementById('pessoa-idade-1')
    const tdIdadeDois = document.getElementById('pessoa-idade-2')

    tdIdadeUm.innerHTML = cars[0].idade
    tdIdadeDois.innerHTML = cars[1].idade


    // Adiciona a altura na tabela
    const tdAlturaUm = document.getElementById('pessoa-altura-1')
    const tdAlturaDois = document.getElementById('pessoa-altura-2')

    tdAlturaUm.innerHTML = cars[0].altura
    tdAlturaDois.innerHTML = cars[1].altura
}

function ExibirComparacao() {

    if(cars.length !== 2) {
        alert('O número de pessoas tem que ser dois')
        return
    }

    AtualizarDados()
    
    const dialog = document.getElementById('mostrar-tabela')

    dialog.showModal()
}

function EsconderComparacao() {
    const dialog = document.getElementById('mostrar-tabela')
    dialog.close()
}

btn.addEventListener('click', () => {

})

checkbox.forEach((input) => input.addEventListener('click', () => console.log(input)))

function writeText(text) {
    document.write(`${text}`);
    document.write('<br>');
}

function invalidValueWarn() {
    alert('Por favor, digite um valor válido.');
}

function loopWhileInvalidValuePrompt(text) {
    let question, count = 0;
    do {
        if (count > 0) invalidValueWarn();
        question = prompt(text);
        if (question === null) throw new Error('O processo foi cancelado.');
        question = parseFloat(question.replace(',', '.'));
        count++;
        console.log(question);
    } while (isNaN(question) || question <= 0);
    
    return question;
}

const questionTexts = {
    km_distance: 'Qual a distância percorrida da sua casa até o trabalho (em km)?',
    vehicle_consumption: 'Qual o consumo médio do veículo (em Km/L)?',
    stations_quantity: 'Em quantos postos você pesquisou?'
}

const kmDistance = loopWhileInvalidValuePrompt(questionTexts.km_distance),
    vehicleConsumption = loopWhileInvalidValuePrompt(questionTexts.vehicle_consumption),
    stationsQuantity = loopWhileInvalidValuePrompt(questionTexts.stations_quantity);
let sumStationPrices = 0, mostCheapStation = 0, currentStationPrice = 0;

for (let i = 0; i < stationsQuantity; i++) {
    currentStationPrice = loopWhileInvalidValuePrompt(`Digite o valor encontrado (em R$) no posto ${i + 1}:`);
    sumStationPrices += currentStationPrice;
    if (i === 0 || currentStationPrice < mostCheapStation) {
        mostCheapStation = currentStationPrice;
    }
}

const necessaryConsumption = (kmDistance / vehicleConsumption).toFixed(2),
    averageStationPrices = (sumStationPrices / stationsQuantity).toFixed(2),
    dailyCost = 2 * (necessaryConsumption * mostCheapStation);

const answerTexts = {
    necessary_consumption: `O consumo necessário é <strong>${necessaryConsumption} litros</strong>.`,
    most_cheap_station: `O menor valor pesquisado é <strong>R$${mostCheapStation}</strong>.`,
    average_station_prices: `A média de valores pesquisados é <strong>R$${averageStationPrices}</strong>.`,
    daily_cost: `O gasto diário (ida e volta) é <strong>R$${dailyCost}</strong>.`
}

function finalText() {
    for (let answers of Object.values(answerTexts)) {
        console.log(answers);
        writeText(answers);
    }
}
finalText();
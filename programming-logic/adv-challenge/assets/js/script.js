const btn = document.querySelector('#btn');

btn.addEventListener('click', (e) => {
    e.preventDefault();
    principal();
});

function principal() {
    const field = document.querySelector('#field'),
        numStation = document.querySelector('#num-station'),
        kmDistance = Number(document.querySelector('#ikm-distance').value),
        vehicleConsumption = Number(document.querySelector('#ivehicle-consumption').value),
        stationsQuantity = Number(document.querySelector('#istations-quantity').value),
        stationPricesField = Number(document.querySelector('#istation-prices').value);
    console.log(kmDistance, vehicleConsumption, stationsQuantity, stationPricesField)
}
    function invalidValueWarn() {
        alert('Por favor, digite um valor válido.');
    }
    // 
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
        // 
        return question;
    }
    // 
    let sumStationPrices = 0, mostCheapStation = 0, currentStationPrice = 0;
    // 
    function renderHTMLForm() {
        for (let i = 0; i < stationsQuantity; i++) {
            numStation.innerHTML = `${i + 1}`;
            currentStationPrice = stationPricesField.value;
            sumStationPrices += currentStationPrice;
            if (i === 0 || currentStationPrice < mostCheapStation) {
                mostCheapStation = currentStationPrice;
            }
        }
    }
    // 
    const necessaryConsumption = (kmDistance / vehicleConsumption).toFixed(2);
    const averageStationPrices = (sumStationPrices / stationsQuantity).toFixed(2);
    const dailyCost = (2 * (necessaryConsumption * mostCheapStation)).toFixed(2);
    // 
    const texts = {
        necessaryConsumption: `O consumo necessário é <u>${necessaryConsumption} litros</u>.`,
        mostCheapStation: `O menor valor pesquisado é <u>R$${mostCheapStation}</u>.`,
        averageStationPrices: `A média de valores pesquisados é <u>R$${averageStationPrices}</u>.`,
        dailyCost: `O gasto diário (ida e volta) é <u>R$${dailyCost}</u>.`
    }
    // 
    function finalText() {
        writeText(texts.necessaryConsumption);
        writeText(texts.mostCheapStation);
        writeText(texts.averageStationPrices);
        writeText(texts.dailyCost);
    }
    finalText();
// 
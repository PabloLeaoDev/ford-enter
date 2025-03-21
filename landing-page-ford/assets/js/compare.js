class Car {
    static #flagCanCallAbstractCarFactory = true;
    static elements = document.querySelectorAll('.check');
    static selectedCarElements = [];

    constructor(name, price, heightBucket, heightVechicle, heightSoil, loadCapacity, engine, power, volumeBucket, wheel, image) {
        console.log(Car.elements);
    }

    static abstractCarFactory() {
        if (Car.#flagCanCallAbstractCarFactory) {
            Car.elements.forEach((el) => {
                console.log(el);
                el.addEventListener('click', (event) => {
                    if (el.checked) {
                        Car.selectedCarElements.push(el)
                    } else {
                        if (Car.selectedCarElements.includes(el)) {

                        }
                    }
                    console.log(Car.selectedCarElements)
                });
            });

            Car.#flagCanCallAbstractCarFactory = false;

            console.log('abstractCarFactory method was called!');
            return 1; 
        }
        return 0;
    }
} 

function getSelectedCars(elements) {

}

// search on array if exist carClass returning 1 if not return -1
function GetCarArrPosition(arr, carClass) {
    for(let i = 0; i < arr.length; i++){
        if(arr[i].nome  === carClass.nome)
            return i;
    }
    return -1;
}

function SetCarToCompare(el, carClass) {
   
    if(carClass instanceof Car){       
        if(el.checked){
                
            
        } else {
          
        } 
    } else {
        throw "You need set a Car Class";
    }
}

function ShowCompare() {
    if(carArr.length < 2) {
        alert("Precisa marcar 2 carros para apresentar a comparação");
        return;
    }

    UpdateCompareTable();
    document.getElementById("compare").style.display = "block";
}

function HideCompare(){
    document.getElementById("compare").style.display = "none"; 
}

function UpdateCompareTable() {
    
}


// new Car();
// Car.abstractCarFactory()
// console.log(Car.selectedCarElements)
class Forma {
  calcularArea() {
    // Método a ser sobrescrito pelas subclasses
    return 0;
  }
}

class Retangulo extends Forma {
  constructor(largura, altura) {
    super();
    this.largura = largura;
    this.altura = altura;
  }
  
  calcularArea() {
    return this.largura * this.altura;
  }
}

class Circulo extends Forma {
  constructor(raio) {
    super();
    this.raio = raio;
  }
  
  calcularArea() {
    return Math.PI * this.raio * this.raio;
  }
}

// Função que demonstra polimorfismo
function imprimirArea(forma) {
  console.log(`Área: ${forma.calcularArea().toFixed(2)}`);
}

const formas = [
  new Retangulo(5, 10),
  new Circulo(7)
];

formas.forEach(forma => imprimirArea(forma));
// Área: 50.00
// Área: 153.94
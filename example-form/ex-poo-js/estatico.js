class Matematica {
  // Método estático
  static somar(a, b) {
    return a + b;
  }
  
  // Atributo estático
  static PI = 3.14159;
}

// Chamando método estático sem instanciar a classe
console.log(Matematica.somar(5, 3)); // 8
console.log(Matematica.PI); // 3.14159
function logarClasse(constructor: Function) {
    console.log(`Classe criada: ${constructor.name}`);
}

@logarClasse
class Carro {
    constructor(public modelo: string) {}
}

// Saída no console: "Classe criada: Carro"

// JS não tem decorators nativos (só com Babel/experimental)
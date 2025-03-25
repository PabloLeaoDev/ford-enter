class Pessoa {
  constructor(nome, idade) {
    this.nome = nome;
    this.idade = idade;
  }
  
  apresentar() {
    console.log(`Olá, meu nome é ${this.nome} e tenho ${this.idade} anos.`);
  }
}

// Criando uma instância da classe Pessoa
const pessoa1 = new Pessoa('João', 30);
pessoa1.apresentar(); // Olá, meu nome é João e tenho 30 anos.

// Criando outra instância da classe Pessoa
const pessoa2 = new Pessoa('Maria', 25);
pessoa2.apresentar(); // Olá, meu nome é João e tenho 30 anos.


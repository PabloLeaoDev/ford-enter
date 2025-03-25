class ContaBancaria {
  // Campo privado (usando #)
  #saldo;
  
  constructor(titular, saldoInicial) {
    this.titular = titular; // Campo público
    this.#saldo = saldoInicial;
  }
  
  // Método público para acessar saldo privado
  verSaldo() {
    console.log(`Saldo atual: R$${this.#saldo.toFixed(2)}`);
  }
  
  depositar(valor) {
    this.#saldo += valor;
    console.log(`Depósito de R$${valor.toFixed(2)} realizado.`);
  }
}

const minhaConta = new ContaBancaria("Maria", 1000);
minhaConta.verSaldo(); // Saldo atual: R$1000.00
// minhaConta.#saldo = 5000; // Erro - propriedade privada não pode ser acessada diretamente

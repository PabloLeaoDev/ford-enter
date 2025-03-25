class Produto {
  constructor(nome, preco) {
    this._nome = nome;
    this._preco = preco;
    this._desconto = 0;
  }
  
  // Getter
  get preco() {
    return this._preco * (1 - this._desconto);
  }
  
  // Setter
  set desconto(novoDesconto) {
    if (novoDesconto >= 0 && novoDesconto <= 1) {
      this._desconto = novoDesconto;
    } else {
      console.log("Desconto deve ser entre 0 e 1");
    }
  }
  
  // Outro getter
  get info() {
    return `${this._nome} - R$${this.preco.toFixed(2)} (${this._desconto * 100}% off)`;
  }
}

const notebook = new Produto("Notebook", 3000);
console.log(notebook.info); // Notebook - R$3000.00 (0% off)

notebook.desconto = 0.2; // Aplica 20% de desconto
console.log(notebook.info); // Notebook - R$2400.00 (20% off)

notebook.desconto = 1.5; // Desconto deve ser entre 0 e 1
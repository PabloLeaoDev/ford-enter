export default class Carro {
  public nome: string;
  protected velocidade: number;
  private static readonly _nomeDonoCarro = 'Fulano';

  constructor(nome: string, velocidade: number) {
    this.nome = nome;
    this.velocidade = velocidade;
  }

  static get nomeDonoCarro() { // ele não é permissivo nos Getters e Setters, como o JS
    return this.nomeDonoCarro;
  }
}
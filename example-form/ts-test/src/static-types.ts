let nome: string = 'João';
let idade: number = 30;
let ativo: boolean = true;

// JS equivalente (não tem tipagem)
// let nome = 'João';
// let idade = 30;
// let ativo = true;

// Função com tipos definidos
function soma(a: number, b: number): number {
  return a + b;
}

// Erro: Argument of type 'string' is not assignable to parameter of type 'number'
// soma('5', 10);
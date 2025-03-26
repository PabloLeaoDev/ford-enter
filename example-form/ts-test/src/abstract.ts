abstract class Animal {
  abstract fazerBarulho(): void; // Deve ser implementado

  mover(): void {
    console.log('Movendo...');
  }
}

class Cachorro extends Animal {
  fazerBarulho(): void {
    console.log('Au au!');
  }

  override mover(): void {
    console.log("Cachorro corre");
  }
}
interface Usuario {
  id: number;
  nome: string;
  email?: string; // Opcional
}

// Função que usa a interface
function imprimirUsuario(usuario: Usuario) {
  console.log(usuario.nome);
}

imprimirUsuario({ id: 1, nome: 'Maria' });

imprimirUsuario({ id: 2 }); 
enum StatusPedido {
  Pendente = 'PENDENTE',
  Enviado = 'ENVIADO',
  Entregue = 'ENTREGUE',
}

const meuPedido = {
  produto: 'Notebook',
  status: StatusPedido.Pendente,
};

console.log(meuPedido.status); // 'PENDENTE'

// JS não tem enums nativos (teria que usar objetos)
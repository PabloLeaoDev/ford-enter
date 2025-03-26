function identidade<T>(valor: T): T {
    return valor;
}

// Uso com tipos diferentes
let numero = identidade<number>(42); // Tipo inferido: number
let texto = identidade<string>("Olá"); // Tipo inferido: string

// JS não tem suporte a generics (só aceita tipos dinâmicos)
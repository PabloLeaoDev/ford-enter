// 🔹 Simulação de Interface usando um Mixin
const IConta = {
    depositar(valor) {
        throw new Error("Método 'depositar' deve ser implementado.");
    },
    sacar(valor) {
        throw new Error("Método 'sacar' deve ser implementado.");
    },
    verSaldo() {
        throw new Error("Método 'verSaldo' deve ser implementado.");
    }
};

// 🔹 Classe Base ContaBancaria
class ContaBancaria {
    // 🔹 Propriedades privadas com #
    #saldo;

    // 🔹 Propriedade protegida (por convenção, não é 100% segura)
    _tipoConta;

    // 🔹 Usando Symbol para criar um identificador privado
    static #idConta = Symbol("id");

    constructor(saldoInicial, tipoConta) {
        if (new.target === ContaBancaria) {
            throw new Error("ContaBancaria é uma classe abstrata e não pode ser instanciada.");
        }

        this.#saldo = saldoInicial;
        this._tipoConta = tipoConta;
        this[ContaBancaria.#idConta] = Math.floor(Math.random() * 10000);
    }

    // 🔹 Getter para acessar saldo
    get saldo() {
        return `Saldo atual: R$ ${this.#saldo.toFixed(2)}`;
    }

    // 🔹 Setter que impede atribuição direta
    set saldo(valor) {
        throw new Error("Não é possível modificar o saldo diretamente!");
    }

    // 🔹 Métodos protegidos (não devem ser acessados diretamente)
    _atualizarSaldo(valor) {
        this.#saldo += valor;
    }

    // 🔹 Métodos públicos
    depositar(valor) {
        if (valor <= 0) {
            console.log("Depósito deve ser maior que zero.");
            return;
        }
        this._atualizarSaldo(valor);
        console.log(`Depósito de R$ ${valor.toFixed(2)} realizado com sucesso.`);
    }

    sacar(valor) {
        if (valor <= 0) {
            console.log("O saque deve ser maior que zero.");
            return;
        }
        if (valor > this.#saldo) {
            console.log("Saldo insuficiente.");
            return;
        }
        this._atualizarSaldo(-valor);
        console.log(`Saque de R$ ${valor.toFixed(2)} realizado com sucesso.`);
    }

    verSaldo() {
        console.log(this.saldo);
    }

    // 🔹 Método estático
    static tipoDeConta() {
        return "Conta Bancária";
    }

    // 🔹 Método para obter o ID da conta
    getIdConta() {
        return this[ContaBancaria.#idConta];
    }
}

// 🔹 ContaCorrente herdando ContaBancaria (com polimorfismo)
class ContaCorrente extends ContaBancaria {
    constructor(saldoInicial, limiteChequeEspecial) {
        super(saldoInicial, "Conta Corrente");
        this._limiteChequeEspecial = limiteChequeEspecial;
    }

    // 🔹 Sobrescrevendo método sacar (polimorfismo)
    sacar(valor) {
        if (valor <= 0) {
            console.log("O saque deve ser maior que zero.");
            return;
        }

        if (valor > (this._limiteChequeEspecial + this._saldo)) {
            console.log("Saldo insuficiente, mesmo com cheque especial.");
            return;
        }

        this._atualizarSaldo(-valor);
        console.log(`Saque de R$ ${valor.toFixed(2)} realizado com cheque especial.`);
    }

    // 🔹 Método específico da conta corrente
    aumentarLimite(valor) {
        if (valor > 0) {
            this._limiteChequeEspecial += valor;
            console.log(`Limite de cheque especial aumentado para R$ ${this._limiteChequeEspecial.toFixed(2)}`);
        } else {
            console.log("O valor deve ser positivo.");
        }
    }
}

// 🔹 ContaPoupanca herdando ContaBancaria (com polimorfismo)
class ContaPoupanca extends ContaBancaria {
    constructor(saldoInicial, taxaJuros) {
        super(saldoInicial, "Conta Poupança");
        this._taxaJuros = taxaJuros;
    }

    // 🔹 Método específico da conta poupança
    aplicarJuros() {
        const juros = (this._taxaJuros / 100) * this._saldo;
        this._atualizarSaldo(juros);
        console.log(`Juros de R$ ${juros.toFixed(2)} aplicados.`);
    }
}

// 🔹 Testes

console.log("=== Criando Contas ===");
const contaCorrente = new ContaCorrente(1000, 500);
const contaPoupanca = new ContaPoupanca(2000, 1.5);

console.log("\n=== Depósitos ===");
contaCorrente.depositar(500);
contaPoupanca.depositar(1000);

console.log("\n=== Saldos ===");
contaCorrente.verSaldo();
contaPoupanca.verSaldo();

console.log("\n=== Saques ===");
contaCorrente.sacar(2000); // Deve permitir saque com cheque especial
contaPoupanca.sacar(500);

console.log("\n=== Aplicação de Juros ===");
contaPoupanca.aplicarJuros();
contaPoupanca.verSaldo();

console.log("\n=== IDs das Contas ===");
console.log(`ID Conta Corrente: ${contaCorrente.getIdConta()}`);
console.log(`ID Conta Poupança: ${contaPoupanca.getIdConta()}`);

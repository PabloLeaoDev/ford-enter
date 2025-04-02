class Contact {
    #elements;

    constructor(name, middlename, email, cpf, phoneNumber, contact) {
        this.#elements = { name, middlename, email, cpf, phoneNumber, contact };
    }

    get elements() {
        return this.#elements;
    }
}

function Post(form) {
    const data = new Contact(
        form.elements.namedItem('name').value,
        form.elements.namedItem('middlename').value, 
        form.elements.namedItem('email').value, 
        form.elements.namedItem('cpf').value, 
        form.elements.namedItem('phone-number').value, 
        form.elements.namedItem('contact').value
    );

    return data.elements;
}

function Submit() {
    const name = document.getElementById('name');

    if (name.value) {
        alert(`Obrigado sr(a) ${name.value}. Os seus dados foram encaminhados com sucesso!`);
    }
}
class Contact {
  #elements;

  constructor(name, middlename, email, cpf, phoneNumber, contact) {
    this.#elements = { name, middlename, email, cpf, phoneNumber, contact };
  }

  get elements() {
    return this.#elements;
  }

  set elements(newElements) {
    if (typeof newElements !== 'object') {
      console.error('Elements needs to be an Object');
      return;
    }

    for (let key in this.#elements) {
      if (!newElements[key]) {
        console.error('Elements passed is incomplete');
        return;
      }
    }

    this.#elements = newElements;
  }
}

function alphabetValidator(text) {
  if (typeof text !== 'string') return;

  const accentedLettersCodes = [
    0x00c0, // À
    0x00c1, // Á
    0x00c2, // Â
    0x00c3, // Ã
    0x00c8, // È
    0x00c9, // É
    0x00ca, // Ê
    0x00cc, // Ì
    0x00cd, // Í
    0x00d2, // Ò
    0x00d3, // Ó
    0x00d4, // Ô
    0x00d5, // Õ
    0x00d9, // Ù
    0x00da, // Ú
  ];

  const accentedLetters = accentedLettersCodes.map((code) =>
      String.fromCharCode(code)
    ),
    alphabet = Array.from({ length: 26 }, (_, i) =>
      String.fromCharCode(65 + i)
    ),
    combAlpha = alphabet.concat(accentedLetters),
    getChars = text
      .split('')
      .map((char) => char.toUpperCase())
      .map((char) => (!combAlpha.includes(char) ? '' : char));

  return !getChars.includes('');
}

function nameValidator(name) {
  if (!alphabetValidator(name)) return false;

  const arrName = name.split(' ');

  return arrName.length <= 2;
}

function cpfValidator(cpf) {
  const cleanCpf = cpf.trim().replace(/\D/g, '');

  if (cleanCpf.length !== 11 || /^(\d)\1{10}$/.test(cleanCpf)) return false;

  const calculateDigit = (partialCpf, initialWeight) => {
    const sum = partialCpf
      .split('')
      .reduce(
        (acc, digit, index) => acc + Number(digit) * (initialWeight - index),
        0
      );
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  const firstDigit = calculateDigit(cleanCpf.slice(0, 9), 10);

  const secundDigit = calculateDigit(cleanCpf.slice(0, 10), 11);

  return cleanCpf.slice(-2) === `${firstDigit}${secundDigit}`;
}

function phoneNumberValidator(phoneNumber) {
  const cleanPhoneNumber = phoneNumber.replace(/[^\d]/g, '');

  if (isNaN(Number(cleanPhoneNumber))) return;

  return cleanPhoneNumber.split('').length === 11;
}

function formValidator(formFields) {
  const isNameFieldValid = nameValidator(formFields.name),
    isMiddlenameFieldValid = alphabetValidator(formFields.middlename),
    isCpfFieldValid = cpfValidator(formFields.cpf),
    isPhoneNumberFieldValid = phoneNumberValidator(formFields.phoneNumber);

  const areFieldsValid =
    isNameFieldValid &&
    isMiddlenameFieldValid &&
    isCpfFieldValid &&
    isPhoneNumberFieldValid;

  return [areFieldsValid, {
    nome: isNameFieldValid,
    sobrenome: isMiddlenameFieldValid,
    cpf: isCpfFieldValid,
    telefone: isPhoneNumberFieldValid
  }];
}

async function post(form) {
  const data = new Contact(
    form.elements.namedItem('name').value.trim(),
    form.elements.namedItem('middlename').value.trim(),
    form.elements.namedItem('email').value.trim(),
    form.elements.namedItem('cpf').value,
    form.elements.namedItem('phone-number').value,
    form.elements.namedItem('contact').value
  );

  const isFormValid = formValidator(data.elements);

  if (!isFormValid[0]) {
    for (let field in isFormValid[1]) {
      if (!isFormValid[1][field]) {
        alert(`O campo ${field} é inválido.`);
        throw new Error(`The ${field} field is invalid.`);
      }
    }
  }

  let flagError = false;

  try {
    const response = await fetch('https://fluoridated-quiet-virgo.glitch.me/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data.elements),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const result = response.json();

    alert(result.message);
  } catch (err) {
    flagError = true;
    alert('Erro ao salvar os dados.');
    console.error(`Error message: ${err.message}`);
  } finally {
    return [data, flagError];
  }
}

const form = document.getElementById('iform');

async function submit() {
  const [data, flagError] = await post(form);

  if (data.name && !flagError)
    alert(`Obrigado sr(a) ${data.name}. Os seus dados foram encaminhados com sucesso!`);
}

function applyCpfMask(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length <= 3) {
    return cpf;
  } else if (cpf.length <= 6) {
    return cpf.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  } else if (cpf.length <= 9) {
    return cpf.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else {
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  }
}

function applyPhoneMask(phone) {
  phone = phone.replace(/\D/g, '');
  if (phone.length <= 2) {
    return `(${phone}`;
  } else if (phone.length <= 6) {
    return `(${phone.slice(0, 2)}) ${phone.slice(2)}`;
  } else {
    return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7, 11)}`;
  }
}

document
  .getElementById('icpf')
  .addEventListener(
    'input',
    (e) => (e.target.value = applyCpfMask(e.target.value))
  );

document
  .getElementById('iphone-number')
  .addEventListener(
    'input',
    (e) => (e.target.value = applyPhoneMask(e.target.value))
  );

form.addEventListener('submit', (event) => {
  event.preventDefault();
  submit();
});

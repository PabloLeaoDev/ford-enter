class Contact {
    #elements;
  
    constructor(name, email, cpf, phoneNumber, message) {
      this.#elements = { name, email, cpf, phoneNumber, message };
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
      combAlpha = alphabet.concat(accentedLetters).concat(' '),
      getChars = text
        .split('')
        .map((char) => char.toUpperCase())
        .map((char) => (combAlpha.includes(char) ? char : ''));
  
    return !getChars.includes('');
  }
  
  function nameValidator(name) {
    return alphabetValidator(name);
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
    const validsBrDDDs = [
      11, 12, 13, 14, 15, 16, 17, 18, 19, // SP
      21, 22, 24,                         // RJ
      27, 28,                            // ES
      31, 32, 33, 34, 35, 37, 38,        // MG
      41, 42, 43, 44, 45, 46,            // PR
      47, 48, 49,                        // SC
      51, 53, 54, 55,                    // RS
      61,                                // DF
      62, 64,                            // GO
      63,                                // TO
      65, 66,                            // MT
      67,                                // MS
      68,                                // AC
      69,                                // RO
      71, 73, 74, 75, 77,                // BA
      79,                                // SE
      81, 87,                            // PE
      82,                                // AL
      83,                                // PB
      84,                                // RN
      85, 88,                            // CE
      86, 89,                            // PI
      91, 93, 94,                        // PA
      92, 97,                            // AM
      95,                                // RR
      96,                                // AP
      98, 99                             // MA
    ];    

    const cleanPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
  
    if (isNaN(Number(cleanPhoneNumber))) return;

    const cleanPhoneNumberArr = cleanPhoneNumber.split('');
  
    return cleanPhoneNumberArr.length === 11 && cleanPhoneNumberArr[2] == 9 && validsBrDDDs.includes(Number(`${cleanPhoneNumberArr[0]}${cleanPhoneNumberArr[1]}`));
  }
  
  function formValidator(formFields) {
    const isNameFieldValid = nameValidator(formFields.name),
      isEmailFieldValid = formFields.email.split('').includes('.'),
      isCpfFieldValid = cpfValidator(formFields.cpf),
      isPhoneNumberFieldValid = phoneNumberValidator(formFields.phoneNumber);
  
    const areFieldsValid =
      isNameFieldValid &&
      isEmailFieldValid &&
      isCpfFieldValid &&
      isPhoneNumberFieldValid;
  
    return [areFieldsValid, {
      nome: isNameFieldValid,
      email: isEmailFieldValid,
      cpf: isCpfFieldValid,
      telefone: isPhoneNumberFieldValid
    }];
  }
  
  async function post(form) {
    const data = new Contact(
      form.elements.namedItem('name').value.trim(),
      form.elements.namedItem('email').value.trim(),
      form.elements.namedItem('cpf').value,
      form.elements.namedItem('phone-number').value,
      form.elements.namedItem('message').value
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
      const response = await fetch(`http://localhost:3001/save`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data.elements),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro HTTP: ${response.status}`)
      }
  
      const result = await response.json();
  
      alert(result.message || 'Dados enviados com sucesso!');
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
    if (phone.length === 0) {
      return phone;
    } else if (phone.length > 0 && phone.length <= 2) {
      return `(${phone}`;
    } else if (phone.length <= 7) {
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

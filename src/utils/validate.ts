type resultValid = {message: string,
  isValid: boolean}
const mapNameInput: {[key: string]: string} = {
  oldPassword: 'password',
  newPassword: 'password',
  repeatPassword: 'password',
  first_name: 'name',
  second_name: 'name',
  display_name: 'name'
};
export const listForValidate:
{[key: string]:
  {validChar?: RegExp, length?: {min?: number, max?: number}, isRequired?: boolean}
} = {
  login: {
    validChar: /^\d*[a-zA-Z_-][\w-]*$/,
    length: {
      min: 3,
      max: 20
    }
  },
  password: {
    length: {
      min: 8,
      max: 40
    },
    validChar: /^(?=.*[A-Z])(?=.*\d).*$/
  },
  name: {
    validChar: /^[A-ZА-ЯЁ]{1}[a-zA-ZА-Яа-яёЁ-]+$/
  },

  phone: {
    length: {
      min: 10,
      max: 15
    },
    validChar: /^[+]?\d+$/
  },
  message: {
    isRequired: true
  },
  email: {
    validChar: /^[\w-$!%*#?&]+@[a-zA-z]+\.[a-zA-z]+$/
  }
};

export const validate = function (type: string, value: string): resultValid {
  let result:
  resultValid = {
    message: '',
    isValid: true
  };

  let rulesValid = listForValidate[mapNameInput[type]] || listForValidate[type];

  if (!rulesValid) {
    return result;
  }
  if (rulesValid.validChar) {
    let resultvalidChar;
    resultvalidChar = rulesValid.validChar.test(value);

    if (!resultvalidChar) {
      result.message += 'Недопустимые символы; ';
    }
    result.isValid = result.isValid && resultvalidChar;
  }
  if (rulesValid.length) {
    let resultLength = true;
    if (rulesValid.length.min) {
      resultLength = value.length >= rulesValid.length.min;
    }
    if (rulesValid.length.max) {
      resultLength = value.length <= rulesValid.length.max;
    }
    if (!resultLength) {
      result.message += `Длина не соответствует: от ${rulesValid.length.min} до  ${rulesValid.length.max}; `;
    }
    result.isValid = result.isValid && resultLength;
  }
  if (rulesValid.isRequired) {
    result.isValid = result.isValid && !!value.length;
  }

  return result;
};
const isValidInput = function (e:Event | null, el: HTMLInputElement) {
  const validResult: resultValid = validate(el.name, el.value);

  return validResult;
};

const toggleErrorOnInput = function (el: HTMLElement, isValid: boolean) {
  if (!isValid) {
    if (!el.classList.contains('error')) {
      el.classList.add('error');
    }
  } else if (el.classList.contains('error')) {
    el.classList.remove('error');
  }
};

export const validateInput = function (e:Event | null, el: HTMLInputElement) {
  const _el = !el && e ? e.target : el;
  if (_el && _el.tagName === 'INPUT') {
    let validResult = isValidInput(e, _el as HTMLInputElement);

    toggleErrorOnInput(_el as HTMLInputElement, (validResult?.isValid));
  }
};

export const validateForm = function (e: Event, callback: Function) {
  e.preventDefault();

  let values: {[key: string]: string}[] = [];
  let isFormValid: boolean = true;
  Array.from(e.target).forEach((el: HTMLInputElement) => {
    if (el.tagName === 'INPUT') {
      values.push({ [el.name]: el.value });
      let validResult = isValidInput(e, el);
      isFormValid = isFormValid && !!validResult?.isValid;

      toggleErrorOnInput(el, (validResult?.isValid));
    }
  });

  if (isFormValid && typeof callback === 'function') {
    callback();
  }
};

import { Input } from '../../components/input/input';
import {
  IBlock
} from '../../core/block/typeBlock';
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
  {validChar?: RegExp, length?: {min?: number, max?: number}, isRequired?: boolean,
  messageError?: string}
} = {
  login: {
    validChar: /^\d*[a-zA-Z_-][\w-]*$/,
    length: {
      min: 3,
      max: 20
    },
    messageError: 'Только латиница. может содержать знак "-". Начинается с буквы.'
  },
  password: {
    length: {
      min: 8,
      max: 40
    },
    validChar: /^(?=.*[A-Z])(?=.*\d).*$/,
    messageError: 'не только цифры, без пробелов, без спецсимволов (допустимы дефис и нижнее подчёркивание)'

  },
  name: {
    validChar: /^[A-ZА-ЯЁ]{1}[a-zA-ZА-Яа-яёЁ-]+$/,
    messageError: 'Введите корректное ФИО'
  },

  phone: {
    length: {
      min: 10,
      max: 15
    },
    validChar: /^[+]?\d+$/,
    messageError: 'Введён несуществующий номер телефона'
  },
  message: {
    isRequired: true
  },
  email: {
    validChar: /^[\w-$!%*#?&]+@[a-zA-z]+\.[a-zA-z]+$/,
    messageError: 'неверный формат почты'
  },
  title: {
    validChar: /^[\wА-Яа-яёЁ]+$/,
    messageError: 'Только буквы'
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
      result.message += (rulesValid.messageError || 'Недопустимые символы');
    }
    result.isValid = result.isValid && resultvalidChar;
  }
  if (rulesValid.length) {
    let isValidLength = true;
    if (rulesValid.length.min) {
      isValidLength = isValidLength && value.length >= rulesValid.length.min;
    }
    if (rulesValid.length.max) {
      isValidLength = isValidLength && value.length <= rulesValid.length.max;
    }

    if (!isValidLength) {
      result.message += `Длина от ${rulesValid.length.min} до  ${rulesValid.length.max} символов; `;
    }
    result.isValid = result.isValid && isValidLength;
  }
  if (rulesValid.isRequired) {
    result.isValid = result.isValid && !!value.length;
    result.message += 'Поле должно быть заполнено';
  }

  return result;
};

export const validateInput = function v(element: IBlock) {
  const resultValidate = validate(element.props.name, element.props.value);
  if (resultValidate.isValid && element.props.isError) {
    element.setProps({
      isError: false,
      messageError: ' '

    });
  } else if (!resultValidate.isValid && !element.props.isError) {
    element.setProps({
      isError: true,
      messageError: resultValidate.message
    });
  }
  return resultValidate.isValid;
};

// eslint-disable-next-line consistent-return
export const validateAndSend = async function v<T, K extends keyof T>(
  block: IBlock,
  target: T,
  nameCallback: K
) {
  if (block.children) {
    let isValidForm = true;
    const values: {[key: string]: any} = {};
    Object.values(block.children).forEach(element => {
      if (element instanceof Input) {
        isValidForm = validateInput(element) && isValidForm;
        values[element.props.name] = element.props.value;
      }
    });

    if (isValidForm) {
      const f = target[nameCallback];
      if (typeof f !== 'function') {
        return false;
      }
      let result = await f.call(target, values);

      if (result === undefined || result) {
        Object.values(block.children).forEach(element => {
          if (element instanceof Input) {
            element.setProps({ value: '' });
          }
        });
        return true;
      }
      return result;
    }
    return false;
  }
};

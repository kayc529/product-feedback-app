import { MIN_PASSWORD_LENGTH } from '../data/constants';

export const validateEmail = (email) => {
  return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
    email
  );
};

export const containsUppercaseAlphabet = (str) => {
  return /[A-Z]/.test(str);
};

export const containsNumber = (str) => {
  return /[0-9]/.test(str);
};

export const containsSpecialCharacter = (str) => {
  return /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(str);
};

export const hasPasswordMinimumLength = (str) => {
  return str.length >= MIN_PASSWORD_LENGTH;
};

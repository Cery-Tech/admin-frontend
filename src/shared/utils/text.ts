export const capitalizeWord = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const capitalizeAll = (str: string) => {
  return str
    .split(' ')
    .map((word) => capitalizeWord(word))
    .join(' ');
};

const firstLettersRegExp = /\b[a-zA-Zа-яА-ЯёЁ]/;

export const getFirstLetters = (str: string) => str.match(firstLettersRegExp)?.join('');

export const getShortUuid = (uuid: string) => uuid.split('-').shift() ?? '';

export const underscoreToName = (str = '') => capitalizeAll(str.split('_').join(' '));

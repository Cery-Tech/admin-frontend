const clearNotNumber = /^(?!-)[^\d.]/g;

export const convertToNumber = function (
  amount: string | number,
  fractionDigits?: number,
  roundMoreThan?: number
) {
  let clearedAmountValue = Number(String(amount).replace(clearNotNumber, ''));

  if (typeof fractionDigits === 'number' && !fractionDigits) {
    clearedAmountValue =
      !roundMoreThan || clearedAmountValue > roundMoreThan
        ? Math.round(clearedAmountValue)
        : clearedAmountValue;
  }
  if (typeof fractionDigits === 'number' && fractionDigits) {
    clearedAmountValue = Number(clearedAmountValue.toFixed(fractionDigits));
  }

  return clearedAmountValue;
};

const thousands = /\B(?=(\d{3})+(?!\d))/g;

export const separateThousands = (number: number, separator = ',') => {
  const [integerPart, decimalPart] = String(number).split('.');

  const formattedInteger =
    integerPart.length > 3 ? integerPart.replace(thousands, separator) : integerPart;

  return decimalPart ? `${formattedInteger}.${decimalPart}` : formattedInteger;
};

export type FormatToCurrencyConfig = {
  currency?: string;
  fractionDigits?: number;
  thousandsSeparator?: string;
  roundMoreThan?: number;
  maxFractionDigits?: number;
  minFractionDigits?: number;
};

export const formatToCurrency = (amount: number | string, config?: FormatToCurrencyConfig) => {
  const value = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: config?.currency ?? 'USD',
    minimumFractionDigits: config?.minFractionDigits ?? 0,
    maximumFractionDigits: config?.maxFractionDigits ?? 2,
    currencyDisplay: 'symbol',
  }).format(convertToNumber(amount, config?.fractionDigits, config?.roundMoreThan));

  return config?.thousandsSeparator ? value.replace(',', config.thousandsSeparator) : value;
};

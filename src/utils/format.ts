import { BILLION, MILLION, TRILLION } from "./constants";

const formatUsdPrice = (num: number, digits = 4) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: digits,
  }).format(num);
};

const formatNumber = (num: number, digits = 4) => {
  return new Intl.NumberFormat('en-US', {
    maximumFractionDigits: digits,
  }).format(num);
};

const formatCapitalizatonToText = (marketCap: number) => {
  if (marketCap > TRILLION) {
    return `$${formatNumber(marketCap / TRILLION, 2)}T`
  } else if (marketCap > BILLION) {
    return `$${formatNumber(marketCap / BILLION, 2)}B`
  } else {
    return `$${formatNumber(marketCap / MILLION, 2)}M`
  }
}

export { formatNumber, formatUsdPrice, formatCapitalizatonToText }
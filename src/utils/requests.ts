import { DefiMarketData, MarketData } from "./types";

export const getMarketData: () => Promise<MarketData> = async () => {
  const URL = `https://api.coingecko.com/api/v3/global`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('Fetching Error');
  }
  const parsedResponse = await response.json();
  return parsedResponse.data;
};

export const getDefiMarketData: () => Promise<DefiMarketData> = async () => {
  const URL = `https://api.coingecko.com/api/v3/global/decentralized_finance_defi`;
  const response = await fetch(URL);
  if (!response.ok) {
    throw new Error('Fetching Error');
  }
  const parsedResponse = await response.json();
  return parsedResponse.data;
};
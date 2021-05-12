import { TrendType } from "./enums"

export type Price = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  total_volume: number;
  market_cap: number;
  market_cap_rank: number;
  circulating_supply: number;
  total_supply: number;
};

export type MarketData = {
  active_cryptocurrencies: number;
  ended_icos: number;
  market_cap_change_percentage_24h_usd: number;
  market_cap_percentage: Record<string, number>;
  markets: number;
  ongoing_icos: number;
  total_market_cap: Record<string, number>;
  total_volume: Record<string, number>;
  upcoming_icos: number;
  updated_at: number;
};
export type DefiMarketData = {
  defi_dominance: string;
  defi_market_cap: string;
  defi_to_eth_ratio: string;
  eth_market_cap: string;
  top_coin_defi_dominance: number;
  top_coin_name: string;
  trading_volume_24h: string;
};

export type Trend = {
  color: string;
  trendType: TrendType;
  isTrending: boolean;
  change: number;
};

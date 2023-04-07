export type Coin = {
  id: string;
  symbol: string;
  name: string;
  image: {large: string; small: string; thumb: string};
  description: {en: string; pl?: string; es?: string};
  market_cap_rank: number;
  market_data: {current_price: {[key: string]: number}; market_cap: {[key: string]: number}};
};

export type CoinDigest = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  price_change_percentage_24h: number;
};

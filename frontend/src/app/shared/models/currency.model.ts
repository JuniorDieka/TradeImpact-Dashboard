export interface Currency {
  code: string;
  name: string;
  symbol: string;
  country: string;
  exchangeRateToUSD: number; // How many units of this currency = 1 USD
  pppFactor: number; // PPP conversion factor (relative to USD)
}

export const CURRENCIES: Record<string, Currency> = {
  'Rwanda': {
    code: 'RWF',
    name: 'Rwandan Franc',
    symbol: 'FRw',
    country: 'Rwanda',
    exchangeRateToUSD: 1300, // Approximate: 1 USD = 1,300 RWF
    pppFactor: 450 // PPP-adjusted rate
  },
  'Kenya': {
    code: 'KES',
    name: 'Kenyan Shilling',
    symbol: 'KSh',
    country: 'Kenya',
    exchangeRateToUSD: 130, // Approximate: 1 USD = 130 KES
    pppFactor: 55 // PPP-adjusted rate
  },
  'Ethiopia': {
    code: 'ETB',
    name: 'Ethiopian Birr',
    symbol: 'Br',
    country: 'Ethiopia',
    exchangeRateToUSD: 120, // Approximate: 1 USD = 120 ETB
    pppFactor: 30 // PPP-adjusted rate
  }
};

export enum CurrencyDisplayMode {
  LOCAL = 'local',
  USD = 'usd',
  PPP = 'ppp'
}

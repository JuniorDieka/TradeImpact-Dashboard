import { Injectable } from '@angular/core';
import { Currency, CURRENCIES, CurrencyDisplayMode } from '../../shared/models/currency.model';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor() {}

  getCurrencyByCountry(country: string): Currency | undefined {
    return CURRENCIES[country];
  }

  convertFromUSD(amountInUSD: number, targetCountry: string, mode: CurrencyDisplayMode = CurrencyDisplayMode.LOCAL): number {
    const currency = this.getCurrencyByCountry(targetCountry);
    
    if (!currency) {
      return amountInUSD;
    }

    switch (mode) {
      case CurrencyDisplayMode.LOCAL:
        // Convert using market exchange rate
        return amountInUSD * currency.exchangeRateToUSD;
      
      case CurrencyDisplayMode.PPP:
        // Convert using PPP factor for purchasing power comparison
        return amountInUSD * currency.pppFactor;
      
      case CurrencyDisplayMode.USD:
      default:
        return amountInUSD;
    }
  }

  formatCurrency(amount: number, country: string, mode: CurrencyDisplayMode = CurrencyDisplayMode.LOCAL): string {
    const currency = this.getCurrencyByCountry(country);
    
    if (!currency) {
      return `$${amount.toFixed(2)}`;
    }

    const convertedAmount = this.convertFromUSD(amount, country, mode);
    
    switch (mode) {
      case CurrencyDisplayMode.LOCAL:
        return `${currency.symbol}${this.formatNumber(convertedAmount)}`;
      
      case CurrencyDisplayMode.PPP:
        return `${currency.symbol}${this.formatNumber(convertedAmount)} (PPP)`;
      
      case CurrencyDisplayMode.USD:
      default:
        return `$${this.formatNumber(amount)}`;
    }
  }

  private formatNumber(value: number): string {
    const absValue = Math.abs(value);
    
    if (absValue >= 1_000_000_000_000) {
      return (value / 1_000_000_000_000).toFixed(2) + 'T';
    } else if (absValue >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + 'B';
    } else if (absValue >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + 'M';
    } else if (absValue >= 1_000) {
      return (value / 1_000).toFixed(2) + 'K';
    } else {
      return value.toFixed(2);
    }
  }

  getCurrencyInfo(country: string): string {
    const currency = this.getCurrencyByCountry(country);
    return currency ? `${currency.name} (${currency.code})` : 'USD';
  }
}

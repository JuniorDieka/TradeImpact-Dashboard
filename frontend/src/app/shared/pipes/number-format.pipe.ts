import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormat'
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number | null | undefined, decimals: number = 2): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }

    const absValue = Math.abs(value);
    
    if (absValue >= 1_000_000_000_000) {
      // Trillion
      return (value / 1_000_000_000_000).toFixed(decimals) + 'T';
    } else if (absValue >= 1_000_000_000) {
      // Billion
      return (value / 1_000_000_000).toFixed(decimals) + 'B';
    } else if (absValue >= 1_000_000) {
      // Million
      return (value / 1_000_000).toFixed(decimals) + 'M';
    } else if (absValue >= 1_000) {
      // Thousand
      return (value / 1_000).toFixed(decimals) + 'K';
    } else {
      return value.toFixed(decimals);
    }
  }
}

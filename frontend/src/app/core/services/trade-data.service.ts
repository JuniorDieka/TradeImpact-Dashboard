import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { TradeData } from '../../shared/models/trade-data.model';

@Injectable({
  providedIn: 'root'
})
export class TradeDataService {
  private readonly endpoint = 'country-trade';

  constructor(private api: ApiService) {}

  getAllTradeData(filters?: any): Observable<TradeData[]> {
    return this.api.get<TradeData[]>(this.endpoint, filters);
  }

  getTradeDataByCountry(memberState: string): Observable<TradeData[]> {
    return this.api.get<TradeData[]>(`${this.endpoint}/country/${memberState}`);
  }

  getTradeTrends(memberState: string): Observable<any> {
    return this.api.get<any>(`${this.endpoint}/trends/${memberState}`);
  }

  getTopPartners(memberState: string): Observable<any> {
    return this.api.get<any>(`${this.endpoint}/top-partners/${memberState}`);
  }

  getSectorBreakdown(memberState: string): Observable<any> {
    return this.api.get<any>(`${this.endpoint}/sector-breakdown/${memberState}`);
  }
}

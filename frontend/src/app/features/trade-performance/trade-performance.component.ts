import { Component, OnInit } from '@angular/core';
import { TradeDataService } from '../../core/services/trade-data.service';
import { CurrencyService } from '../../core/services/currency.service';
import { TradeData } from '../../shared/models/trade-data.model';
import { CurrencyDisplayMode } from '../../shared/models/currency.model';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-trade-performance',
  templateUrl: './trade-performance.component.html',
  styleUrls: ['./trade-performance.component.scss']
})
export class TradePerformanceComponent implements OnInit {
  loading = true;
  selectedCountry = 'Rwanda';
  countries = ['Rwanda', 'Kenya', 'Ethiopia'];
  tradeData: TradeData | null = null;
  
  displayMode: CurrencyDisplayMode = CurrencyDisplayMode.LOCAL;
  CurrencyDisplayMode = CurrencyDisplayMode;
  currencyInfo = '';

  // Line chart for trade trends
  public tradeTrendsData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Exports (Million USD)',
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.1)',
        fill: true,
        tension: 0.4
      },
      {
        data: [],
        label: 'Imports (Million USD)',
        borderColor: '#2196F3',
        backgroundColor: 'rgba(33, 150, 243, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  };

  public tradeTrendsOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
      title: {
        display: true,
        text: 'Export & Import Trends (2019-2024)'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.dataset.label || '';
            const valueInUSD = context.parsed.y ?? 0;
            const formattedValue = this.currencyService.formatCurrency(valueInUSD, this.selectedCountry, this.displayMode);
            return `${label}: ${formattedValue}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            const converted = this.currencyService.convertFromUSD(Number(value), this.selectedCountry, this.displayMode);
            return this.getCurrencyPrefix() + this.formatNumber(converted);
          }
        }
      }
    }
  };

  // Bar chart for sector breakdown
  public sectorData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Export Value (Million USD)',
        backgroundColor: '#4CAF50',
        borderColor: '#388E3C',
        borderWidth: 1
      }
    ]
  };

  public sectorOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Top Export Sectors'
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const valueInUSD = context.parsed.y ?? 0;
            const formattedValue = this.currencyService.formatCurrency(valueInUSD, this.selectedCountry, this.displayMode);
            return `Export Value: ${formattedValue}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => {
            const converted = this.currencyService.convertFromUSD(Number(value), this.selectedCountry, this.displayMode);
            return this.getCurrencyPrefix() + this.formatNumber(converted);
          }
        }
      }
    }
  };

  // Doughnut chart for trade partners
  public partnersData: ChartConfiguration<'doughnut'>['data'] = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
          '#FF9F40'
        ],
        borderWidth: 2
      }
    ]
  };

  public partnersOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'right'
      },
      title: {
        display: true,
        text: 'Top Trading Partners'
      }
    }
  };

  constructor(
    private tradeDataService: TradeDataService,
    private currencyService: CurrencyService
  ) {}

  ngOnInit(): void {
    this.updateCurrencyInfo();
    this.loadTradeData();
  }

  onCountryChange(): void {
    this.updateCurrencyInfo();
    this.loadTradeData();
  }

  onDisplayModeChange(): void {
    // Refresh chart labels when display mode changes
    this.loadTrendChart();
    this.loadSectorChart();
  }

  updateCurrencyInfo(): void {
    this.currencyInfo = this.currencyService.getCurrencyInfo(this.selectedCountry);
  }

  loadTradeData(): void {
    this.loading = true;
    this.tradeDataService.getTradeDataByCountry(this.selectedCountry).subscribe({
      next: (data: any) => {
        // Backend returns an array, get the most recent entry
        if (Array.isArray(data) && data.length > 0) {
          this.tradeData = data[0]; // Already sorted by year and quarter desc
          
          // Map backend structure to frontend expectations
          this.mapBackendDataToFrontend();
          
          this.loadTrendChart();
          this.loadSectorChart();
          this.loadPartnersChart();
        } else {
          this.tradeData = null;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading trade data:', error);
        this.tradeData = null;
        this.loading = false;
      }
    });
  }

  mapBackendDataToFrontend(): void {
    if (!this.tradeData) return;

    // Map topExportSectors to sectorBreakdown
    if ((this.tradeData as any).topExportSectors) {
      this.tradeData.sectorBreakdown = (this.tradeData as any).topExportSectors.map((sector: any) => ({
        sector: sector.sector,
        exportValue: sector.value,
        importValue: 0,
        percentageOfTotal: sector.percentageOfTotal
      }));
    }

    // Map topExportDestinations to topPartners
    if ((this.tradeData as any).topExportDestinations) {
      this.tradeData.topPartners = (this.tradeData as any).topExportDestinations.map((country: string, index: number) => ({
        country: country,
        tradeVolume: 100 - (index * 15), // Simulated values
        percentageOfTotal: 15 - (index * 2)
      }));
    }
  }

  loadTrendChart(): void {
    if (!this.tradeData) return;

    // Generate years 2019-2024
    const years = ['2019', '2020', '2021', '2022', '2023', '2024'];
    this.tradeTrendsData.labels = years;

    // Simulate trend data based on current values
    const baseExport = this.tradeData.totalExports || 1000;
    const baseImport = this.tradeData.totalImports || 1500;
    
    this.tradeTrendsData.datasets[0].data = [
      baseExport * 0.7,
      baseExport * 0.75,
      baseExport * 0.85,
      baseExport * 0.9,
      baseExport * 0.95,
      baseExport
    ];

    this.tradeTrendsData.datasets[1].data = [
      baseImport * 0.8,
      baseImport * 0.82,
      baseImport * 0.88,
      baseImport * 0.92,
      baseImport * 0.96,
      baseImport
    ];
  }

  loadSectorChart(): void {
    if (!this.tradeData?.sectorBreakdown) return;

    const topSectors = this.tradeData.sectorBreakdown.slice(0, 6);
    this.sectorData.labels = topSectors.map(s => s.sector);
    this.sectorData.datasets[0].data = topSectors.map(s => s.exportValue);
  }

  loadPartnersChart(): void {
    if (!this.tradeData?.topPartners) return;

    this.partnersData.labels = this.tradeData.topPartners.map(p => p.country);
    this.partnersData.datasets[0].data = this.tradeData.topPartners.map(p => p.tradeVolume);
  }

  get tradeBalance(): number {
    if (!this.tradeData) return 0;
    return this.tradeData.totalExports - this.tradeData.totalImports;
  }

  get tradeBalanceClass(): string {
    return this.tradeBalance >= 0 ? 'positive' : 'negative';
  }

  formatNumber(value: number, decimals: number = 2): string {
    if (value === null || value === undefined || isNaN(value)) {
      return '0';
    }

    const absValue = Math.abs(value);
    
    if (absValue >= 1_000_000_000_000) {
      return (value / 1_000_000_000_000).toFixed(decimals) + 'T';
    } else if (absValue >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(decimals) + 'B';
    } else if (absValue >= 1_000_000) {
      return (value / 1_000_000).toFixed(decimals) + 'M';
    } else if (absValue >= 1_000) {
      return (value / 1_000).toFixed(decimals) + 'K';
    } else {
      return value.toFixed(decimals);
    }
  }

  formatCurrencyValue(valueInUSD: number): string {
    return this.currencyService.formatCurrency(valueInUSD, this.selectedCountry, this.displayMode);
  }

  getCurrencyPrefix(): string {
    if (this.displayMode === CurrencyDisplayMode.USD) {
      return '$';
    }
    const currency = this.currencyService.getCurrencyByCountry(this.selectedCountry);
    return currency?.symbol || '$';
  }
}

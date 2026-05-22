import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Standard, HotspotCategory } from '../../../shared/models/standard.model';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface FilterParams {
  sector?: string;
  country?: string;
  hotspotCategory?: HotspotCategory;
  search?: string;
}

@Component({
  selector: 'app-standards-list',
  templateUrl: './standards-list.component.html',
  styleUrls: ['./standards-list.component.scss']
})
export class StandardsListComponent implements OnInit {
  standards: Standard[] = [];
  loading = true;
  
  // Filter state
  filters: FilterParams = {};
  searchQuery = '';
  private searchSubject = new Subject<string>();
  
  // Available filter options
  sectors: string[] = [];
  countries: string[] = [];
  hotspotCategories = Object.values(HotspotCategory);
  
  // Comparison state
  selectedStandards: Set<string> = new Set();
  comparisonMode = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeSearchDebounce();
    this.loadStandards();
    this.loadFilterOptions();
  }

  private initializeSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.filters.search = searchTerm || undefined;
      this.loadStandards();
    });
  }

  onSearchChange(value: string): void {
    this.searchQuery = value;
    this.searchSubject.next(value);
  }

  onFilterChange(): void {
    this.loadStandards();
  }

  clearFilters(): void {
    this.filters = {};
    this.searchQuery = '';
    this.loadStandards();
  }

  loadStandards(): void {
    this.loading = true;
    const params = this.buildQueryParams();
    
    this.apiService.get<any>('standards', params).subscribe({
      next: (response) => {
        this.standards = response.data || [];
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading standards:', error);
        this.loading = false;
      }
    });
  }

  private buildQueryParams(): Record<string, string> {
    const params: Record<string, string> = {};
    if (this.filters.sector) params['sector'] = this.filters.sector;
    if (this.filters.country) params['country'] = this.filters.country;
    if (this.filters.hotspotCategory) params['hotspotCategory'] = this.filters.hotspotCategory;
    if (this.filters.search) params['search'] = this.filters.search;
    return params;
  }

  private loadFilterOptions(): void {
    this.apiService.get<any>('standards').subscribe({
      next: (response) => {
        const standards: Standard[] = response.data || [];
        this.sectors = [...new Set(standards.map(s => s.sector))].filter(Boolean).sort() as string[];
        this.countries = [...new Set(standards.flatMap(s => s.applicableCountries || []))].filter(Boolean).sort() as string[];
      },
      error: (error) => console.error('Error loading filter options:', error)
    });
  }

  // Comparison functionality
  toggleComparisonMode(): void {
    this.comparisonMode = !this.comparisonMode;
    if (!this.comparisonMode) {
      this.selectedStandards.clear();
    }
  }

  toggleStandardSelection(standardId: string): void {
    if (this.selectedStandards.has(standardId)) {
      this.selectedStandards.delete(standardId);
    } else {
      if (this.selectedStandards.size < 5) {
        this.selectedStandards.add(standardId);
      }
    }
  }

  isStandardSelected(standardId: string): boolean {
    return this.selectedStandards.has(standardId);
  }

  compareSelected(): void {
    if (this.selectedStandards.size >= 2) {
      const ids = Array.from(this.selectedStandards).join(',');
      this.router.navigate(['/standards/compare'], { queryParams: { ids } });
    }
  }

  viewDetails(standardId: string): void {
    this.router.navigate(['/standards', standardId]);
  }
}

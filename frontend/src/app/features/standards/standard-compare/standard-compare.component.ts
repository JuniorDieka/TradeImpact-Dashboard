import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Standard } from '../../../shared/models/standard.model';

@Component({
  selector: 'app-standard-compare',
  templateUrl: './standard-compare.component.html',
  styleUrls: ['./standard-compare.component.scss']
})
export class StandardCompareComponent implements OnInit {
  standards: Standard[] = [];
  loading = true;
  error = false;

  // Comparison attributes
  comparisonAttributes = [
    { key: 'sector', label: 'Sector', icon: 'business' },
    { key: 'isVoluntary', label: 'Type', icon: 'check_circle', formatter: (val: boolean) => val ? 'Voluntary' : 'Mandatory' },
    { key: 'requiresThirdPartyVerification', label: '3rd Party Verification', icon: 'verified', formatter: (val: boolean) => val ? 'Required' : 'Not Required' },
    { key: 'certificationBody', label: 'Certification Body', icon: 'account_balance' },
    { key: 'adoptionRate', label: 'Adoption Rate', icon: 'trending_up', formatter: (val: number) => `${val}%` }
  ];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadStandardsForComparison();
  }

  private loadStandardsForComparison(): void {
    const ids = this.route.snapshot.queryParamMap.get('ids');

    if (!ids) {
      this.error = true;
      this.loading = false;
      return;
    }

    console.log('Loading standards for comparison with IDs:', ids);

    this.apiService.get<any>(`standards/compare`, { ids }).subscribe({
      next: (response) => {
        console.log('Comparison response:', response);
        // Handle both {data: standards} and direct array response
        this.standards = response.data || response || [];
        console.log('Standards loaded for comparison:', this.standards);
        if (this.standards.length < 2) {
          console.error('Not enough standards loaded:', this.standards.length);
          this.error = true;
        }
        this.loading = false;
      },
      error: (error) => {
        console.error('Error loading standards for comparison:', error);
        console.error('Error details:', error.error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/standards']);
  }

  getValue(standard: Standard, key: string): any {
    return (standard as any)[key];
  }

  formatValue(value: any, attribute: any): string {
    if (value === null || value === undefined) {
      return 'N/A';
    }

    if (attribute.formatter) {
      return attribute.formatter(value);
    }

    return String(value);
  }

  getCriteriaForCategory(standard: Standard, category: string): string[] {
    return (standard.criteria as any)?.[category] || [];
  }

  getAllCriteriaCategories(): string[] {
    const categories = new Set<string>();
    this.standards.forEach(standard => {
      if (standard.criteria) {
        Object.keys(standard.criteria).forEach(key => {
          if ((standard.criteria as any)[key]?.length > 0) {
            categories.add(key);
          }
        });
      }
    });
    return Array.from(categories);
  }
}

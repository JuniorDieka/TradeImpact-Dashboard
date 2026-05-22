import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { Standard } from '../../../shared/models/standard.model';

@Component({
  selector: 'app-standard-detail',
  templateUrl: './standard-detail.component.html',
  styleUrls: ['./standard-detail.component.scss']
})
export class StandardDetailComponent implements OnInit {
  standard: Standard | null = null;
  loading = true;
  error = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit(): void {
    this.loadStandardDetails();
  }

  private loadStandardDetails(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.error = true;
      this.loading = false;
      return;
    }

    console.log('Loading standard with ID:', id);

    this.apiService.get<any>(`standards/${id}`).subscribe({
      next: (response) => {
        console.log('Standard detail response:', response);
        // Handle both {data: standard} and direct standard response
        this.standard = response.data || response;
        this.loading = false;
        console.log('Standard loaded:', this.standard);
      },
      error: (error) => {
        console.error('Error loading standard details:', error);
        this.error = true;
        this.loading = false;
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/standards']);
  }

  getCriteriaCount(): number {
    if (!this.standard?.criteria) return 0;

    return Object.values(this.standard.criteria)
      .filter(arr => arr && arr.length > 0)
      .reduce((sum, arr) => sum + arr.length, 0);
  }
}

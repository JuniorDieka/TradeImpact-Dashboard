import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api.service';
import { Standard } from '../../../shared/models/standard.model';

@Component({
  selector: 'app-standards-list',
  templateUrl: './standards-list.component.html',
  styleUrls: ['./standards-list.component.scss']
})
export class StandardsListComponent implements OnInit {
  standards: Standard[] = [];
  loading = true;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.loadStandards();
  }

  loadStandards(): void {
    this.apiService.get<any>('standards').subscribe({
      next: (response) => {
        this.standards = response.data || [];
        this.loading = false;
      },
      error: () => {
        this.loading = false;
      }
    });
  }
}

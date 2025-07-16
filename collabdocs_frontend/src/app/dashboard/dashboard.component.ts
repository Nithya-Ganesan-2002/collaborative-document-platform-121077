import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService, DocumentData } from '../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
// PUBLIC_INTERFACE
export class DashboardComponent implements OnInit {
  docs: DocumentData[] = [];
  loading = false;

  constructor(
    private api: ApiService,
    private router: Router
  ){}

  ngOnInit() {
    this.loading = true;
    this.api.listDocs().subscribe({
      next: d => { this.docs = d; this.loading = false; },
      error: () => { this.loading = false; }
    });
  }

  goTo(doc: DocumentData) {
    this.router.navigate(['/editor', doc.id]);
  }
}

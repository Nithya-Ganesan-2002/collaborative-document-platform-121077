import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService, DocumentData } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ShareDialogComponent } from './share-dialog.component';
import { QuillModule } from 'ngx-quill';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, ShareDialogComponent, QuillModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
// PUBLIC_INTERFACE
export class EditorComponent implements OnInit {
  docId: string | null = null;
  title = '';
  content = '';
  isNew = false;
  sharedWith: string[] = [];
  showShare = false;
  loading = false;
  private ws?: WebSocket;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Document ID could be 'new' for creation
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.docId = id;
      this.isNew = (id === 'new' || !id);
      if (!this.isNew && this.docId) {
        this.loading = true;
        this.api.getDoc(this.docId).subscribe({
          next: doc => {
            this.title = doc.title;
            this.content = doc.content;
            this.sharedWith = doc.permissions || [];
            this.loading = false;
            this.initRealtime();
          },
          error: () => this.loading = false,
        });
      }
      if (this.isNew) {
        this.title = '';
        this.content = '';
        this.sharedWith = [];
      }
    });
  }

  // PUBLIC_INTERFACE
  saveDoc(): void {
    if (!this.title) {
      window.alert('Title required!');
      return;
    }
    if (this.isNew) {
      this.api.createDoc({
        title: this.title,
        content: this.content,
        permissions: this.sharedWith,
      }).subscribe({
        next: doc => {
          window.alert('Document created.');
          this.router.navigate(['/editor', doc.id]);
        },
        error: () => window.alert('Failed to create document'),
      });
    } else if (this.docId) {
      this.api.updateDoc(this.docId, {
        title: this.title,
        content: this.content,
        permissions: this.sharedWith,
      }).subscribe({
        next: _ => window.alert('Document updated.'),
        error: () => window.alert('Failed to update document'),
      });
    }
  }

  // PUBLIC_INTERFACE
  deleteDoc(): void {
    if (this.docId && !this.isNew) {
      if (window.confirm('Are you sure you want to delete this document?')) {
        this.api.deleteDoc(this.docId).subscribe({
          next: () => {
            window.alert('Document deleted.');
            this.router.navigate(['/dashboard']);
          },
          error: () => window.alert('Failed to delete document'),
        });
      }
    }
  }

  // PUBLIC_INTERFACE
  openShareDialog(): void {
    this.showShare = true;
  }

  // PUBLIC_INTERFACE
  onShareClosed() {
    this.showShare = false;
  }

  // PUBLIC_INTERFACE
  onSharedWithChange(sharedWith: string[]) {
    this.sharedWith = sharedWith;
  }

  // PUBLIC_INTERFACE
  // SCHEMA: This initializes and listens for realtime doc updates (stubbed for now)
  initRealtime() {
    if (!this.docId) return;
    if (this.ws) {
      this.ws.close();
    }
    try {
      this.ws = this.api.getRealtimeSocket();
      this.ws.onopen = _ => {
        // Send a message to join this doc if needed.
        this.ws?.send(JSON.stringify({
          action: 'join',
          docId: this.docId
        }));
      };
      this.ws.onmessage = msg => {
        let data: any;
        try { data = JSON.parse(msg.data); } catch { data = msg.data; }
        // Implement handling of remote changes if wiring Supabase/WS
        // For now, just log
        if (data && data.docUpdate) {
          // Apply remote update (for demo: alert)
          // In real app, merge update into this.title/content as needed
          // window.alert('Remote update: ' + JSON.stringify(data));
        }
      };
    } catch {}
  }
}

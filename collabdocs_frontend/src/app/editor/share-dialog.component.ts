import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-share-dialog',
  standalone: true,
  imports: [],
  template: `
    <div class="share-modal-backdrop" (click)="close()"></div>
    <div class="share-modal">
      <h3>Share Document</h3>
      <div>
        <label>Add by email:</label>
        <input [(ngModel)]="shareEmail" placeholder="User email" />
        <button (click)="addShare()">Add</button>
      </div>
      <ul>
        <li *ngFor="let user of sharedWith">
          {{ user }}
          <button (click)="removeShare(user)">Remove</button>
        </li>
      </ul>
      <button (click)="close()">Close</button>
    </div>
  `,
  styleUrl: './share-dialog.component.css'
})
// PUBLIC_INTERFACE
export class ShareDialogComponent {
  @Input() sharedWith: string[] = [];
  @Output() sharedWithChange = new EventEmitter<string[]>();
  @Output() closed = new EventEmitter<void>();
  shareEmail: string = '';

  addShare() {
    if (this.shareEmail && !this.sharedWith.includes(this.shareEmail)) {
      this.sharedWith.push(this.shareEmail);
      this.sharedWithChange.emit(this.sharedWith);
      this.shareEmail = '';
    }
  }

  removeShare(email: string) {
    this.sharedWith = this.sharedWith.filter(e => e !== email);
    this.sharedWithChange.emit(this.sharedWith);
  }

  close() {
    this.closed.emit();
  }
}

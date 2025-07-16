import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
// PUBLIC_INTERFACE
export class EditorComponent {
  docId: string | null = null;
  title = '';
  content = '';

  // PUBLIC_INTERFACE
  saveDoc(): void {
    // TODO: Save document via ApiService
    window.alert('Document saved (mock)');
  }

  // PUBLIC_INTERFACE
  deleteDoc(): void {
    // TODO: Call delete document via ApiService
    window.alert('Document deleted (mock)');
  }
}

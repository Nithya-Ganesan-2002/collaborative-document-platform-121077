import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

// Document types
export interface DocumentData {
  id: string;
  title: string;
  content: string;
  owner: string;
  permissions?: string[]; // list of emails or ids with shared access
}

@Injectable({
  providedIn: 'root',
})
// PUBLIC_INTERFACE
export class ApiService {
  private baseUrl = '/api'; // relative API path
  private docsSubject = new BehaviorSubject<DocumentData[]>([]);
  docs$ = this.docsSubject.asObservable();

  constructor(private http: HttpClient) {}

  // PUBLIC_INTERFACE
  listDocs(): Observable<DocumentData[]> {
    return this.http.get<DocumentData[]>(`${this.baseUrl}/docs`);
  }

  // PUBLIC_INTERFACE
  getDoc(id: string): Observable<DocumentData> {
    return this.http.get<DocumentData>(`${this.baseUrl}/docs/${id}`);
  }

  // PUBLIC_INTERFACE
  createDoc(doc: Partial<DocumentData>): Observable<DocumentData> {
    return this.http.post<DocumentData>(`${this.baseUrl}/docs`, doc);
  }

  // PUBLIC_INTERFACE
  updateDoc(id: string, doc: Partial<DocumentData>): Observable<DocumentData> {
    return this.http.put<DocumentData>(`${this.baseUrl}/docs/${id}`, doc);
  }

  // PUBLIC_INTERFACE
  deleteDoc(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/docs/${id}`);
  }

  // For WebSocket/realtime, no JWT required for now (stub)
  // PUBLIC_INTERFACE
  getRealtimeSocket(): WebSocket {
    // Ideally, use a service like Supabase Realtime or socket.io; here is a stub
    return new WebSocket(`ws://${window.location.host}/api/collaboration/realtime`);
  }
}

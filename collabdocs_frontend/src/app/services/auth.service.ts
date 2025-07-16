import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// PUBLIC_INTERFACE
export class AuthService {
  // Returns a dummy observable for demonstration; replace with your implementation.
  isLoggedIn(): Observable<boolean> {
    return new BehaviorSubject<boolean>(true).asObservable();
  }
  // Returns a dummy email for demonstration; replace with your implementation.
  getEmail(): string {
    return 'user@example.com';
  }
  // Dummy logout; replace with your implementation.
  logout(): void {}
}

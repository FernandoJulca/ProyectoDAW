import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import {jwtDecode }from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private apiUrl = 'http://localhost:8080/auth/login';

    constructor(private http: HttpClient){

    }

   login(credentials: { email: string, password: string }): Observable<any> {
  const body = new HttpParams()
    .set('correo', credentials.email)   // coincide con @RequestParam("correo")
    .set('clave', credentials.password); // coincide con @RequestParam("clave")

  return this.http.post(this.apiUrl, body.toString(), {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    responseType: 'text'
  });
}

  
  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  getUserRoles(): string[]{
    const token = this.getToken();
    if(!token) return [];
    const decoded: any = jwtDecode(token);
    return decoded.roles || [];
  }
  
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

   logout(): void {
    localStorage.removeItem('authToken');
  }
}

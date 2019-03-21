import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { Router } from '@angular/router';
import { LoginDto } from '../dto/login.dto';

const authUrl = `${environment.apiUrl}`;
const masterkey = `${environment.masterkey}`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient, 
    private router: Router
  ) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Basic ` + btoa(`${loginDto.email}:${loginDto.password}`),
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.post<LoginResponse>(`${authUrl}auth?access_token=${masterkey}`, null, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('name', loginResponse.name);
    localStorage.setItem('email', loginResponse.email);
    localStorage.setItem('role', loginResponse.role);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role');
  }

  doLogout() {
    localStorage.clear();
    this.router.navigate(['/session/signin']);
  }
}
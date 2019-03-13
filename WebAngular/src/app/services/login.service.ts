import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { LoginDto } from '../dto/login.dto';
import { Router } from '@angular/router';

const authUrl = `${environment.apiUrl}`;
const materkey = `${environment.masterkey}`;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
    private router: Router) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    const requestOptions ={
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic '+ btoa(`${loginDto.email}:${loginDto.password}`),
        'Acess-Control-Allow-Origin': '*'
      })
    }
    return this.http.post<LoginResponse>(`${authUrl}/auth?access_token=${materkey}`, null, requestOptions);
  }

  setLoginData(loginResponse: LoginResponse) {
    localStorage.setItem('token', loginResponse.token);
    localStorage.setItem('email', loginResponse.email);
    localStorage.setItem('role', loginResponse.role);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }
}
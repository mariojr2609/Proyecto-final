import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from '../interfaces/login-response';
import { LoginDto } from '../dto/login.dto';

const authUrl = `${environment.apiUrl}/auth`;
const requestOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(loginDto: LoginDto): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${authUrl}/login`, loginDto, requestOptions);
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
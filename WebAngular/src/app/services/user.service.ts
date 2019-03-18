import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Users } from '../responses/user.response';
import { FormGroup } from '@angular/forms';

const authUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private loginService: LoginService) { }

  getUsers(): Observable<Users[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.get<Users[]>(`${authUrl}/users`, requestOptions);
  }

  addUsers(users:Users): Observable<Users>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.post<Users>(`${authUrl}/users`, users, requestOptions);
  }

  editUsers(id:string, editUsers:FormGroup): Observable<Users> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Users>(`${authUrl}/user/:id${id}`, editUsers, requestOptions);
  }

  updateUsers(users:Users): Observable<Users> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };

    return this.http.put<Users>(`${authUrl}`,users , requestOptions);
  }

  deleteUsers(id:string){
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete(`${authUrl}/user/:id${id}`, requestOptions);
  }
}


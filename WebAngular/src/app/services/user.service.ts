import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Users } from '../responses/user.response';
import { FormGroup } from '@angular/forms';
import { UserDto } from '../dto/user.dto';

const authUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  getUsers(): Observable<Users>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.get<Users>(`${authUrl}/users`, requestOptions);
  }

  addUsers(userdto:UserDto): Observable<Users>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.post<Users>(`${authUrl}/users`, userdto, requestOptions);
  }

  editUsers(id:string, editUsers:FormGroup): Observable<Users> {
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Users>(`${authUrl}/user/:id/${id}`, editUsers, requestOptions);
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

  deleteUsers(id:string): Observable<Users>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete<Users>(`${authUrl}/user/:id/${id}`, requestOptions);
  }
}


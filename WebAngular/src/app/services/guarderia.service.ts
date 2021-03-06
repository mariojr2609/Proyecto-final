import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { LoginService } from './login.service';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Guarderias } from '../responses/guarderias.response';
import { Observable } from 'rxjs';
import { GuarderiasDto } from '../dto/guarderias.dto';

const authUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class GuarderiasService {
  constructor(
    private http: HttpClient, 
    private loginService: LoginService,
  ) { }

  getGuarderias(): Observable<Guarderias>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.get<Guarderias>(`${authUrl}/guarderias`, requestOptions);
  }

  addGuarderias(guarderias:Guarderias): Observable<Guarderias>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.post<Guarderias>(`${authUrl}/guarderias`, guarderias, requestOptions);
  }

  editGuarderias(id:string, editarGuarderia:GuarderiasDto): Observable<Guarderias>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Guarderias>(`${authUrl}/guarderia/:id/${id}`, editarGuarderia, requestOptions);
  }

  updateGuarderias(guarderias:Guarderias): Observable<Guarderias>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Guarderias>(`${authUrl}`, guarderias, requestOptions);
  }

  deleteGuarderias(id:string): Observable<Guarderias>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete<Guarderias>(`${authUrl}/guarderias/:id/${id}`, requestOptions);
  }
}
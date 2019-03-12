import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from './login.service';
import { Observable } from 'rxjs';
import { Canguros } from '../responses/conguros.response';
import { CangurosDto } from '../dto/canguros.dto';
import { environment } from 'src/environments/environment';

const authUrl = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})

export class CangurosService {
  constructor(
    private http: HttpClient, 
    private loginService: LoginService,
  ) { }

  getCanguros(): Observable<Canguros[]>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.get<Canguros[]>(`${authUrl}/canguros/all`, requestOptions);
  }

  addCanguros(canguros:Canguros): Observable<Canguros>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.post<Canguros>(`${authUrl}/canguros/create`, canguros, requestOptions);
  }

  editCanguros(id:string, editCanguros:CangurosDto): Observable<Canguros>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Canguros>(`${authUrl}/guarderia/edit/${id}`, editCanguros, requestOptions);
  }

  updateCanguros(canguros:Canguros): Observable<Canguros>{
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`
      })
    };
    return this.http.put<Canguros>(`${authUrl}`, canguros, requestOptions);
  }

  deleteCanguros(id:string){
    const requestOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.loginService.getToken()}`,
        'Access-Control-Allow-Origin': '*'
      })
    };
    return this.http.delete(`${authUrl}/canguros/${id}`, requestOptions);
  }
}

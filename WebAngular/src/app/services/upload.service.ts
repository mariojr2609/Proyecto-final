import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  uploadUrl: string;
  token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjODc3OWVmM2IwZmIwMDAyMmZkYmIxZCIsImlhdCI6MTU1MjM4OTczM30.2Y9dda0xi35KUEo_1U4KASLw8Y7DoZrp8F_2Ps77H98';

  constructor(private http: HttpClient) { }

  public upload(files: Set<File>, idCanto: number): { [key: string]: Observable<number> } {
    this.uploadUrl = `https://infinite-hollows-38239.herokuapp.com/productos?access_token=${this.token}`;
    const status = { };

    files.forEach(file => {
      const formData: FormData = new FormData();
      formData.append('foto', file, file.name);
      formData.append('nombre', 'Correa');
      formData.append('codReferencia', '59127512');
      formData.append('descripcion', 'Correa HAS de traccion 8');
      formData.append('dimensiones', '3m x 60mm');
      formData.append('distribuidor', '5c8a1d524b8399345d1bfbd1');
      formData.append('categoria', '5c88fff7551c6100224c4cc3');
      const req = new HttpRequest('POST', this.uploadUrl, formData, {
        reportProgress: true,
      });
      const progress = new Subject<number>();
      const startTime = new Date().getTime();
      this.http.request(req).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round((100 * event.loaded) / event.total);
          progress.next(percentDone);
        }
        else if (event instanceof HttpResponse) {
          progress.complete();
        }
      });
      status[file.name] = {
        progress: progress.asObservable()
      };
    });
    return status;
  }
}

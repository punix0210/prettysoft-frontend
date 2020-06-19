import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Cliente } from '../model/cliente';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { HttpService } from '../service/http.service';

const endPoint = 'pessoas';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient, private httpSync: HttpService<Cliente>) { }

  public findByNameContaing(keyword: string): Observable<Cliente[]> {
    const idCategoria = 1;
    return this.http.get<Cliente[]>(`${environment.url_api}/pessoas/categoria/${idCategoria}/pessoa/${keyword}`);
  }

  public save(cliente: Cliente) {
    return this.httpSync.post(`${endPoint}`, cliente);
  }

}

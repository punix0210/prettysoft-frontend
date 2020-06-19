import { Colaborador } from './../model/colaborador';
import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  constructor(private http: HttpClient, private httpSync: HttpService<Colaborador>) { }

  public findAll() {
    const idCategoria = 3;
    return this.httpSync.get(`/pessoas/categoria/${idCategoria}`);
  }

  public findByNameContaing(keyword: string): Observable<Colaborador[]> {
    const idCategoria = 3;
    console.log(`${environment.url_api}/pessoas/categoria/${idCategoria}/pessoa/${keyword}`);
    return this.http.get<Colaborador[]>(`${environment.url_api}/pessoas/categoria/${idCategoria}/pessoa/${keyword}`);
  }

}

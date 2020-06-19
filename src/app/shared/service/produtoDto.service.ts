import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ProdutoDTO } from '../model/produtoDTO';

const endpoint = 'produtos';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(private httpSync: HttpService<ProdutoDTO>) { }

  findAll() {
    return this.httpSync.get(`${endpoint}`);
  }

}

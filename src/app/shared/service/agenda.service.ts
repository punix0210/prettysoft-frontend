import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { Agenda } from '../model/agenda';

const endpoint = '/agendamentos';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http: HttpService<Agenda>) { }

  public findAll() {
    return this.http.get(`${endpoint}`);
  }

  public findByColaboradorAndData(colaborador, data: string) {
    return this.http.get(`${endpoint}/pessoas?data=${data}&nome=${colaborador}`);
  }

  public findByColaboradorAndDtIniAndDtFim(colaborador, dtIni, dtFim: string) {
    console.log(`${endpoint}/pessoa?dtIni=${dtIni}&dtFim=${dtFim}&id=${colaborador.idPessoa}`);
    return this.http.get(`${endpoint}/pessoa?dtIni=${dtIni}&dtFim=${dtFim}&id=${colaborador.idPessoa}`);
  }

  public save(agenda: Agenda) {
    if (agenda.idAgenda !== 0 && agenda.idAgenda !== null) {
      return this.http.put(`${endpoint}`, agenda);
    } else {
      return this.http.post(`${endpoint}`, agenda);
    }

  }

}

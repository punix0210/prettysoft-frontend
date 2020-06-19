
import { AgendaComponentBase } from 'src/app/shared/components/base/agenda-component-base';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { EventInput, formatDate } from '@fullcalendar/core';
import { AgendaService } from 'src/app/shared/service/agenda.service';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

import { ColaboradorService } from 'src/app/shared/service/colaborador.service';
import { Colaborador } from 'src/app/shared/model/colaborador';
import { FormatDate } from 'src/app/shared/core/localeDateFormat';

import { Agenda } from 'src/app/shared/model/agenda';
import { Cliente } from 'src/app/shared/model/cliente';
import { Router, NavigationExtras, RouterLink } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-agendas',
  templateUrl: './agendas.component.html',
  styleUrls: ['./agendas.component.css']
})
export class AgendasComponent extends AgendaComponentBase implements OnInit {

  formColaborador: FormGroup;

  colaboradoresList: Colaborador[] = [];

  calendarEvents: EventInput[] = [];

  constructor(
    private service: AgendaService,
    private serviceColaborador: ColaboradorService,
    private router: Router,
    private fb: FormBuilder
  ) { super(); }

  ngOnInit() {

    super.ngOnInit();

    let colaborador;

    if (localStorage.getItem('profissional') !== undefined || null) {
      colaborador = JSON.parse(localStorage.getItem('profissional'));
    } else {
      colaborador = new Colaborador(0, '', '', '', '', '', '', '', '', null);
    }

    console.log(colaborador);

    this.createFormColaborador(colaborador);

    this.findByColaboradores();

    setTimeout(() => {
      this.findAllAgenda();
    });

  }

  createFormColaborador(colaborador: Colaborador) {
    this.formColaborador = this.fb.group({
      idPessoa: [colaborador.idPessoa],
      cdChamada: [colaborador.cdChamada],
      nmPessoa: [colaborador.nmPessoa],
      nmCurto: [colaborador.nmCurto],
      telefone: [colaborador.telefone],
      celular: [colaborador.celular],
      email: [colaborador.email],
      cpfCnpj: [colaborador.cpfCnpj],
      tpPessoa: [colaborador.tpPessoa],
      categorias: this.fb.array([])
    });
  }

  async findByColaboradores() {
    let lista = await this.serviceColaborador.findAll();
    this.colaboradoresList = lista.data;
  }

  async findAllAgenda() {

    let pessoa = Object.assign({}, this.formColaborador.value);
    let dtIni = FormatDate.format(this.getDateStart());
    let dtFim = FormatDate.format(this.getDateEnd());

    console.log(dtIni + ' - ' + dtFim);

    await this.findAllByDayBetweenAndPessoa(dtIni, dtFim, pessoa);

  }

  private async findAllByDayBetweenAndPessoa(dtIni: string, dtFim: string, pessoa) {

    let lista = await this.service.findByColaboradorAndDtIniAndDtFim(pessoa, dtIni, dtFim);

    this.calendarEvents = [];
    lista.data.forEach(dados => {
      this.calendarEvents = this.calendarEvents.concat(
        {
          id: dados.idAgenda,
          title: dados.descricao,
          date: dados.data + ' ' + dados.horario,
          color: dados.color,
          extendedProps: dados
        }
      );
    });
    console.log(this.calendarEvents);
  }


  onEdit(event) {
    this.onFormAgenda(event.event.extendedProps as Agenda);
  }

  onCreate(agenda: Agenda) {
    // console.log(this.dateValue);
    this.onFormAgenda(agenda);
  }

  onFormAgenda(agenda) {
    const navigationExtras: NavigationExtras = {
      skipLocationChange: false,
      replaceUrl: false,
      state: agenda
    };

    this.router.navigateByUrl('agendas/agendamento', navigationExtras);
  }

  onSelectColaborador(event): void {

    let ob = this.colaboradoresList.filter((el) => {
      return el.idPessoa.toString().indexOf(event.toString()) > -1 as Colaborador;
    })[0];

    localStorage.setItem('profissional', JSON.stringify(ob));

    console.log(localStorage.getItem('profissional'));

    this.formColaborador.patchValue({
      idPessoa: ob.idPessoa,
      cdChamada: ob.cdChamada,
      nmCurto: ob.nmCurto,
      nmPessoa: ob.nmPessoa,
      telefone: ob.telefone,
      celular: ob.celular,
      email: ob.email,
      cpfCnpj: ob.cpfCnpj,
      tpPessoa: ob.tpPessoa,
      categorias: []
    });
  }

  get Agenda() {
    return new Agenda(0, '', FormatDate.format(this.dateValue), '', 'A', '', this.Cliente, [], 10, '#FF9900', this.Colaborador);
  }

  get Cliente() {
    return new Cliente(
      0, '', '', '', '', '', '', '', 'F', [{
        idCategoria: 1,
        cdChamada: '',
        dtCadastro: FormatDate.format(new Date()),
        nmCategoria: 'Cliente',
        stAtivo: 'S'
      }]
    );

  }

  get Colaborador() {
    return new Colaborador(
      0, '', '', '', '', '', '', '', 'F', [{
        idCategoria: 1,
        cdChamada: '',
        dtCadastro: FormatDate.format(new Date()),
        nmCategoria: 'Colaborador',
        stAtivo: 'S'
      }]
    );

  }


}

  // openDialog(arg) {

  //   let agenda: Agenda = arg === undefined ? this.Agenda : arg.event.extendedProps;

  //   let dialogConfig = new MatDialogConfig();
  //   dialogConfig.disableClose = true;
  //   dialogConfig.autoFocus = true;
  //   dialogConfig.data = agenda;

  //   console.log(dialogConfig.data);

  //   const dialogRef = this.dialog.open(AgendaDialogComponent, dialogConfig);

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log(`Dialog result: ${result}`);
  //   });

  // }



// async findAllAgenda() {

//   let result = this.getCalendarView();

//   let pessoas: [] = this.colaboradores.value;

//   if (result === 'timeGridDay') {

//     let data: string = FormatDate.format(this.dateValue);

//     await this.findAllByDayAndPessoa(data, data, pessoas);

//   } else if (result === 'timeGridWeek') {

//     let dtIni = FormatDate.format(this.getDateStart());
//     let dtFim = FormatDate.format(this.getDateEnd());

//     await this.findAllByDayBetweenAndPessoa(dtIni, dtFim, pessoas);

//   }

// }


// private async findAllByDayAndPessoa(dtIni: string, dtFim: string, pessoas: []) {

//   let lista = await this.service.findByColaboradorAndDtIniAndDtFim(pessoas, dtIni, dtFim);

//   this.calendarEvents = [];
//   lista.data.forEach(dados => {
//     this.calendarEvents = this.calendarEvents.concat(
//       {
//         id: dados.idAgenda,
//         title: dados.descricao,
//         date: dados.data + ' ' + dados.horario,
//         color: dados.color,
//         extendedProps: dados
//       }
//     );
//   });
//   console.log(this.calendarEvents);
// }


// async findAll() {
//   let lista = await this.service.findAll();

//   lista.data.forEach(dados => {
//     this.calendarEvents = this.calendarEvents.concat(
//       {
//         id: dados.idAgenda,
//         title: dados.descricao,
//         date: dados.data + ' ' + dados.horario,
//         color: dados.color,
//         extendedProps: dados
//       }
//     );
//   });
// }

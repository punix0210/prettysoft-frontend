import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/public_api';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { map, startWith, debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { Observable, Observer, of } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';

import { Agenda } from 'src/app/shared/model/agenda';
import { Cliente } from 'src/app/shared/model/cliente';
import { Colaborador } from 'src/app/shared/model/colaborador';
import { AgendaItem } from 'src/app/shared/model/agenda-item';
import { ProdutoDTO } from 'src/app/shared/model/produtoDTO';

import { AgendaService } from 'src/app/shared/service/agenda.service';
import { ColaboradorService } from 'src/app/shared/service/colaborador.service';
import { ClienteService } from 'src/app/shared/service/cliente.service';
import { ProdutoService } from 'src/app/shared/service/produtoDTO.service';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { CadastroClienteDialogComponent } from '../cadastro-cliente-dialog/cadastro-cliente-dialog.component';
import { AlertService } from 'src/app/shared/service/alert.service';

@Component({
  selector: 'app-agendamento',
  templateUrl: './agendamento.component.html',
  styleUrls: ['./agendamento.component.css']
})
export class AgendamentoComponent implements OnInit {

  public noResultCli = false;

  public errorMessage: string;
  public description = 'Agendamento';
  public formAgenda: FormGroup;
  dataSource$: Observable<Cliente[]>;
  colaboradoresList: Colaborador[];
  produtoList: ProdutoDTO[] = [];

  formControlItems = new FormControl();

  constructor(
    private router: Router,
    private _fb: FormBuilder,
    private clienteService: ClienteService,
    private colaboradorService: ColaboradorService,
    private agendaService: AgendaService,
    private produtoService: ProdutoService,
    private location: Location,
    private modalService: NgbModal,
    private config: NgbModalConfig,
    private alertService: AlertService
  ) {

    this.config.backdrop = 'static';
    this.config.keyboard = false;

    const dados = this.router.getCurrentNavigation();

    if (dados.extras.state === undefined) {
      this.router.navigate(['agendas']);
    }
    this.onCreateForm(dados.extras.state as Agenda);
    console.log(this.location.getState());
  }

  ngOnInit(): void {

    this.findAllProduto();

    this.findAllColaborador();

    this.dataSource$ = new Observable((observer: Observer<string>) => {
      observer.next(this.formAgenda.get('cliente').get('nmPessoa').value);
    }).pipe
      (
        startWith(''),
        debounceTime(1000),
        distinctUntilChanged(),
        filter((query) => query.length > 2),
        switchMap((query: string) => {
          console.log(query);
          if (query) {
            return this.clienteService.findByNameContaing(query).pipe(
              map((data) => data || []),
              tap(() => {
                this.errorMessage = 'Cliente não localizado';
              })
            );
          }
          return of([]);
        })
      );
  }

  async findAllProduto() {
    let lista = await this.produtoService.findAll();
    this.produtoList = lista.data;
    // console.log(this.produtoList);
  }

  async findAllColaborador() {
    let lista = await this.colaboradorService.findAll();
    this.colaboradoresList = lista.data;
  }

  onCreateForm(agenda: Agenda) {

    this.formAgenda = this._fb.group({
      idAgenda: [agenda.idAgenda],
      descricao: [agenda.descricao],
      data: [new Date(agenda.data.toString().replace('-', '/')), [Validators.required]],
      horario: [agenda.horario, [Validators.required]],
      status: [agenda.status, [Validators.required]],
      observacao: [agenda.observacao],
      cliente: this._fb.group({
        idPessoa: [agenda.cliente.idPessoa, [Validators.required]],
        cdChamada: [agenda.cliente.cdChamada, [Validators.required]],
        nmPessoa: [agenda.cliente.nmPessoa, [Validators.required]],
        nmCurto: [agenda.cliente.nmCurto],
        telefone: [agenda.cliente.telefone],
        celular: [agenda.cliente.celular],
        email: [agenda.cliente.email],
        cpfCnpj: [agenda.cliente.cpfCnpj],
        tpPessoa: [agenda.cliente.tpPessoa],
        categorias: this._fb.array(agenda.cliente.categorias)
      }),

      colaborador: this._fb.group({
        idPessoa: [agenda.colaborador.idPessoa, [Validators.required]],
        cdChamada: [agenda.colaborador.cdChamada, [Validators.required]],
        nmPessoa: [agenda.colaborador.nmPessoa, [Validators.required]],
        nmCurto: [agenda.colaborador.nmCurto],
        telefone: [agenda.colaborador.telefone],
        celular: [agenda.colaborador.celular],
        email: [agenda.colaborador.email],
        cpfCnpj: [agenda.colaborador.cpfCnpj],
        tpPessoa: [agenda.colaborador.tpPessoa],
        categorias: this._fb.array(agenda.colaborador.categorias)
      }),
      items: this._fb.array(
        agenda.items.length > 0 ? agenda.items.map((item) => {
          return this.createItem(item);
        }) : [this.createItem(new AgendaItem(0, new ProdutoDTO(0, '', '', '', '', 0, 0, 0), 1, 0, 0, 0))], [Validators.required]),
      tempo: [agenda.tempo, [Validators.required]],
      color: [agenda.color]
    });

    // console.log(this.formAgenda);

  }

  typeaheadNoResultsCli(event: boolean): void {
    this.noResultCli = event;
  }

  async created() {

    let agenda = Object.assign({}, this.formAgenda.value as Agenda);

    agenda.descricao = agenda.cliente.nmPessoa;

    console.log(agenda);

    let response = await this.agendaService.save(agenda);

    if (response.success === true) {
      this.alertService.success('Gravação realizada com sucesso!', {
        autoClose: true,
        keepAfterRouteChange: true
      });
      this.location.back();
    }

  }

  cancel() {
    this.location.back();
    this.formAgenda.reset();
  }

  get items(): FormArray {
    return this.formAgenda.get('items') as FormArray;
  }

  arrayLength() {
    return this.items.length - 1;
  }

  createItem(item: AgendaItem) {
    return this._fb.group({
      idAgendaItem: [item.idAgendaItem],
      quantidade: [item.quantidade, [Validators.required]],
      produto: this._fb.group({
        idProduto: [item.produto.idProduto, [Validators.required]],
        cdChamada: [item.produto.cdChamada, [Validators.required]],
        nmProduto: [item.produto.nmProduto, [Validators.required]],
        nmProdutoCurto: [item.produto.nmProdutoCurto],
        tpServico: [item.produto.tpServico],
        vlPreco: [item.produto.vlPreco],
        alRepasse: [item.produto.alRepasse]
      }),
      vlUnitario: [item.vlUnitario],
      vlItem: [item.vlItem, [Validators.required]],
      alComissao: [item.alComissao]
    });
  }

  changeQtd(quantidade, index) {
    console.log(quantidade);
    this.items.at(index).patchValue({
      vlUnitario: this.items.at(index).get('produto').get('vlPreco').value,
      vlItem: quantidade * this.items.at(index).get('produto').get('vlPreco').value
    });
  }

  removeItem(index) {
    this.items.removeAt(index);
  }

  addItem() {

    this.items.push(
      this._fb.group({
        idAgendaItem: [null],
        quantidade: [1, [Validators.required]],
        produto: this._fb.group({
          idProduto: ['', [Validators.required]],
          cdChamada: ['', [Validators.required]],
          nmProduto: ['', [Validators.required]],
          nmProdutoCurto: [''],
          tpServico: [''],
          vlPreco: [0],
          alRepasse: [0]
        }),
        vlUnitario: [0],
        vlItem: [0, [Validators.required]],
        alComissao: [0]
      }));

  }

  onSelectServico(item, index) {

    let ob = this.produtoList.filter((el) => {
      return el.idProduto.toString().indexOf(item.toString()) > -1 as ProdutoDTO;
    })[0];

    this.items.at(index).get('produto').patchValue({
      cdChamada: ob.cdChamada,
      nmProduto: ob.nmProduto,
      nmProdutoCurto: ob.nmProdutoCurto,
      tpServico: ob.tpServico,
      vlPreco: ob.vlPreco,
      alRepasse: ob.alRepasse
    });


    this.items.at(index).patchValue({
      vlUnitario: ob.vlPreco,
      vlItem: ob.vlPreco * this.items.at(index).get('quantidade').value,
      alComissao: ob.alRepasse
    });

  }

  onSelectCliente(event: TypeaheadMatch): void {
    console.log(event.item);
    this.formAgenda.get('cliente').patchValue({
      idPessoa: event.item.idPessoa,
      cdChamada: event.item.cdChamada,
      nmCurto: event.item.nmCurto,
      telefone: event.item.telefone,
      celular: event.item.celular,
      email: event.item.email,
      cpfCnpj: event.item.cpfCnpj,
      tpPessoa: event.item.tpPessoa
    });
  }

  onSelectColaborador(event): void {

    let ob = this.colaboradoresList.filter((el) => {
      return el.idPessoa.toString().indexOf(event.toString()) > -1 as Colaborador;
    })[0];

    this.formAgenda.get('colaborador').patchValue({
      idPessoa: ob.idPessoa,
      cdChamada: ob.cdChamada,
      nmCurto: ob.nmCurto,
      nmPessoa: ob.nmPessoa,
      telefone: ob.telefone,
      celular: ob.celular,
      email: ob.email,
      cpfCnpj: ob.cpfCnpj,
      tpPessoa: ob.tpPessoa,
    });
  }

  onClearFormCliente(input) {
    this.noResultCli = false;
    input.value = '';
    this.formAgenda.get('cliente').patchValue({
      idPessoa: '',
      cdChamada: '',
      nmCurto: '',
      nmPessoa: '',
      telefone: '',
      celular: '',
      email: '',
      cpfCnpj: '',
      tpPessoa: ''
    });
  }

  onDialogCliente() {
    const modal = this.modalService.open(CadastroClienteDialogComponent, { size: 'lg', });
    modal.result.then((result) => {
      if (result === 'close') {
        // alert('Fechou');
      } else {
        this.saveCliente(result as Cliente);
      }
    });
  }

  async saveCliente(cliente) {
    let res = await this.clienteService.save(cliente);
    if (res.success === true) {
      this.alertService.success('Cliente cadastrado com sucesso!', {
        autoClose: true,
        keepAfterRouteChange: true
      });
    } else {
      this.alertService.error('Você não deveria estar lendo esta mensagem. Ocorreu um erro na gravação, tente novamente !',
        {
          autoClose: true,
          keepAfterRouteChange: true
        });
    }
  }



}

// https://github.com/mainawycliffe/angular-dynamic-form-fields-in-reactive-forms/blob/master/src/app/app.component.ts

// const capabilityFormGroup = (this.formAgenda.get('capabilities') as FormArray).at(index);
// disabled ? capabilityFormGroup.enable() : capabilityFormGroup.disable();

    // if (agenda.items.length > 0) {
    //   this.formAgenda.setControl('items', this.populateItem(agenda.items));
    // }


    // populateItem(items: AgendaItem[]) {
    //   let lista = new FormArray([]);
    //   items.forEach((item) => {
    //     lista.push(this._fb.group({
    //       idAgendaItem: [item.idAgendaItem],
    //       quantidade: [item.quantidade],
    //       produto: this._fb.group({
    //         idProduto: [item.produto.idProduto],
    //         cdChamada: [item.produto.cdChamada],
    //         nmProduto: [item.produto.nmProduto],
    //         nmProdutoCurto: [item.produto.nmProdutoCurto],
    //         tpServico: [item.produto.tpServico],
    //         vlPreco: [item.produto.vlPreco],
    //         alRepasse: [item.produto.alRepasse]
    //       }),
    //       vlUnitario: [item.vlUnitario],
    //       vlItem: [item.vlItem],
    //       alComissao: [item.alComissao]
    //     })
    //     );
    //   });
    //   return lista;
    // }

import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Cliente } from 'src/app/shared/model/cliente';
import { FormatDate } from 'src/app/shared/core/localeDateFormat';

@Component({
  selector: 'app-cadastro-cliente-dialog',
  templateUrl: './cadastro-cliente-dialog.component.html',
  styleUrls: ['./cadastro-cliente-dialog.component.css']
})
export class CadastroClienteDialogComponent implements OnInit {

  public formCliente: FormGroup;

  constructor(
    private activeModal: NgbActiveModal,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.createForm(new Cliente(
      0, '', '', '', '', '', '', '', 'F', [{
        idCategoria: 1,
        cdChamada: '',
        dtCadastro: FormatDate.format(new Date()),
        nmCategoria: 'Cliente',
        stAtivo: 'S'
      }]
    ));
  }

  onClose(result) {
    console.log(result);
    this.activeModal.close(result);
  }

  createForm(cliente: Cliente) {
    this.formCliente = this.fb.group({
      idPessoa: [cliente.idPessoa],
      cdChamada: [cliente.cdChamada],
      nmCurto: [cliente.nmCurto, [Validators.required]],
      nmPessoa: [cliente.nmPessoa, [Validators.required]],
      telefone: [cliente.telefone],
      celular: [cliente.celular, [Validators.required]],
      email: [cliente.email, [Validators.email]],
      cpfCnpj: [cliente.cpfCnpj],
      tpPessoa: [cliente.tpPessoa],
      categorias: this.fb.array(cliente.categorias)
    });
  }

  onCreate() {

    if (!this.formCliente.valid) {
      return;
    }

    this.onClose(this.formCliente.value as Cliente);

  }

}

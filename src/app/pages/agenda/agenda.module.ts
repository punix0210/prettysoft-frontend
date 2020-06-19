import { NgModule } from '@angular/core';

import { AgendaRoutingModule } from './agenda-routing.module';
import { AgendasComponent } from './agendas/agendas.component';

import { SharedModule } from 'src/app/shared/shared.module';
import { AgendaService } from 'src/app/shared/service/agenda.service';
import { CadastroClienteDialogComponent } from './cadastro-cliente-dialog/cadastro-cliente-dialog.component';

import { ClienteService } from './../../shared/service/cliente.service';
import { AgendamentoComponent } from './agendamento/agendamento.component';
import { ColaboradorService } from 'src/app/shared/service/colaborador.service';
import { ProdutoService } from 'src/app/shared/service/produtoDTO.service';

@NgModule({
  declarations:
    [
      AgendasComponent,
      CadastroClienteDialogComponent,
      AgendamentoComponent,
    ],
  imports:
    [
      SharedModule,
      AgendaRoutingModule
    ],
  providers:
    [
      AgendaService,
      ClienteService,
      ColaboradorService,
      ProdutoService
    ],
  entryComponents: [
    CadastroClienteDialogComponent
  ]
})
export class AgendaModule { }

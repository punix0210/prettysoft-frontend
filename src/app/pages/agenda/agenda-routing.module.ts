import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgendasComponent } from './agendas/agendas.component';
import { AgendamentoComponent } from './agendamento/agendamento.component';



const routes: Routes = [

  {
    path: '', component: AgendasComponent
  },
  {
    path: 'agendamento', component: AgendamentoComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgendaRoutingModule { }

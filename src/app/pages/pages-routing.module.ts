import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes =
  [
    {
      path: '',
      redirectTo: 'agendas',
      pathMatch: 'full'
    },
    {
      path: 'agendas',
       loadChildren: () => import('../pages/agenda/agenda.module').then(m => m.AgendaModule)
    },
    {
      path: 'usuarios',
       loadChildren: () => import('../pages/usuario/usuario.module').then(m => m.UsuarioModule)
    }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }

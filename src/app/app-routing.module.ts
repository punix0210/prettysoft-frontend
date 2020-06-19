import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layout/full/full.component';

const routes: Routes =
  [
    {
      path: '', component: FullComponent,
      children:
        [
          {
            path: '',
            loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
          }
        ]
    },
    // {
    //   path: '',
    //   loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
    // },
    {
      path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

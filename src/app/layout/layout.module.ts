import { NgModule } from '@angular/core';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FullComponent } from './full/full.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:
    [
      FullComponent,
      NavbarComponent,
      SidebarComponent,
      FooterComponent
    ],
  imports:
    [
      SharedModule,
      RouterModule
    ],
  exports:
    [
      SharedModule,
      RouterModule,

      FullComponent,
      NavbarComponent,
      SidebarComponent,
      FooterComponent
    ]
})
export class LayoutModule { }

import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';


@NgModule({
  declarations:
    [
      LoginComponent,
      RegisterComponent
    ],
  imports:
    [
      CommonModule,
      AuthRoutingModule
    ],
  exports:
    [
      LoginComponent,
      RegisterComponent
    ]
})
export class AuthModule { }

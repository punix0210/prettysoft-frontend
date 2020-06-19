import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import {
  LocationStrategy,
  PathLocationStrategy,
  registerLocaleData
} from '@angular/common';

import { AppComponent } from './app.component';

import { LayoutModule } from './layout/layout.module';

import localePt from '@angular/common/locales/pt';
import { AlertModule } from './shared/components/alert/alert.module';


registerLocaleData(localePt);

@NgModule({
  declarations:
    [
      AppComponent
    ],
  imports:
    [
      BrowserModule,
      BrowserAnimationsModule,
      NoopAnimationsModule,
      HttpClientModule,
      AppRoutingModule,
      RouterModule,
      LayoutModule,
      AlertModule
    ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

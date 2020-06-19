import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { FullCalendarModule } from '@fullcalendar/angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CalendarModule } from 'angular-calendar';

import { MaterialModule } from './material.module';
import { BootstrapModule } from './bootstrap.module';

import { PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AlertModule } from './components/alert/alert.module';

// import { NguiAutoCompleteModule } from '@ngui/auto-complete';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  imports: [
    PerfectScrollbarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    CalendarModule,
    FlexLayoutModule,
    MaterialModule,
    BootstrapModule,
    AlertModule
  ],
  exports: [
    PerfectScrollbarModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    CalendarModule,
    FlexLayoutModule,
    MaterialModule,
    BootstrapModule,
    AlertModule
  ],
  providers:
    [
      {
        provide: PERFECT_SCROLLBAR_CONFIG,
        useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
      }
    ]
})
export class SharedModule { }

import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { NgxSpinnerModule } from 'ngx-spinner';
import { CalendarModule } from 'primeng/calendar';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { NgxMaskModule, IConfig } from 'ngx-mask';

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  imports:
    [
      TypeaheadModule.forRoot(),
      NgxMaskModule.forRoot()
    ],
  exports:
    [
      NgbModule,
      ToastrModule,
      NgxSpinnerModule,
      NgxMaskModule,
      CalendarModule,
      TypeaheadModule
    ]
})
export class BootstrapModule { }

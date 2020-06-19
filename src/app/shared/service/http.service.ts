import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { ResponseHttp } from '../interface/ResponseHttp';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService<T> {

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService
  ) { }

  private createHeader(header?: HttpHeaders): HttpHeaders {

    if (!header) {
      header = new HttpHeaders();
    }

    header = header.append('Content-Type', 'application/json');
    header = header.append('Accept', 'application/json');

    return header;

  }

  public get(url: string): Promise<ResponseHttp> {

   // console.log(environment.url_api);

    const header = this.createHeader();

    return new Promise(async (resolve) => {
      try {
        this.spinner.show();
        let res = await this.http.get<ResponseHttp>(`${environment.url_api}/${url}`, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        resolve({ success: false, data: {}, error });
      }
    });
  }

  public post(url: string, model: T): Promise<ResponseHttp> {

    const header = this.createHeader();

    return new Promise(resolve => {

      try {
        this.spinner.show();
        let res = this.http.post(`${environment.url_api}/${url}`, model, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        resolve({ success: false, data: {}, error });
      }

    });
  }

  public put(url: string, model: T): Promise<ResponseHttp> {

    const header = this.createHeader();

    return new Promise(resolve => {
      try {
        this.spinner.show();
        let res = this.http.put(`${environment.url_api}/${url}`, model, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        resolve({ success: false, data: {}, error });
      }
    });

  }

  public delete(url: string): Promise<ResponseHttp> {

    const header = this.createHeader();

    return new Promise(resolve => {
      try {
        this.spinner.show();
        let res = this.http.delete(`${environment.url_api}/${url}`, { headers: header }).toPromise();
        resolve({ success: true, data: res, error: undefined });
        this.spinner.hide();
      } catch (error) {
        this.spinner.hide();
        resolve({ success: false, data: {}, error });
      }
    });

  }

}

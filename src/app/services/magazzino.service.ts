import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { GlobalComponent } from '../global-component';

@Injectable({
  providedIn: 'root'
})
export class MagazzinoService {

  private url = GlobalComponent.url_global +'/api/api.php?action=gestione_magazzino';

  array_info: any;
  array_chiamata: any;
  request: any;
  array_operatore: any;
  delete: any;
  anno_globale = localStorage.getItem("anno_globale");

  constructor(private httpClient: HttpClient, public fb: UntypedFormBuilder,) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



  public getMagazzinoList(page, size, filter) {
    let url = this.url + `&page=${page}&size=${size}`;
    if (filter)
      url += `&filter=${filter}`
    return this.httpClient.get<any[]>(url)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getGiacenzaList(page, size) {
    return this.httpClient.get<any[]>(GlobalComponent.url_global +'/api/api.php?action=giacenza_magazzino' + `&page=${page}&size=${size}`)
      .pipe(
        catchError(this.handleError)
      )
  }

  public setQuantity(data: any) {
    return this.httpClient.post<any[]>(GlobalComponent.url_global +'/api/api.php?action=update_magazzino', data)
      .pipe(
        catchError(this.handleError)
      )
  }




  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}

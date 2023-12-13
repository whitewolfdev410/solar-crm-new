import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { GlobalComponent } from '../global-component';


@Injectable({
  providedIn: 'root'
})
export class ReportMailService {


  private url = GlobalComponent.url_global +'/report-mail.php?request=';
  array_info: any;
  array_chiamata: any;
  request: any;
  array_operatore: any;
  delete: any;
  anno_globale = localStorage.getItem("anno_globale");

  constructor(private httpClient: HttpClient, public fb: UntypedFormBuilder,) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



  public getReport(user) {
    return this.httpClient.get(this.url + 'getReport&id_utente='+user)
      .pipe(
        catchError(this.handleError)
      )
  }
  public getAutomazioniList() {
    return this.httpClient.get(this.url + 'getAutomazioniList')
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { Fattura } from './../models/fattura.model';

@Injectable({
  providedIn: 'root'
})
export class FattureService {


  private url = 'https://gestionalecero.it/gest_2022/fattura.php?request=';
  private url_post = 'https://gestionalecero.it/gest_2022/fattura-post.php';
  //private url_post = 'https://gestionalecero.it/gest_2022/post.php';
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



  public getFattureList() {
    return this.httpClient.get<Fattura[]>(this.url + 'listFatture&anno='+this.anno_globale)
      .pipe(
        catchError(this.handleError)
      )
  }
  public deleteFattura(id_fattura) {
    return this.httpClient.get(this.url + 'deleteFattura&id=' + id_fattura, this.httpOptions)
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

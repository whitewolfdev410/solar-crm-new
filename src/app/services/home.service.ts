import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Bolle } from './../models/bolle.model';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  private url = 'https://gestionalecero.it/gest_2022/home.php?request=';
  private url_post = 'https://gestionalecero.it/gest_2022/home_post.php';
  //private url_post = 'https://gestionalecero.it/gest_2022/post.php';
  array_info: any;
  array_chiamata: any;
  request: any;
  array_operatore: any;
  delete: any;
  tipi: string[] = ['azienda', 'privato'];


  constructor(private httpClient: HttpClient, public fb: UntypedFormBuilder,) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  public listaRichiamare(id_operatore) {
    return this.httpClient.get<Contact[]>(this.url + 'listaRichiamare&id_operatore=' + id_operatore)
      .pipe(
        catchError(this.handleError)
      )
  }
  public listaCampioni(id_operatore) {
    return this.httpClient.get<Contact[]>(this.url + 'listaCampioni&id_operatore=' + id_operatore)
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

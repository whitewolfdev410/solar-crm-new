import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Bolle } from './../models/bolle.model';

@Injectable({
  providedIn: 'root'
})
export class BolleService {


  private url = 'https://gestionalecero.it/gest_2022/bolle.php?request=';
  private url_post = 'https://gestionalecero.it/gest_2022/bolle_post.php';
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


  public getBolleDett(user_id) {
    return this.httpClient.get<Bolle[]>(this.url + 'ListaBolleDettaglio&id=' + user_id)
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

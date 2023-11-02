import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { chiamata } from './../models/chiamata.model';

@Injectable({
  providedIn: 'root'
})
export class MarketingService {


  private url = 'https://gestionalecero.it/gest_2022/marketing.php?request=';
  //private url_post = 'https://gestionalecero.it/gest_2022/bolle_post.php';
  //private url_post = 'https://gestionalecero.it/gest_2022/post.php';
  array_info: any;
  array_chiamata: any;
  request: any;
  array_operatore: any;
  delete: any;
  tipi: string[] = ['azienda', 'privato'];
  anno_globale = localStorage.getItem("anno_globale");

  constructor(private httpClient: HttpClient, public fb: UntypedFormBuilder,) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  public load_chiamate() {
    return this.httpClient.get<chiamata[]>(this.url + 'LoadChiamate')
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

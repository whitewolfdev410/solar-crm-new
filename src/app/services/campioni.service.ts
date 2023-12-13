import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Campioni } from './../models/campioni.model';
import { GlobalComponent } from '../global-component';


@Injectable({
  providedIn: 'root'
})
export class CampioniService {


  private url = GlobalComponent.url_global +'/campione.php?request=';
  private url_post = GlobalComponent.url_global +'/campione_post.php';
  //private url_post = GlobalComponent.url_global +'/post.php';
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


  public getCampioniList() {
    return this.httpClient.get<Campioni[]>(this.url + 'ListaCampioni')
      .pipe(
        catchError(this.handleError)
      )
  }
  public setSpedizione(id) {
    return this.httpClient.get<Campioni[]>(this.url + 'setSpedizione&id='+id)
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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { Preventivo } from './../models/preventivo.model';

@Injectable({
  providedIn: 'root'
})
export class PreventiviService {


  private url = 'https://gestionalecero.it/gest_2022/preventivo.php?request=';
  private url_post = 'https://gestionalecero.it/gest_2022/post.php';
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



  public getPreventiviList(user_id, type) {
    return this.httpClient.get<Preventivo[]>(this.url + 'listPreventivi&id=' + user_id + '&type=' + type+'&anno='+this.anno_globale)
      .pipe(
        catchError(this.handleError)
      )
  }
  public getLastCall(user_id) {
    return this.httpClient.get(this.url + 'lastCall&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public deleteOfferta(user_id) {
    return this.httpClient.get(this.url + 'deleteOfferta&id=' + user_id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public getPreventivi() {
    return this.httpClient.get<Preventivo[]>(this.url + 'Preventivi&anno='+this.anno_globale)
      .pipe(
        catchError(this.handleError)
      )
  }
  public getPreventiviDev() {
    return this.httpClient.get<Preventivo[]>(this.url + 'PreventiviDev&anno='+this.anno_globale)
      .pipe(
        catchError(this.handleError)
      )
  }
  public getPreventiviListHot(user_id) {
    return this.httpClient.get<Preventivo[]>(this.url + 'listPreventiviHot&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public getPreventiviDettContact(user_id, assegnabile, id_operatore) {
    return this.httpClient.get<Preventivo[]>(this.url + 'listPreventiviDettContact&id=' + user_id + '&assegnabile=' + assegnabile + '&id_operatore=' + id_operatore)
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

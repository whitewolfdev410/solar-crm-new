import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { Contact } from '../models/contact.model';
import { Spedizione } from './../models/spedizione.model';
import { GlobalComponent } from '../global-component';


@Injectable({
  providedIn: 'root'
})
export class SpedizioneService {


  private url = GlobalComponent.url_global +'/spedizione.php?request=';
  private url_post = GlobalComponent.url_global +'/spedizione_post.php';
  //private url_post = GlobalComponent.url_global +'/post.php';
  array_spedizonefield: any;
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


  public getDatiSpedizioneDettaglio(user_id) {
    return this.httpClient.get<Spedizione[]>(this.url + 'DatiSpedizioneDettaglio&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateSpedizioneField(field,value,id): Observable<Spedizione> {
    this.array_spedizonefield = {
      request: 'updateSpedizioneField',
      id_spedizione: id,
      field: field,
      value: value,
    };
    return this.httpClient.post<Spedizione>(this.url_post, JSON.stringify(this.array_spedizonefield), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    
  }

  public AddDatiSpedizione(dati): Observable<Spedizione> {
    return this.httpClient.post<Spedizione>(this.url_post, dati, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public updateSpedizione(){

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

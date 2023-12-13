import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Calendario } from './../models/calendario.model';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { GlobalComponent } from '../global-component';

@Injectable({

  providedIn: 'root'

})


export class CalendarioService {


  private urls = (GlobalComponent.url_global +'/calendario.php?request=');
  private url_post = (GlobalComponent.url_global +'/calendario-post.php');

  constructor(private httpClient: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getEventi(id_utente,interesse,psw) {
    return this.httpClient.get<Calendario[]>(this.urls+'getEventi&id_utente='+id_utente+'&interesse='+interesse+'&psw='+psw);
  }
  public inserisciNuovo(id_utente) {
    return this.httpClient.get<Calendario[]>(this.urls+'inserisciNuovo&id_utente='+id_utente);

  }
  public getOre(anno,mese,giorno,interesse) {
    return this.httpClient.get<Calendario[]>(this.urls+'getOre&anno='+anno+'&mese='+mese+'&giorno='+giorno+'&interesse='+interesse);
  }
  public insertApp(data): Observable<Calendario> {
    return this.httpClient.post<Calendario>(this.url_post, JSON.stringify(data), this.httpOptions)
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

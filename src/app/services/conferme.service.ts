import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { Conferma } from './../models/conferma.model';

@Injectable({
  providedIn: 'root'
})
export class ConfermeService {


  private url = 'https://gestionalecero.it/gest_2022/conferma.php?request=';
  private url_post = 'https://gestionalecero.it/gest_2022/conferma_post.php';
  array_nota: any;
  array_chiamata: any;
  request: any;
  array_operatore: any;
  delete: any;

  constructor(private httpClient: HttpClient, public fb: UntypedFormBuilder,) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }



  public getConfermeList(user_id,assegnabile,id_operatore) {
    return this.httpClient.get<Conferma[]>(this.url + 'listConferme&id=' + user_id+'&assegnabile='+assegnabile+'&id_operatore='+id_operatore)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getConfermeListAllegati(user_id,id_preventivo) {
    return this.httpClient.get<Conferma[]>(this.url + 'listAllegatiConferme&id=' + user_id+'&id_preventivo='+id_preventivo)
      .pipe(
        catchError(this.handleError)
      )
  }

 
    public updateNota(note): Observable<Conferma> {
      note.request = 'aggiornaNota';
      //console.log(JSON.stringify(note));
      return this.httpClient.post<Conferma>(this.url_post, JSON.stringify(note), this.httpOptions)
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

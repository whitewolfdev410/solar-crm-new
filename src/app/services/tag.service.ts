import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Tags } from './../models/tag.model';

@Injectable({
  providedIn: 'root'
})
export class TagsService {


  private url = 'https://gestionalecero.it/gest_2022/tag.php?request=';
  private url_post = 'https://gestionalecero.it/gest_2022/tag_post.php';
  //private url_post = 'https://gestionalecero.it/gest_2022/post.php';
  array_info: any;
  array_tags: any;
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
  public getTagsList(user_id) {
    return this.httpClient.get<Tags[]>(this.url + 'ListaTags&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getTagsDett(user_id) {
    return this.httpClient.get<Tags[]>(this.url + 'ListaTagsDettaglio&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateTagsDett(id,id_utente): Observable<Tags> {

    this.array_tags = {
      request: 'updateTagsDett',
      id: id,
      user_id: id_utente,
    };

    return this.httpClient.post<Tags>(this.url_post, JSON.stringify(this.array_tags), this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
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

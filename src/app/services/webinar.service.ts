
import { Webinars } from '../models/webinar.model';
import { Menu } from '../models/menu.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

@Injectable({

  providedIn: 'root'

})


export class Webinar {


  private urls = ('https://gestionalecero.it/gest_2022/webinar.php?request=');
  //private urls_idraulici = ('https://gestionalecero.it/gest_2022/index.php?request=idraulici&id=');
  private url_post = ('https://gestionalecero.it/gest_2022/webinar_post.php');

  array_ruolo:any;
  id_ruolo:any=localStorage.getItem("id_ruolo");
  constructor(private httpClient: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  
  public addWebinar(data): Observable<Webinar> {
    console.log(data['link']);
    data.request = 'addWebinar';
    //console.log(JSON.stringify(note));
    return this.httpClient.post<Webinar>(this.url_post, JSON.stringify(data), this.httpOptions)
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

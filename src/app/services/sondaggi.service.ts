
import { User } from '../models/amministratore.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from './../models/contact.model';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { GlobalComponent } from '../global-component';

@Injectable({

  providedIn: 'root'

})


export class Sondaggi {


  private urls = (GlobalComponent.url_global +'/sondaggio.php?request=');
  private url_post = (GlobalComponent.url_global +'/sondaggio_post.php');

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
  public loadsondaggi(id) {
    return this.httpClient.get(this.urls+'loadsondaggi&id='+id)
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

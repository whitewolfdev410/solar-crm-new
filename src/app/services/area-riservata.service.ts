
import { User } from '../models/amministratore.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from './../models/contact.model';
import { Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
@Injectable({

  providedIn: 'root'

})


export class AreariservataService {


  private urls = ('https://gestionalecero.it/gest_2022/area-riservata.php?request=');
  private url_post = ('https://gestionalecero.it/gest_2022/area-riservata_post.php');

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public checkLogin(id,username,password) {
    
    return this.httpClient.get(this.urls+'checklogin&id='+id+'&username='+username+'&password='+password);

  }
  public checkSondaggio(id) {
    console.log(id);
    return this.httpClient.get(this.urls+'checksondaggio&id='+id);

  }
  public getStatoInvioMail(id) {
    return this.httpClient.get(this.urls+'getStatoInvioMail&id='+id);
  }

  public changeStatoInvioMail(id) {
    return this.httpClient.get(this.urls+'changeStatoInvioMail&id='+id);

  }
  public insertSondaggio(dati) {
    return this.httpClient.post(this.url_post, dati, this.httpOptions)
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

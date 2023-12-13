
import { Partner } from '../models/dati-partner.model';
import { Menu } from '../models/menu.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { GlobalComponent } from '../global-component';


@Injectable({

  providedIn: 'root'

})


export class DatiPartner {


  private urls = (GlobalComponent.url_global +'/partner.php?request=');
  //private urls_idraulici = (GlobalComponent.url_global +'/index.php?request=idraulici&id=');
  private url_post = (GlobalComponent.url_global +'/partner_post.php');

  array_ruolo:any;
  id_ruolo:any=localStorage.getItem("id_ruolo");
  constructor(private httpClient: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getDatiPartner(id) {
    return this.httpClient.get<Partner[]>(this.urls + 'getDatiPartner&id_partner='+id);

  }
  public getLogo(id) {
    return this.httpClient.get(this.urls + 'getLogo&id_partner='+id);

  }
  public updateDatiPartner(dati): Observable<Partner> {
    return this.httpClient.post<Partner>(this.url_post, dati, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }
  public deleteLogo(id: number) {
    return this.httpClient.get(this.urls + 'deleteLogo&id_logo=' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public addDatiPartner(dati): Observable<Partner> {
    return this.httpClient.post<Partner>(this.url_post, dati, this.httpOptions)
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

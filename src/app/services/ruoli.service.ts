
import { Ruolo } from '../models/ruolo.model';
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


export class Ruoli {


  private urls = (GlobalComponent.url_global +'/ruoli.php?request=');
  //private urls_idraulici = (GlobalComponent.url_global +'/index.php?request=idraulici&id=');
  private url_post = (GlobalComponent.url_global +'/ruoli_post.php');

  array_ruolo:any;
  id_ruolo:any=localStorage.getItem("id_ruolo");
  constructor(private httpClient: HttpClient) { }
  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getRuoli() {
    return this.httpClient.get<Ruolo[]>(this.urls + 'ruoli');

  }
  public getRuoliEdit(id_menu) {
    return this.httpClient.get<Ruolo[]>(this.urls + 'ruoliedit&id_menu='+id_menu);

  }
  public getPagine() {
    return this.httpClient.get(this.urls + 'pagine');

  }
  public getMenuItems() {
    return this.httpClient.get(this.urls + 'menuItems&id_ruolo='+this.id_ruolo);

  }
  public getMenuItem(id_menu) {
    return this.httpClient.get(this.urls + 'menuItem&id_menu='+id_menu);

  }
  public getRuoliMenu(id_menu) {
    return this.httpClient.get(this.urls + 'ruolimenu&id_menu='+id_menu);

  }
  public updateRuolo(id_ruolo,value) {
    return this.httpClient.get(this.urls + 'updateRuolo&id_ruolo='+id_ruolo+'&value='+value);

  }
  
  public addRuolo(nome): Observable<Ruolo> {
    this.array_ruolo = {
      request: 'addRuolo',
      nome: nome,
    };
    return this.httpClient.post<Ruolo>(this.url_post, JSON.stringify(this.array_ruolo), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
    
  }
  public addMenu(data): Observable<Menu> {
    console.log(data['link']);
    data.request = 'addMenuItems';
    //console.log(JSON.stringify(note));
    return this.httpClient.post<Menu>(this.url_post, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      ); 
    
  }
  public editMenu(data): Observable<Menu> {
    console.log(data['link']);
    data.request = 'editMenuItems';
    //console.log(JSON.stringify(note));
    return this.httpClient.post<Menu>(this.url_post, JSON.stringify(data), this.httpOptions)
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

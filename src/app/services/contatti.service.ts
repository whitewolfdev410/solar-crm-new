import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, EventEmitter } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { BehaviorSubject, catchError, Observable, retry, throwError } from 'rxjs';
import { Subscription } from 'rxjs/internal/Subscription';
import { Contact } from './../models/contact.model';
import { infoAgg } from './../models/infoagg.model';
import { doubleCont } from './../models/doublecontatto.model';
import { chiamate } from './../models/chiamate.model';
import { chiamata } from './../models/chiamata.model';
import { allegati } from './../models/allegati.model';
import { appunto } from './../models/appunto.model';

@Injectable({
  providedIn: 'root'
})
export class ContattiService {


  private url = 'https://gestionalecero.it/gest_2022/index.php?request=';
  private url_post = 'https://gestionalecero.it/gest_2022/post.php';
  //private url_post = 'https://gestionalecero.it/gest_2022/post.php';
  array_info: any;
  array_chiamata: any;
  array_appunto: any;
  request: any;
  array_operatore: any;
  array_idraulico: any;
  array_datalavori: any;
  delete: any;
  public operatore = new BehaviorSubject(null);

  constructor(private httpClient: HttpClient, public fb: UntypedFormBuilder,) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  public getContatto(id) {
    return this.httpClient.get(this.url + 'contatto&id=' + id);

  }
  public getContattiList(type,operatore,id_ruolo,assegnabile) {
    return this.httpClient.get<Contact[]>(this.url + 'contacts&type=' + type + '&operatore=' + operatore + '&id_ruolo=' +id_ruolo + '&assegnabile=' + assegnabile);

  }
  public setNonLetto(id) {
    return this.httpClient.get(this.url + 'setnonletto&id=' + id);

  }
  public contattoDouble(id) {
    return this.httpClient.get(this.url + 'contattodouble&id=' + id);
  }

  public updateAnagraficaContatto(id, contatto): Observable<Contact> {
    return this.httpClient.post<Contact>(this.url_post, JSON.stringify(contatto), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateInfoAggiuntive(user_id, text): Observable<infoAgg> {
    this.array_info = {
      request: 'aggiornainfo',
      id: '',
      user_id: user_id,
      info: text,
      data_creazione: new Date()
    };
    //console.log(JSON.stringify(this.array_info));
    return this.httpClient.post<infoAgg>(this.url_post, JSON.stringify(this.array_info), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public updateOperatore(user_id, id) {
    this.array_operatore = {
      request: 'aggiornaOperatore',
      user_id: user_id,
      richiama_chi: id,
    };
    return this.httpClient.post<Contact>(this.url_post, JSON.stringify(this.array_operatore), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )


  }
  public updateIdraulico(user_id, id) {
    this.array_idraulico = {
      request: 'aggiornaIdraulico',
      user_id: user_id,
      id_idraulico: id,
    };
    return this.httpClient.post<Contact>(this.url_post, JSON.stringify(this.array_idraulico), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )


  }
  public saveDateLavori(user_id, datelavori,valutazione) {

     this.array_datalavori = {
      request: 'aggiornaDataLavori',
      valutazione:valutazione,
      user_id: user_id,
      datalavori: datelavori
    };
    //console.log(this.array_datalavori);
    return this.httpClient.post<Contact>(this.url_post, JSON.stringify(this.array_datalavori), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )


  }

  public addInfoAggiuntive(user_id, text): Observable<infoAgg> {
    this.array_info = {
      request: 'aggiungiInfo',
      id: '',
      user_id: user_id,
      info: text,
      data_creazione: new Date()
    };
    //console.log(JSON.stringify(this.array_info));
    return this.httpClient.post<infoAgg>(this.url_post, JSON.stringify(this.array_info), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getInfoAggiuntive(user_id): Observable<infoAgg> {
    return this.httpClient.get<infoAgg>(this.url + 'listInfoAgg&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getDoubleData(user_id): Observable<doubleCont> {
    return this.httpClient.get<doubleCont>(this.url + 'listDoubleData&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getChiamateList(user_id) {
    return this.httpClient.get<chiamate[]>(this.url + 'listChiamate&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public checkChiamateAperte(user_id){
    return this.httpClient.get<chiamate[]>(this.url + 'checkChiamateAperte&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public loadAppunti(user_id) {
    return this.httpClient.get(this.url + 'loadAppunti&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public addAppunto(user_id, operatore, text): Observable<appunto> {
    this.array_appunto = {
      request: 'aggiungiAppunto',
      id: '',
      user_id: user_id,
      note: text,
      data_appunto: new Date(),
      operatore: operatore
    };
    
    this.operatore.next(localStorage.getItem("id"));
    return this.httpClient.post<appunto>(this.url_post, JSON.stringify(this.array_appunto), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateAppunto(appunti): Observable<appunto> {
    //console.log(chiamate);
    appunti.request = 'aggiornaAppunto';
    //console.log(JSON.stringify(chiamate));
    return this.httpClient.post<appunto>(this.url_post, JSON.stringify(appunti), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public deleteAppunto(id: number) {
    return this.httpClient.get(this.url + 'deleteAppunto&id=' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public addChiamata(user_id,id_chiamata, operatore, text): Observable<chiamata> {
    this.array_chiamata = {
      request: 'aggiungiChiamata',
      id: '',
      user_id: user_id,
      id_chiamata:id_chiamata,
      note: text,
      data_chiamata: new Date(),
      operatore: operatore
    };
    console.log(JSON.stringify(this.array_chiamata));
    return this.httpClient.post<chiamata>(this.url_post, JSON.stringify(this.array_chiamata), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public stopChiamata(user_id,id_chiamata, operatore, text): Observable<chiamata> {
    this.array_chiamata = {
      request: 'stopChiamata',
      id: '',
      user_id: user_id,
      id_chiamata:id_chiamata,
      note: text,
      data_chiamata: new Date(),
      operatore: operatore
    };
    console.log(JSON.stringify(this.array_chiamata));
    return this.httpClient.post<chiamata>(this.url_post, JSON.stringify(this.array_chiamata), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public startChiamata(user_id, operatore,tipo): Observable<chiamata> {
    this.array_chiamata = {
      request: 'startChiamata',
      id: '',
      user_id: user_id,
      data_chiamata: new Date(),
      tipo:tipo,
      operatore: operatore
    };
    //console.log(JSON.stringify(this.array_chiamata));
    return this.httpClient.post<chiamata>(this.url_post, JSON.stringify(this.array_chiamata), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public deleteChiamata(id: number) {
    return this.httpClient.get(this.url + 'deleteChiamata&id=' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateChiamata(chiamate): Observable<chiamate> {
    //console.log(chiamate);
    chiamate.request = 'aggiornaChiamata';
    //console.log(JSON.stringify(chiamate));
    return this.httpClient.post<chiamate>(this.url_post, JSON.stringify(chiamate), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public loadTipologieChiamata(){
    return this.httpClient.get<allegati[]>(this.url + 'loadTipologieChiamata')
    .pipe(
      catchError(this.handleError)
    )
  }
  public getAllegatiList(user_id) {
    return this.httpClient.get<allegati[]>(this.url + 'listAllegati&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public loadNotifiche(operatore) {
    return this.httpClient.get<allegati[]>(this.url + 'loadNotifiche&operatore=' + operatore)
      .pipe(
        catchError(this.handleError)
      )
  }
  public deleteAllegato(id: number, user_id: number) {
    return this.httpClient.get(this.url + 'deleteAllegato&id=' + id+'&user_id='+user_id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  public getSearchContact(term,ruolo,operatore,assegnabile) {
    return this.httpClient.get<Contact[]>(this.url + 'ricerca&term=' + term + '&ruolo=' +ruolo+'&operatore='+operatore+'&assegnabile='+assegnabile)
      .pipe(
        catchError(this.handleError)
      )
  }
  public getAppuntamentoDett(user_id: number) {
    return this.httpClient.get<Contact[]>(this.url + 'getAppDett&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public checkImpianto(user_id) {
    return this.httpClient.get(this.url + 'checkImpianto&id=' + user_id)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateVisibilityDett(user_id: number,value:boolean) {
    return this.httpClient.get<Contact[]>(this.url + 'updateVisibilityDett&id=' + user_id+'&value='+value)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateNnRisponde(user_id: number,value:boolean,operatore) {
    console.log(operatore);
    return this.httpClient.get<Contact[]>(this.url + 'updateNnRispondeDett&id=' + user_id+'&value='+value+'&operatore='+operatore)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateMessaggioWA(user_id: number,value:boolean,operatore) {
    return this.httpClient.get<Contact[]>(this.url + 'updateMessaggioWADett&id=' + user_id+'&value='+value+'&operatore='+operatore)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateEmail(user_id: number,value:boolean,operatore) {
    return this.httpClient.get<Contact[]>(this.url + 'updateEmailDett&id=' + user_id+'&value='+value+'&operatore='+operatore)
      .pipe(
        catchError(this.handleError)
      )
  }
  public updateContattoErrato(user_id: number,value:boolean,operatore) {
    return this.httpClient.get<Contact[]>(this.url + 'updateContattoErratoDett&id=' + user_id+'&value='+value+'&operatore='+operatore)
      .pipe(
        catchError(this.handleError)
      )
  }
  public checkCell(data): Observable<Contact> {
    return this.httpClient.post<Contact>(this.url_post, JSON.stringify(data), this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public deleteAppAreaRiservata(id: number) {
    return this.httpClient.get(this.url + 'deleteAppAreaRiservata&id=' + id, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  public insertValutazione(data): Observable<Contact> {
    //data.request = 'insertvalutazione';
    //console.log(JSON.stringify(chiamate));
    return this.httpClient.post<Contact>(this.url_post, JSON.stringify(data), this.httpOptions)
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

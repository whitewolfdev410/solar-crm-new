import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { GlobalComponent } from '../global-component';
import { HttpApiResponse } from '../models/httpApiResponse.model';
import { Listino } from '../models/listino.model';
import { handleError } from './common';

@Injectable({
  providedIn: 'root'
})
export class OffertaService {
  constructor(private httpClient: HttpClient) {

  }

  public get(id: number) {
    const user_id = localStorage.getItem("id");
    return this.httpClient.get<HttpApiResponse>(GlobalComponent.global_api_url + `?action=get-listino&id=${id}&user_id=${user_id}`)
      .pipe(
        catchError(handleError)
      )
  }

  public getModels(id: number[]) {
    //  return this.httpClient.post<any[]>('https://gestionalecero.it/api/nuova_offerta_da_modello.php', { modello: id })
    return this.httpClient.post<any[]>('http://localhost/b/nuova_offerta_da_modello.php', { modello: id })
      .pipe(
        catchError(handleError)
      )
  }

  public getProductsByName(term: string, partner: any) {
    let partnerId = ""
    if (partner)
      partnerId = partner.id
    return this.httpClient.post<any[]>('https://gestionalecero.it/api/offerta.php', { "action": "product", "name": term, "partnerId": partnerId })
      .pipe(
        catchError(handleError)
      )
  }

  public getDocNumber() {
    return this.httpClient.post<any>('https://gestionalecero.it/api/offerta.php', { "action": "number", "assegnabile": "0", "id_operatore": '0' })
  }

  public save(request: any) {
    return this.httpClient.post<HttpApiResponse>('https://gestionalecero.it/api/offerta.php', { action: 'save', data: request })
      .pipe(
        catchError(handleError)
      )
  }

  public getMaterials() {
    // "SELECT * FROM tipo_materiali ORDER BY ordine ASC, nome ASC "
    return this.httpClient.post<HttpApiResponse>('https://gestionalecero.it/api/offerta.php', { action: 'materials' })
      .pipe(
        catchError(handleError)
      )
  }

  public allPartner(assegnabile: string) {

    if (parseInt(assegnabile) > 0) {
      return this.httpClient.get<HttpApiResponse>('https://gestionalecero.it/api/api.php' + `?action=all&table=dati_partner`)
        .pipe(
          catchError(handleError)
        )
    } else {
      return this.httpClient.get<HttpApiResponse>('https://gestionalecero.it/api/api.php' + `?action=all&table=azienda`)
        .pipe(
          catchError(handleError)
        )
    }
  }

  public allUsersPaged(filter = '', offset = 0, limit = 20) {
    let filterString = ''
    if (filter) {
      if (typeof (filter) == 'object' && filter) {
        filter = filter['nome']
      }
      else
        filter = filter.toLocaleLowerCase()
      filterString = ` AND LOWER(CONCAT(nome, cognome)) LIKE '%${filter}%' OR id=${filter}`

    }
    const request = {
      "action": "all-paged",
      "table": "utenti",
      "where": "(richiama='on' or ordinato='on')",
      "filter": filterString,
      "offset": offset,
      "limit": limit
    }
    // 'https://gestionalecero.it/api/offerta.php'
    return this.httpClient.post<HttpApiResponse>('https://gestionalecero.it/api/offerta.php', request)
  }

  public allModels() {
    return this.httpClient.get<HttpApiResponse>('https://gestionalecero.it/api/api.php' + `?action=all&table=modello_offerta&orderBy=nome_offerta ASC`)
      .pipe(
        catchError(handleError)
      )
  }

  public all() {
    const user_id = localStorage.getItem("id");
    return this.httpClient.get<HttpApiResponse>(GlobalComponent.global_api_url + `?action=all-listino&user_id=${user_id}`)
      .pipe(
        catchError(handleError)
      )
  }

  public create(data: Listino) {
    const user_id = localStorage.getItem("id");
    data.user_id = parseInt(user_id)
    return this.httpClient.post<HttpApiResponse>(GlobalComponent.global_api_url + `?action=add-listino`, data)
      .pipe(
        catchError(handleError)
      )
  }
  public update(data: Listino) {
    return this.httpClient.post<HttpApiResponse>(GlobalComponent.global_api_url + `?action=update&table=listino_installatori`, data)
      .pipe(
        catchError(handleError)
      )
  }
  public delete(data: Listino) {
    return this.httpClient.delete<HttpApiResponse>(GlobalComponent.global_api_url + `?action=delete&id=${data.id}&table=listino_installatori`)
      .pipe(
        catchError(handleError)
      )
  }

}

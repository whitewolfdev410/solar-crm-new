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
export class ListinoService {

  constructor(private httpClient: HttpClient) {

  }

  public get(id: number) {
    const user_id = localStorage.getItem("id");
    return this.httpClient.get<HttpApiResponse>(GlobalComponent.global_api_url + `?action=get-listino&id=${id}&user_id=${user_id}`)
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
    // &user_id=${user_id}
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

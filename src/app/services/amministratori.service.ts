
import { User } from '../models/amministratore.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({

  providedIn: 'root'

})


export class AmministratoriService {


  private urls = ('https://gestionalecero.it/gest_2022/index.php?request=users&id=');
  private urls_idraulici = ('https://gestionalecero.it/gest_2022/index.php?request=idraulici&id=');
  private url = ('https://gestionalecero.it/gest_2022/index.php?request=user&id=');

  constructor(private httpClient: HttpClient) { }

  public getAmministratori() {
    return this.httpClient.get<User[]>(this.urls);

  }
  public getIdraulici() {
    return this.httpClient.get<User[]>(this.urls_idraulici);

  }
  public getAmministratoreChiamata(id) {
    return this.httpClient.get<User[]>(this.url+id);

  }
}

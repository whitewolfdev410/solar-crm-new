
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/amministratore.model';
import { GlobalComponent } from '../global-component';
@Injectable({

  providedIn: 'root'

})


export class AmministratoriService {

  global_cartella = GlobalComponent.global_cartella;


  private urls = (GlobalComponent.url_global +'/index.php?request=users&id=');
  private urls_idraulici = (GlobalComponent.url_global +'/index.php?request=idraulici&id=');
  private url = (GlobalComponent.url_global +'/index.php?request=user&id=');

  constructor(private httpClient: HttpClient) { }

  public getAmministratori() {
    return this.httpClient.get<User[]>(this.urls);

  }
  public getIdraulici() {
    return this.httpClient.get<User[]>(this.urls_idraulici);
  }

  public getAmministratoreChiamata(id) {
    return this.httpClient.get<User[]>(this.url + id);

  }
}

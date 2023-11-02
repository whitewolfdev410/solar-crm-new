
import { Province } from './../models/province.model';
import { HttpClient } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable({

  providedIn: 'root'

})


export class ProvinceService {

  private url = 'https://gestionalecero.it/gest_2022/index.php?request=';

  constructor(private httpClient: HttpClient) { }

  public getProvince() {
    return this.httpClient.get<Province[]>(this.url+'province');

  }
  public getStati() {
    return this.httpClient.get(this.url+'stati');

  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/amministratore.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(private http: HttpClient) { }
  private baseUrl = 'https://gestionalecero.it/gest_2022/';
 login(loginData):Observable<User> {
   return this.http.post<User>(this.baseUrl+'session.php',loginData);
 }
}

import { isDevMode } from "@angular/core";

export class GlobalComponent {

  isDev = isDevMode()
  static dev: boolean = isDevMode() ? true : false;
  static admin: number = 1;
  // 1 loggato come amministratore
  // 2 loggato come idraulico
  // 3 loggato come commerciale
  // 16 loggato come Dev
  //  static url_global: string = GlobalComponent.url_global +'';
 
  static global_cartella: string = 'staging'
  //static global_cartella: string = 'gest_2022'
//  static baseUrl = 'https://gestionalecero.it/'+global_cartella
  static baseUrl = 'https://staging.gestionalecero.it/'
  static url_global: string = this.baseUrl
  static key_ruolo: any = localStorage.getItem("id_ruolo");
  static global_api_url: string = this.baseUrl + 'api/api.php'

}
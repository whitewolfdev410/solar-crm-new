import { isDevMode } from "@angular/core";

export class GlobalComponent {

  isDev = isDevMode()
  static dev: boolean = isDevMode() ? true : false;
  static admin: number = 1;
  // 1 loggato come amministratore
  // 2 loggato come idraulico
  // 3 loggato come commerciale
  // 16 loggato come Dev
  //  static url_global: string = 'https://gestionalecero.it/gest_2022';
  static url_global: string = isDevMode() ? 'http://localhost:4200' : 'https://gestionalecero.it/gest_2022';
  static key_ruolo: any = localStorage.getItem("id_ruolo");
  static global_api_url: string = 'https://gestionalecero.it/api/api.php'

}
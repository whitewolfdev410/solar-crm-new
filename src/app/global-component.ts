export class GlobalComponent {


  static dev: boolean = true;
  static admin: number = 1;
  // 1 loggato come amministratore
  // 2 loggato come idraulico
  // 3 loggato come commerciale
  //static url_global:string='https://gestionalecero.it/gest_2022';
  static url_global: string = 'http://localhost:4200';
  static key_ruolo: any = localStorage.getItem("id_ruolo");

}
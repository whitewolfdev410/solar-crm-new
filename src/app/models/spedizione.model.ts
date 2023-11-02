import { AppRoutingModule } from "../app-routing.module";

export class Spedizione {
  id: number;
  id_utente: number;
  destinatario: string;
  riferimento: string;
  indirizzo: string;
  provincia: string;
  cap: string;
  localita: string;
  nazione: string;
  telefono:number;
  orario_consegna:string;
  muletto:string;
  preavviso:string;
  id_dettaglio:number;

}

export class Conferma {
  id: number;
  data_conferma: Date;
  numero_conferma: Number;
  id_cliente: number;
  imponibile: number;
  iva_totale: number;
  totale_offerta: number;
  pagato:string;
  data_pagamento:Date;
  id_banca:number;
  iva_gen:number;
  iva_gen_stato:string;
  sconto_gen:number;
  mostra_prezzo_gen:string;
  trasporto:number;
  confermata:number;
  totale_merci:number;
  id_offerta:number;
  id_tipologia_materiale:number;
  id_tipologia_incentivo:number;
  tipo_incentivo:number;
  dichiarazione_iva:number;
  id_azienda:number
  id_spedizione:number;
  id_spedizione_stato:string;
  fatturazione_stato:string;
  stato:string;
  stato_allegati_dichiarazione:string;
  stato_allegati_identita:string;
  stato_allegati_privacy:string;
  note:string;
  ts:Date;
  on_off:number;
  non_ordinato:number;
}

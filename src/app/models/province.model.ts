export class Province {

  constructor(id_province: number, nome_province: string, sigla_province: string, regione_province: string) {
    this.id_province = id_province;
    this.nome_province = nome_province;
    this.sigla_province = sigla_province;
    this.regione_province = regione_province;
  }

  id_province: number;
  nome_province: string;
  sigla_province: string;
  regione_province: string;
}

import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FatturazioneService } from '../services/fatturazione.service';
import { UntypedFormBuilder, UntypedFormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ProvinceService } from '../services/province.service';


@Component({
  selector: 'app-fatturazione',
  templateUrl: './fatturazione.component.html',
  styleUrls: ['./fatturazione.component.css']
})
export class FatturazioneComponent implements OnInit {
  @Input() user: any;
  dati: any;
  datiFatturazione: UntypedFormGroup;
  datiFatturazioneAdd: UntypedFormGroup;
  tipoCliente: string;
  tipo: string='privato';
  province: any;
  stati: any;
  fatture:any;
  paese: string = 'italia';
  formeditshow: boolean = true;
  dettaglio:boolean=false;
  //formaddshow: boolean = true;
  id_dati: any;
  operatore: any = localStorage.getItem("id");
  id_ruolo: any = localStorage.getItem("id_ruolo");

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private Location: Location, private fatturazione: FatturazioneService, private service: ProvinceService,) {
   //form edit
    this.datiFatturazione = this.fb.group({
      // 'request': ['AddUpdateDatiFatturazione'],
      'request': ['UdateDatiFatturazione'],
      'id': [],
      'id_utente': [],
      'intestatario': [''],
      'nome_pvt': [''],
      'cognome_pvt': [''],
      'tipoCliente': [''],
      'indirizzo': [''],
      'paese': [],
      'provincia': [''],
      'cap': [''],
      'localita': [''],
      'codice_fiscale': [''],
      'partita_iva': [''],
      'numero_sdi': [''],
      'pec_mail': [''],
      'stato': [''],
      'nome_titolare': [''],
      'cognome_titolare': [''],
      'nato_a_titolare': [''],
      'il_titolare': [''],
      'cf_titolare': [''],
      'indirizzo_2': [''],
      'provincia_residenza': [''],
      'cap_2': [''],
      'localita_2': [''],

    });
    //console.log(this.datiFatturazione.value);

    //form add
    this.datiFatturazioneAdd = this.fb.group({
      // 'request': ['AddUpdateDatiFatturazione'],
      'request': ['AddDatiFatturazione'],
      'id': [],
      'id_utente': [],
      'intestatario': [''],
      'nome_pvt': [''],
      'cognome_pvt': [''],
      'tipoCliente': [''],
      'indirizzo': [''],
      'paese': [],
      'provincia': [''],
      'cap': [''],
      'localita': [''],
      'codice_fiscale': [''],
      'partita_iva': [''],
      'numero_sdi': [''],
      'pec_mail': [''],
      'stato': [''],
      'nome_titolare': [''],
      'cognome_titolare': [''],
      'nato_a_titolare': [''],
      'il_titolare': [''],
      'cf_titolare': [''],
      'indirizzo_2': [''],
      'provincia_residenza': [''],
      'cap_2': [''],
      'localita_2': [''],

    });
   // console.log(this.datiFatturazione.value);
  }


  ngOnInit(): void {
    if (this.Location.path() == '/dettaglio-contatto/' + this.user) {
      this.dettaglio = true;
    }
  
  }

  ngAfterViewInit() { 
    this.loadDatiFatturazioneDettaglioContatto();
    this.getProvince();
    this.getStati();
    this. getInvoiceListDett();
   
   }

  public loadDatiFatturazioneDettaglioContatto() {
    this.fatturazione.getDatiFatturazioneDettaglio(this.user)
      .subscribe(response => {
        this.dati = response;

        this.id_dati = this.dati.map(t => t.id);
        //console.log(this.user);
        //console.log('pippo'+this.id_dati);
        if (this.id_dati != '') {
          this.tipoCliente = this.dati.map(t => t.tipo);
          this.paese = this.dati.map(t => t.nazione);
          this.formeditshow = true;
          //this.formaddshow = false;
        }else{
          this.formeditshow = false;
        }

      });


  }

  public updateDatiFatturazione() {
    //console.log(this.datiFatturazione.value);
    this.fatturazione.UpdateDatiFatturazioneDettaglio(JSON.stringify(this.datiFatturazione.value)).subscribe((res: any) => {
      //console.log('Post updated successfully!');
      //this.router.navigateByUrl('post/index');
      this.formeditshow = false;
          //this.formaddshow = true;
      this.loadDatiFatturazioneDettaglioContatto()
    })
  }

  public addDatiFatturazione() {
   // console.log(this.datiFatturazioneAdd.value);
    this.fatturazione.AddDatiFatturazioneDettaglio(JSON.stringify(this.datiFatturazioneAdd.value)).subscribe((res: any) => {
      this.formeditshow = true;
      this.loadDatiFatturazioneDettaglioContatto()
    })
  }

  getInvoiceListDett() {
    this.fatturazione.getInvoicesDett(this.user)
      .subscribe(response => {
        this.fatture = response;
      });
  }

  getProvince() {
    this.service.getProvince()
      .subscribe(response => {
        this.province = response;
      });
  }
  getStati() {
    this.service.getStati()
      .subscribe(response => {
        this.stati = response;
      });
  }
 
  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

}

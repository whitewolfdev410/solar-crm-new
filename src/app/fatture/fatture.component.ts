import { Component, ComponentFactoryResolver, Inject, OnInit } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { DOCUMENT, formatDate } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContattiService } from '../services/contatti.service';
import { ProvinceService } from '../services/province.service';
import { Ruoli } from '../services/ruoli.service';
import { BehaviorSubject, Observable, Subscription, map, startWith } from 'rxjs';
import { FattureService } from '../services/fatture.service';


export interface Cliente {
  nome: string;
  cognome: string;
  id: string;
}
export interface Prodotto {
  name: string;
  id_product: string;
  description: string;
  reference:string;
}

@Component({
  selector: 'app-fatture',
  templateUrl: './fatture.component.html',
  styleUrls: ['./fatture.component.css']
})
export class FattureComponent implements OnInit {
  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
  id_ruolo = GlobalComponent.key_ruolo;
  loading: boolean = false;
  session: any = localStorage.getItem("name");
  operatore: any = localStorage.getItem("id");
  nome_operatore: any = localStorage.getItem("nome");
  cognome_operatore: any = localStorage.getItem("cognome");
  ruolo_operatore: any = localStorage.getItem("ruolo");
  anno_globale = localStorage.getItem("anno_globale");
  id: any;
  paramsSubscription: Subscription;
  conferma_id: any;
  aziende: any
  clienti: any;
  //formNewFattura: UntypedFormGroup;
  filteredClienti: Observable<Cliente[]>;
  clienteCtrl = new FormControl();
  clientiList: Cliente[] = [];
  filteredProdotti: Observable<Prodotto[]>;
  prodotti:any;
  prodottoCtrl = new FormControl();
  prodottiList: Prodotto[] = [];
  id_cliente: any;
  ricercacliente: boolean = true;
  dati_fatturazione: any;
  tipi_documento: any;
  id_azienda: any = 3;
  numero_fattura: any;
  date = new Date();
  datea = formatDate(Date.now(), 'yyyy-MM-dd', 'it-IT');

  data = [];
  dataSource = new BehaviorSubject<AbstractControl[]>([]);
  displayColumns = ['action','n_riga','id_prodotto','prodotto', 'descrizione'];
  rows: FormArray = this.fb.array([]);
  formNewFattura: FormGroup 


  constructor(public http: HttpClient, private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private fatture: FattureService) {

    this.formNewFattura = this.fb.group({
      'request': ['updateContact', Validators.required],
      'azienda': ['3', Validators.required],
      'cliente': ['', Validators.required],
      'tipo_documento': ['1', Validators.required],
      'numero_fattura': ['', Validators.required],
      'data_fattura': [this.date, ''],
      'prodotti': this.rows,
    });

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.conferma_id = this.id;
      this.LoadAzienda();
      this.LoadCliente();
      this.LoadTipoDocumento();
      this.numero_fattura = 256;
      this.LoadNumeroFattura();
      this.LoadProdotti();
    });
    this.filteredClienti = this.clienteCtrl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(nome => (nome ? this._filter(nome) : this.clientiList.slice()))
    );
    this.filteredProdotti = this.prodottoCtrl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(reference => (reference ? this._filterProdotto(reference) : this.prodottiList.slice()))
    );

    this.data.forEach(() => this.addRow());
    this.updateView();

  }

  displayFn(cliente?: Cliente): string | undefined {
    console.log(cliente ? cliente.id : "");

    return cliente ? cliente.nome : undefined;

  }
  returnFn(cliente?: Cliente): string | undefined {
    return cliente ? cliente.id : undefined;
  }

  private _filter(name: string): Cliente[] {
    const filterValue = name.toLowerCase();

    return this.clientiList.filter(
      option => option.nome.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFnProdotto(prodotto?: Prodotto): string | undefined {
    console.log(prodotto ? prodotto.id_product : "");

    return prodotto ? prodotto.reference : undefined;

  }
  returnFnProdotto(prodotto?: Prodotto): string | undefined {
    return prodotto ? prodotto.id_product : undefined;
  }

  private _filterProdotto(reference: string): Prodotto[] {
    const filterValueProd = reference.toLowerCase();
console.log(filterValueProd);
    return this.prodottiList.filter(
      option => option.reference.toLowerCase().indexOf(filterValueProd) === 0
    );
  }

  addRow() {
    const row = this.fb.group({
      id_prodotto: '',
      prodotto: '',
      descrizione:''
    });
    this.rows.push(row);
    this.updateView();
  }

  updateView() {
    this.dataSource.next(this.rows.controls);
  }

  selectedCliente(event) {
    this.ricercacliente = !this.ricercacliente;
    const selectedValue = event.option.value['id'];
    this.id_cliente = selectedValue;
    console.log(selectedValue);
    this.fatture.LoadDatiFatturazione(selectedValue)
      .subscribe(response => {
        this.dati_fatturazione = response;
        console.log(this.dati_fatturazione)
        //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      });
  }
  selectedProdotto(event) {
    const selectedValue = event.option.value['id_product'];
    this.id_cliente = selectedValue;
    console.log(selectedValue);
    /* this.fatture.LoadDatiFatturazione(selectedValue)
      .subscribe(response => {
        this.dati_fatturazione = response;
        console.log(this.dati_fatturazione)
        //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      }); */
  }

  selectedAzienda(event) {
    this.id_azienda = event;
    this.LoadNumeroFattura();
  }
  cambiaCliente() {
    this.ricercacliente = !this.ricercacliente;
  }

  LoadAzienda(): void {
    this.loading = true;
    this.fatture.LoadAzienda()
      .subscribe(response => {
        this.aziende = response;
        console.log(this.aziende);
        this.loading = false;
        //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      });

  }
  LoadTipoDocumento(): void {
    this.loading = true;
    this.fatture.LoadTipoDocumento()
      .subscribe(response => {
        this.tipi_documento = response;
        console.log(this.tipi_documento);
        this.loading = false;
        //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      });

  }
  LoadNumeroFattura(): void {
    this.loading = true;
    this.fatture.LoadNumeroFattura(this.anno_globale, this.id_azienda)
      .subscribe(response => {
        this.numero_fattura = response;
        console.log(this.numero_fattura);
        this.loading = false;
        //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      });

  }
  LoadCliente(): void {
    this.loading = true;
    this.fatture.LoadCliente()
      .subscribe(response => {
        this.clienti = response;
        this.clientiList = this.clienti;
        this.loading = false;
        //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      });

  }
  LoadProdotti(): void {
    this.loading = true;
    this.fatture.LoadProdotti()
      .subscribe(response => {
        this.prodotti = response;
        console.log(this.prodotti);
        this.prodottiList = this.prodotti;
        this.loading = false;
        //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      });

  }

  SaveFattura() {
    console.log(this.formNewFattura.value)
  }
}

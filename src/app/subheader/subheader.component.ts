import { HttpClient } from '@angular/common/http';
import { Component, Injector, Input, NgModuleFactory, OnInit, ViewChild } from '@angular/core';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterEvent, NavigationStart } from '@angular/router';
import { ProvinceService } from '../services/province.service';
import { Location } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ContattiService } from '../services/contatti.service';
import { Contact } from '../models/contact.model';
import { GlobalComponent } from '../global-component';
import { AmministratoriService } from '../services/amministratori.service';



declare var window: any;

@Component({
  selector: 'app-subheader',
  templateUrl: './subheader.component.html',
  styleUrls: ['./subheader.component.css']
})
export class SubheaderComponent implements OnInit {
  
  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
  session: any = localStorage.getItem("name");
  operatore: any = localStorage.getItem("id");
  nome_operatore: any = localStorage.getItem("nome");
  cognome_operatore: any = localStorage.getItem("cognome");
  assegnabile: any = localStorage.getItem("assegnabile");
  formNewContact: any;
  searchResult: any;
  formAddContact: UntypedFormGroup;
  formSearchResult: UntypedFormGroup;
  province: any;
  loading: boolean = false;
  mySubscription: any;
  searchTerm: any;
  termineRicerca: any;
  contacts: Contact[] = new Array();
  dataSourceontatti: any;
  public browserRefresh: boolean;

  displayedColumns: string[] = ['numero', 'action', 'contatto', 'n_contatto', 'interesse', 'richiama_chi', 'telefono', 'provincia', 'data_contatto', 'data_appuntamento'];
  dataSource = new MatTableDataSource<Contact>();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;


  Data: Array<any> = [
    { name: 'Solare termico', value: 'Solare termico' },
    { name: 'Solare fotovoltaico', value: 'Solare fotovoltaico' },
    { name: 'Pompe di calore', value: 'Pompe di calore' },
    { name: 'Riscaldamento a pavimento a secco', value: 'Riscaldamento a pavimento' },
  ];
  loader: any;
  lazyOutlet: any;
  searchtable: boolean = false;
  search: any;
  amministratori: any;
  id_ruolo: any = localStorage.getItem("id_ruolo");

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, public route: ActivatedRoute, public router: Router, private service: ProvinceService, private injector: Injector, private Location: Location, private servicecontatti: ContattiService, private ammservice: AmministratoriService) {
 

    this.formAddContact = fb.group({
      'nome': ['', Validators.required],
      'cognome': ['', Validators.required],
      'email': ['', Validators.required],
      'telefono': ['', Validators.required],
      'provincia': ['', Validators.required],
      'figura_professionale': ['', Validators.required],
      'azienda': [''],
      //'interesse': ['', Validators.required],
      'messaggio': ['', Validators.required],
      'privacy': [true, Validators.requiredTrue],
      'operatore': [this.operatore, Validators.required],
      interesse: this.fb.array([], [Validators.required]),
    });
    //console.log(this.formAddContact);
    //console.log(this.Location.path())

    this.formSearchResult = fb.group({
      'termine': ['', Validators.required],
    });
  }


  ngOnInit(): void {
    this.getProvince();
    this.formNewContact = new window.bootstrap.Modal(
      document.getElementById('newContact')
    );
    this.searchResult = new window.bootstrap.Modal(
      document.getElementById('searchResult')
    );
    this.loadAmministratore()
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

  validateTD(string) {
    if (string) {
      return string;
    }
    let vuoto = 'vuoto';
    return null;
  }


  loadAmministratore() {
    this.ammservice.getAmministratori()

      .subscribe(response => {

        this.amministratori = response;
        //console.log(this.amministratori);
      });
  }

  getProvince() {
    this.service.getProvince()
      .subscribe(response => {
        this.province = response;
      });
  }

  openFormModal() {
    this.formNewContact.show();
  }
  openSearchModal() {
    if (!this.formSearchResult.valid) {
      alert("il campo di ricerca è vuoto");
      return;
    } else {

      //console.log(this.searchTerm);
      //this.loadContattiFiltrati(this.searchTerm);
      this.searchResult.show();
    }
  }


  loadContattiFiltrati() {
    this.searchTerm = this.formSearchResult.controls['termine'].value;

    if (!this.searchTerm) {
      return;
    }
    this.loading = true;
    //console.log(this.loading);
    this.searchtable = true;
    this.servicecontatti.getSearchContact(this.searchTerm,this.id_ruolo,this.operatore,this.assegnabile)
      .subscribe(response => {
        this.search = response;
        this.dataSource.data = response;

        //console.log(this.search);
        this.loading = false;
        // this.operatore = this.chiamate.map(t => t.operatore);
      });


  }

  onCheckboxChange(e: any) {
    const interesse: UntypedFormArray = this.formAddContact.get('interesse') as UntypedFormArray;
    if (e.target.checked) {
      interesse.push(new UntypedFormControl(e.target.value));
    } else {
      let i: number = 0;
      interesse.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          interesse.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  addNewContact() {

    //console.log(this.formAddContact.value);
    if (!this.formAddContact.valid) {
      alert("compilare tutti i campi obbligatori!");
      return;
    }
    this.http.post('https://gestionalecero.it/gest_2022/post.php', {
      request: 'createContact',
      nome: this.formAddContact.controls['nome'].value,
      cognome: this.formAddContact.controls['cognome'].value,
      email: this.formAddContact.controls['email'].value,
      telefono: this.formAddContact.controls['telefono'].value,
      provincia: this.formAddContact.controls['provincia'].value,
      figura_professionale: this.formAddContact.controls['figura_professionale'].value,
      azienda: this.formAddContact.controls['azienda'].value,
      interesse: this.formAddContact.controls['interesse'].value,
      messaggio: this.formAddContact.controls['messaggio'].value,
      privacy: this.formAddContact.controls['privacy'].value,
      operatore: this.formAddContact.controls['operatore'].value,
      id_ruolo: this.id_ruolo
    }).subscribe(res => {
      //console.log(res);
      this.formAddContact.reset();
      console.log(this.Location.path());
      if (this.Location.path() == '/home') {
        location.reload()
      } else {
        this.router.navigate(['/home']);
      }

      //this.router.navigate([this.router.url])
      //this.reloaddata(1)
    });
    this.formNewContact.hide();
  }


  goToContactDetail(id) {
    this.router.navigate(['/dettaglio-contatto', id])
      .then(() => {
       location.reload();
      });
  }

}

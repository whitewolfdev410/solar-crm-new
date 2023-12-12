import { Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroup, UntypedFormControl, Validators, UntypedFormBuilder, FormArray, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AmministratoriService } from '../services/amministratori.service';
import { ContattiService } from '../services/contatti.service';
import { Contact } from '../models/contact.model';
import { GlobalComponent } from '../global-component';
import { DatePipe, formatDate } from '@angular/common';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-lista-contatti',
  templateUrl: './lista-contatti.component.html',
  styleUrls: ['./lista-contatti.component.css']
})
export class ListaContattiComponent implements OnInit {

  dev = GlobalComponent.dev;
  title = 'datatables';

  loading: boolean;
  contacts: Contact[] = new Array();
  partner: Contact[] = new Array();
  data: any;
  session: any = localStorage.getItem("name");
  operatore: any = localStorage.getItem("id");
  id_ruolo: any = localStorage.getItem("id_ruolo");
  nome_operatore: any = localStorage.getItem("nome");
  cognome_operatore: any = localStorage.getItem("cognome");
  selectField: UntypedFormControl = new UntypedFormControl("1");
  amministratori: any;
  doppio: any;
  double: Number = 0;
  id: Number;
  dataSourceContatti: any;
  data_ultimo_contatto: any;
  data_appuntamento: Date = new Date();
  start: Date;
  idraulico_id: any;
  assegnato_idraulico: string = "none";
  getapps: any;
  id_utenti: any;
  numbers: any;
  startApp: Date;
  assegnabile: any;
  partners: any;



  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }

  filterFormP = new FormGroup({
    fromDateP: new FormControl(),
    toDateP: new FormControl(),
  });   


  
  get fromDateP() { return this.filterFormP.get('fromDateP').value; }
  get toDateP() { return this.filterFormP.get('toDateP').value; }


  displayedColumns: string[] = ['numero', 'action', 'cognome','nome', 'n_contatto', 'interesse','figura_professionale', 'richiama_chi', 'telefono','email', 'provincia', 'data_contatto', 'data_appuntamento'];
  displayedColumnsP: string[] = ['numero', 'action', 'cognome','nome', 'n_contatto', 'interesse', 'richiama_chi', 'telefono', 'provincia', 'data_contatto', 'email'];
  dataSource = new MatTableDataSource<Contact>();
  dataSourceP = new MatTableDataSource<Contact>();
  //  provinceService:any = new ProvinceService();
  pipe: DatePipe;

  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild('paginatorP') paginatorP: MatPaginator;
  //@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  //@ViewChild(MatPaginator, { static: true }) paginatorP!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortP!: MatSort;


  constructor(public http: HttpClient, public fb: UntypedFormBuilder, public route: ActivatedRoute, public router: Router, private ammservice: AmministratoriService, private service: ContattiService) {
    this.contatti = new Array<Contact>();
    
  }




  ngOnInit(): void {
    //this.loadContatti();
    // this.loadTable();

    //this.loadTableContacts(1);
    this.loadAmministratore()
    this.loadContatti(1);
    this.loadPartner();

    //this.getApps()

    // ordina i risultati in base alla data
    this.dataSource.sort = this.sort;
    const sortState: Sort = { active: 'data_contatto', direction: 'desc' };
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceP.paginator = this.paginatorP;
  }


  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.dataSource.paginator ? this.dataSource.paginator = this.paginator : null;
          break;
        case 1:
          !this.dataSourceP.paginator ? this.dataSourceP.paginator = this.paginatorP : null;
      }
    });
  }



  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

  loadAmministratore() {
    this.ammservice.getAmministratori()

      .subscribe(response => {

        this.amministratori = response;
        //console.log('pippo' + this.amministratori);
      });
  }



  filterContact() {
    if (this.selectField.value == "1") {
      this.loadContatti(this.selectField.value)
    }
    else if (this.selectField.value == "2") {
      //this.loadTableContacts(2);
      this.loadContatti(this.selectField.value)
    } else if (this.selectField.value == "3") {
      this.loadContatti(this.selectField.value)
      //this.loadTableContacts(3);
    }
    else if (this.selectField.value == "4") {
      this.loadContatti(this.selectField.value)
      //this.loadTableContacts(3);
    }
    else if (this.selectField.value == "5") {
      this.loadContatti(this.selectField.value)
      //this.loadTableContacts(3);
    } else if (this.selectField.value == "6") {
      this.loadContatti(this.selectField.value)
      //this.loadTableContacts(3);
    } else if (this.selectField.value == "7") {
      this.loadContattifb(this.selectField.value)
      //this.loadTableContacts(3);
    } else if (this.selectField.value == "8") {
      this.loadContatti(this.selectField.value)
      //this.loadTableContacts(3);
    } else if (this.selectField.value == "9") {
      this.loadContatti(this.selectField.value)
      //this.loadTableContacts(3);
    }

  }

  spegniContatto(id: number): void {
    this.http.get('https://gestionalecero.it/gest_2022/index.php?request=spegni&id_contatto=' + id).subscribe(res_off => {
      if (res_off[0] == "KO") {
        alert(res_off[1]);
      } else {
        this.loadContatti(1);
      }
      //      //console.log(res_off);
    });
  }

  eliminaContatto(id: number): void {
    if (window.confirm('Sei sicuro ?')) {
      this.http.get('https://gestionalecero.it/gest_2022/index.php?request=elimina&id_contatto=' + id).subscribe(res_off => {
        if (res_off[0] == "KO") {
          alert(res_off[1]);
        } else {
          this.loadContatti(1);
        }
        //console.log(res_off);
      });
    }
  }



  private loadContatti(type: number) {
    this.loading = true;
    //console.log(this.loading);
    this.operatore = localStorage.getItem("id");
    this.assegnabile = localStorage.getItem("assegnabile");
    console.log(this.assegnabile);
    this.http.get<Contact[]>('https://gestionalecero.it/gest_2022/index.php?request=contacts&type=' + type + '&operatore=' + this.operatore + '&id_ruolo=' + this.id_ruolo + '&assegnabile=' + this.assegnabile).subscribe({
      next: (res => {
        this.contacts = res;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.idraulico_id = this.contacts.map(t => t.id_idraulico);
console.log(this.contacts);
        this.http.get('https://gestionalecero.it/gest_2022/index.php?request=getApps')
          .subscribe(response => {
            this.getapps = response;
            this.start = this.getapps.map(t => t.start);
            this.id_utenti = this.getapps.map(t => t.id_utenti);
            //console.log(this.id_utenti)

            this.getapps.forEach(array1Ttem => {

              this.contacts.forEach(array2Item => {

                if (array1Ttem.id_utenti == array2Item.id) {
                  var threeMonthsAgo = moment().subtract(3, 'months');

                  var diff = moment().diff(array1Ttem.start, 'months');
                  //console.log(diff);
                  if (diff <= 3) {
                    array2Item.startApp = array1Ttem.start;
                  }
                }
                else {
                  //console.log("This item not present in array =>",array1Ttem);
                }

              })
            })

          });

        this.loading = false;
        // this.operatore = this.chiamate.map(t => t.operatore);
      }),
      error: err => {
        alert(`Error ${err}!`);
      }

    });

  }
  private loadPartner() {
    this.loading = true;
    //console.log(this.loading);
    this.operatore = localStorage.getItem("id");
    this.assegnabile = localStorage.getItem("assegnabile");
    console.log(this.assegnabile);
    this.http.get<Contact[]>('https://gestionalecero.it/gest_2022/index.php?request=partner&operatore=' + this.operatore + '&id_ruolo=' + this.id_ruolo + '&assegnabile=' + this.assegnabile).subscribe({
      next: (res => {
        this.partners = res;
        // console.log(this.partners);
        this.dataSourceP.data = res;
        //this.dataSourceP.paginator = this.paginatorP;
        //this.dataSourceP.sort = this.sortP;
        this.idraulico_id = this.partners.map(t => t.id_idraulico);

        this.http.get('https://gestionalecero.it/gest_2022/index.php?request=getApps')
          .subscribe(response => {
            this.getapps = response;
            this.start = this.getapps.map(t => t.start);
            this.id_utenti = this.getapps.map(t => t.id_utenti);
            //console.log(this.id_utenti)

            this.getapps.forEach(array1Ttem => {

              this.partners.forEach(array2Item => {

                if (array1Ttem.id_utenti == array2Item.id) {
                  var threeMonthsAgo = moment().subtract(3, 'months');

                  var diff = moment().diff(array1Ttem.start, 'months');
                  //console.log(diff);
                  if (diff <= 3) {
                    array2Item.startApp = array1Ttem.start;
                  }
                }
                else {
                  //console.log("This item not present in array =>",array1Ttem);
                }

              })
            })

          });

        this.loading = false;
        // this.operatore = this.chiamate.map(t => t.operatore);
      }),
      error: err => {
        alert(`Error ${err}!`);
      }

    });

  }


  private getApps(value) {
    //console.log(id_utente);
    this.http.get('https://gestionalecero.it/gest_2022/index.php?request=getApps&id_utenti=' + value)
      .subscribe(response => {
        this.getapps = response;
        //  console.log(this.getapps);

        //next: (res => {
        // this.getapp = res;
        //console.log(this.getapp);
        // }),
        //error: err => {
        //alert(`Error ${err}!`);
        //}

      });

  }
  private loadContattifb(type: number) {
    this.loading = true;
    //console.log(this.loading);
    this.operatore = localStorage.getItem("id");
    this.http.get<Contact[]>('https://gestionalecero.it/gest_2022/index.php?request=contactsfb&type=' + type + '&operatore=' + this.operatore + '&id_ruolo=' + this.id_ruolo).subscribe({
      next: (res => {
        this.contacts = res;
        this.dataSource.data = res;
        //this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;


        //console.log(this.contacts);
        this.loading = false;
        // this.operatore = this.chiamate.map(t => t.operatore);
      }),
      error: err => {
        alert(`Error ${err}!`);
      }

    });

  }
  clickedRows = new Set<Contact>();
  clickedRowsP = new Set<Contact>();

  applyFilter(fevent: Event) {
    const filterValue = (event!.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterP(fevent: Event) {
    const filterValue = (event!.target as HTMLInputElement).value;
    this.dataSourceP.filter = filterValue.trim().toLowerCase();

    if (this.dataSourceP.paginator) {
      this.dataSourceP.paginator.firstPage();
    }
  }

  applyFilterDataRange(fevent: Event) {
   // console.log(fevent)
    this.pipe = new DatePipe('it');
    this.dataSource.filterPredicate = (data, filter) => {
      
      if (this.fromDate && this.toDate) {
      /*   //console.log(new Date(data['data_contatto']));
        console.log(new Date(data['data_contatto']).getUTCHours());
        //console.log(this.fromDate+' - '+new Date(data['data_contatto']));
        return new Date(data['data_contatto']) >= this.fromDate && new Date(data['data_contatto']) <= this.toDate; */
        const data_filtro=moment(data['data_contatto']).format('YYYY-MM-DD');
        const start=moment(this.fromDate).format('YYYY-MM-DD');
        const end=moment(this.toDate).format('YYYY-MM-DD');
    
        return data_filtro >= start && data_filtro <= end;

      }
      return true;
    }
    


    this.dataSource.filter = '' + Math.random();
  }

  applyFilterDataRangeP(fevent: Event) {
    // console.log(fevent)
     this.pipe = new DatePipe('it');
     this.dataSourceP.filterPredicate = (dataP, filter) => {
      
       if (this.fromDateP && this.toDateP) {
       /*   //console.log(new Date(data['data_contatto']));
         console.log(new Date(data['data_contatto']).getUTCHours());
         //console.log(this.fromDate+' - '+new Date(data['data_contatto']));
         return new Date(data['data_contatto']) >= this.fromDate && new Date(data['data_contatto']) <= this.toDate; */
         const data_filtroP = moment(dataP['data_contatto']).format('YYYY-MM-DD');
         const startP=moment(this.fromDateP).format('YYYY-MM-DD');
         const endP=moment(this.toDateP).format('YYYY-MM-DD');
    
         return data_filtroP >= startP && data_filtroP <= endP;
 
       }
       return true;
     }
     
 
 
     this.dataSourceP.filter = '' + Math.random();
   }

  contatti = this.contacts;
  selectedContatto!: Contact;

  partnerini = this.partner;
  selectedPartners!: Contact;

  onSelect(contatto: Contact): void {
    this.selectedContatto = contatto;
    //console.log(contatto.id);
  }

  /*   applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSourceContatti.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSourceContatti.paginator) {
        this.dataSourceContatti.paginator.firstPage();
      }
    } */


   
}

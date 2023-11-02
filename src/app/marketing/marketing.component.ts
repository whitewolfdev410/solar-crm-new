import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../models/contact.model';
import { AmministratoriService } from '../services/amministratori.service';
import { ContattiService } from '../services/contatti.service';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import moment from 'moment';
import { DatePipe } from '@angular/common';
import { MatPaginator } from '@angular/material/paginator';
import { MarketingService } from '../services/marketing.service';

@Component({
  selector: 'app-marketing',
  templateUrl: './marketing.component.html',
  styleUrls: ['./marketing.component.css']
})
export class MarketingComponent implements OnInit {
  anno_globale = localStorage.getItem("anno_globale");
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }



  dev = GlobalComponent.dev;
  loading: boolean;
  contatti: any;
  contacts: Contact[] = new Array();
  getapps: any;
  id_utenti: any;
  start: Date;
  idraulico_id: any;
  assegnabile: any;
  chiamate: any;
  amministratori: any;

  session: any = localStorage.getItem("name");
  operatore: any = localStorage.getItem("id");
  id_ruolo: any = localStorage.getItem("id_ruolo");
  nome_operatore: any = localStorage.getItem("nome");
  cognome_operatore: any = localStorage.getItem("cognome");

  displayedColumns: string[] = ['numero', 'cognome', 'nome','n_cont', 'data_contatto', 'data_chiamata','amministratore.nome','tipologia','data_offerta','data_conferma','data_fattura','data_fattura2','data_fattura3','data_fattura4','totale_fattura','data_bolla','form_name','campapign_name'];

  dataSource = new MatTableDataSource<Contact>();


  pipe: DatePipe;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public http: HttpClient, public fb: UntypedFormBuilder, public route: ActivatedRoute, public router: Router, private marketing: MarketingService, private ammservice: AmministratoriService, private service: ContattiService) {
    this.contatti = new Array<Contact>();

  }


  ngOnInit(): void {
    this.loadContatti(1);
    this.loadAmministratore()

    // ordina i risultati in base alla data


  }


  clickedRows = new Set<Contact>();
  applyFilter(fevent: Event) {
    const filterValue = (event!.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }


  private loadContatti(type: number) {
    this.loading = true;
    //console.log(this.loading);
    this.operatore = localStorage.getItem("id");
    this.assegnabile = localStorage.getItem("assegnabile");
    console.log(this.assegnabile);
    this.http.get<Contact[]>('https://gestionalecero.it/gest_2022/marketing.php?request=contacts&type=' + type + '&operatore=' + this.operatore + '&id_ruolo=' + this.id_ruolo + '&assegnabile=' + this.assegnabile+'&anno='+this.anno_globale).subscribe({
      next: (res => {
        this.contacts = res;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.idraulico_id = this.contacts.map(t => t.id_idraulico);
        console.log(this.contacts);
        this.http.get('https://gestionalecero.it/gest_2022/marketing.php?request=getApps')
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
         this.loadChiamate()
        this.loading = false;
        // this.operatore = this.chiamate.map(t => t.operatore);
      }),
      error: err => {
        alert(`Error ${err}!`);
      }

    });

  }
  loadAmministratore() {
    this.ammservice.getAmministratori()

      .subscribe(response => {

        this.amministratori = response;
        //console.log('pippo' + this.amministratori);
      });
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
        const data_filtro = moment(data['data_contatto']).format('YYYY-MM-DD');
        const start = moment(this.fromDate).format('YYYY-MM-DD');
        const end = moment(this.toDate).format('YYYY-MM-DD');

        return data_filtro >= start && data_filtro <= end;

      }
      return true;
    }



    this.dataSource.filter = '' + Math.random();
  }

  private loadChiamate() {
    this.marketing.load_chiamate()
      .subscribe({
        next: (response => {
          if (response.length === 0) { console.log("Array is empty!") } else {
            this.chiamate = response;
           // console.log(this.chiamate);
          }
        }),
        error: err => {
          alert(`Error ${err}!`);
        }
      });
  }

}

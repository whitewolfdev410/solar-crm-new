import { Component, OnInit, ViewChild } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, UntypedFormBuilder } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { Contact } from '../models/contact.model';
import { AmministratoriService } from '../services/amministratori.service';
import { ContattiService } from '../services/contatti.service';
import { MarketingService } from '../services/marketing.service';


@Component({
  selector: 'app-stat-offerte',
  templateUrl: './stat-offerte.component.html',
  styleUrls: ['./stat-offerte.component.css']
})
export class StatOfferteComponent implements OnInit{

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

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }

  contatti: any;
  contacts: Contact[] = new Array();
  getapps: any;
  id_utenti: any;
  year:any;
  start: any;
  end: any;
  idraulico_id: any;
  assegnabile: any;
  chiamate: any;
  amministratori: any;
  offerte: any;


  displayedColumns: string[] = ['cognome_operatore', 'data_offerta', 'data_conferma', 'totale_merci', 'tipologia'];

  dataSource = new MatTableDataSource<Contact>();


  pipe: DatePipe;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public http: HttpClient, public fb: UntypedFormBuilder, public route: ActivatedRoute, public router: Router, private marketing: MarketingService, private ammservice: AmministratoriService, private service: ContattiService) {
    this.offerte = new Array();

    this.start='01-01-'+this.anno_globale;
    this.end='31-12-'+this.anno_globale;

  }

  ngOnInit(): void {
    this.loadOfferte(this.start,this.end);
    //this.loadAmministratore()

    // ordina i risultati in base alla data


  }

  clickedRows = new Set<Contact>();
  applyFilter(fevent: Event) {
    const filterValue = (event!.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    // console.log(this.dataSource.filter);
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

  private loadOfferte(start,end) {
    this.loading = true;
    //console.log(this.loading);
    this.operatore = localStorage.getItem("id");
    this.assegnabile = localStorage.getItem("assegnabile");
    this.http.get<Contact[]>(GlobalComponent.url_global +'/marketing.php?request=LoadOfferte&start='+start+'&end='+end).subscribe({
      next: (res => {
        this.offerte = res;
        this.dataSource.data = res;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        console.log(this.offerte);

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
    console.log(fevent)
    this.pipe = new DatePipe('it');
    this.start=this.fromDate;
    this.end=this.toDate;
   
    if (this.fromDate && this.toDate) {
      let startDate=this.start.getFullYear()+"-"+(this.start.getMonth()+1)+"-"+this.start.getDate();
      let endDate=this.end.getFullYear()+"-"+(this.end.getMonth()+1)+"-"+this.end.getDate();
      console.log(startDate);
      console.log(endDate);
    this.loadOfferte(startDate, endDate)
    }
  }


}

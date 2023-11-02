import { Component, OnInit, ViewChild, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { FattureFornitoriService } from '../services/fatture_fornitori.service';
import { FornitoriService } from '../services/fornitori.service';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { FatturaFornitore } from '../models/fattura_fornitore.model';
import { Fornitore } from '../models/fornitore.model';
import { MatPaginator } from '@angular/material/paginator';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';



@Component({
  selector: 'app-riepilogo-fatture-fornitori',
  templateUrl: './riepilogo-fatture-fornitori.component.html',
  styleUrls: ['./riepilogo-fatture-fornitori.component.css']
 
})
export class RiepilogoFattureFornitoriComponent implements OnInit {

  dev = GlobalComponent.dev;
  loading: boolean;
  fatturelist:any;
  fornitorilist: Fornitore[] = new Array();
  pipe: DatePipe;
  totimponibile: any = 0

  
 
  
  displayedColumns = ['nome_fornitore', 'tipologia', 'mese','nome_fattura','data_fattura','scadenza_pagamento','data_pagamento','imponibile'];
  dataSource = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }


  constructor(public http: HttpClient, public fb: UntypedFormBuilder, public route: ActivatedRoute, public router: Router, private fattfornservice: FattureFornitoriService, private fornservice: FornitoriService,private cd: ChangeDetectorRef) {
   
  }

  ngOnInit(): void {
   //this.RiepilogoFattureFornitori();
   this.fornitoriList()
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }
    return null;
  }

  fornitoriList():void{
    this.loading = true;
    this.fornservice.getListaFornitori()
      .subscribe(response => {
        this.fornitorilist = response;
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.loading = false;
      //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      });

  }

  getTotal() {
    this.totimponibile = this.fornitorilist.map(t => t.imponibile);
    var numbertotimponibile = [];
    length = this.totimponibile.length;

    for (var i = 0; i < length; i++)
      numbertotimponibile.push(parseFloat(this.totimponibile[i]));
    return numbertotimponibile.reduce((acc, value) => acc + value, 0);

  }


  clickedRows = new Set<Fornitore>();

   applyFilter(fevent: Event) {
    const filterValue = (event!.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  } 

  applyFilterDataRange(fevent: Event) {
     console.log(fevent)
     this.pipe = new DatePipe('it');
     this.dataSource.filterPredicate = (data, filter) => {
       
       if (this.fromDate && this.toDate) {
       /*   //console.log(new Date(data['data_contatto']));
         console.log(new Date(data['data_contatto']).getUTCHours());
         //console.log(this.fromDate+' - '+new Date(data['data_contatto']));
         return new Date(data['data_contatto']) >= this.fromDate && new Date(data['data_contatto']) <= this.toDate; */
         const data_filtro=moment(data['data_fattura']).format('YYYY-MM-DD');
         const start=moment(this.fromDate).format('YYYY-MM-DD');
         const end=moment(this.toDate).format('YYYY-MM-DD');
     
         return data_filtro >= start && data_filtro <= end;
 
       }
       return true;
     }
   
     this.dataSource.filter = '' + Math.random();
    }

 /*  RiepilogoFattureFornitori(): void {
    this.loading = true;
    this.fattfornservice.getRiepilogoFatture()
      .subscribe(response => {
        this.fatturelist = response;
       console.log(this.fatturelist);
        this.loading = false;
      //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      });

  } */

 

}

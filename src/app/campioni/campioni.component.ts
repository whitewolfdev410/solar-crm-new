import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { DOCUMENT, DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CampioniService } from '../services/campioni.service';
import { ProvinceService } from '../services/province.service';
import { Ruoli } from '../services/ruoli.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Campioni } from '../models/campioni.model';

@Component({
  selector: 'app-campioni',
  templateUrl: './campioni.component.html',
  styleUrls: ['./campioni.component.css']
})
export class CampioniComponent implements OnInit {
  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
  loading: boolean = false;
  campionilist:any;
  spedizione:any;

  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }


  
  displayedColumns: string[] = ['numero','nome','click','data_click','pagamento','data_pagamento','spedizione','data_spedizione','indirizzo_spedizione'];
  dataSource = new MatTableDataSource();
  pipe: DatePipe;
  //  provinceService:any = new ProvinceService();


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private campioni: CampioniService, private provincia: ProvinceService, private ruolo: Ruoli) {}

  ngOnInit(): void {
    this.getCampioniList();
  }

public getCampioniList(): void {
  this.loading = true;
  this.campioni.getCampioniList()
    .subscribe(response => {
      this.campionilist = response;
      this.dataSource.data = response;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      //console.log(this.dataSource.data);
console.log( this.campionilist);
      this.loading = false;
    //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

    });
  }

  public setSpedizione(id): void {
    this.loading = true;
    this.campioni.setSpedizione(id)
      .subscribe(response => {
        this.spedizione = response;
        if(this.spedizione[0]=='OK'){
          this.getCampioniList()
        }
        this.loading = false;
      //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);
  
      });
    }

validDateFormat(dateString) {
  if (dateString) {
    return dateString.replace(/\s/, 'T');
  }

  return null;

}

clickedRows = new Set<Campioni>();
  applyFilter(fevent: Event) {
    const filterValue = (event!.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyFilterDataRange(fevent: Event) {

    this.pipe = new DatePipe('it');
    this.dataSource.filterPredicate = (data, filter) => {
      //console.log(this.dataSource.data);
      if (this.fromDate && this.toDate) {
        console.log(this.fromDate+' - '+new Date(data['data_pagamento'])+' - '+this.toDate);
        return new Date(data['data_pagamento']) >= this.fromDate && new Date(data['data_fattura']) <= this.toDate;
      }
      return true;
    }
    this.dataSource.filter = '' + Math.random();
   
  }

  resetRan(){
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        // console.log(this.fromDate+' - '+new Date(data['data_offerta']));
        return new Date(data['data_pagamento']) == this.fromDate && new Date(data['data_pagamento']) <= this.toDate;
      }
      return true;
    }  
  }

}

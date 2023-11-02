import { HttpClient } from '@angular/common/http';
import { Component, Input, Injector, OnInit, Inject, AfterViewInit, ViewChild, } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { FattureService } from '../services/fatture.service';
import { DOCUMENT, DatePipe, Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalComponent } from '../global-component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from '../models/amministratore.model';
import { Fattura } from '../models/fattura.model';

@Component({
  selector: 'app-lista-fatture',
  templateUrl: './lista-fatture.component.html',
  styleUrls: ['./lista-fatture.component.css']
})
export class ListaFattureComponent implements OnInit {
  dev = GlobalComponent.dev;
  loading:boolean=false;
  fatturelist:any;
  sdi_status:any='MC';

totimponibile:any;
  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }


  
  displayedColumns: string[] = ['numero','numero_fattura','data_fattura','chiusa','nome','imponibile','totale_fattura','consulenza','materiale','pagato','sdi_last_dt','sdi_status','azioni'];
  dataSource = new MatTableDataSource();
  pipe: DatePipe;
  //  provinceService:any = new ProvinceService();


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: any, private fatture: FattureService, private Location: Location, public dialog: MatDialog) {}

  ngOnInit(): void {

    this.ListFatture();
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }
  ListFatture(): void {
    this.loading = true;
    this.fatture.getFattureList()
      .subscribe(response => {
        this.fatturelist = response;
        this.dataSource.data = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        //console.log(this.dataSource.data);

        this.loading = false;
      //  this.sdi_status = this.fatturelist.map(t => t.sdi_status);

      });

  }
  clickedRows = new Set<Fattura>();
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
        console.log(this.fromDate+' - '+new Date(data['data_fattura'])+' - '+this.toDate);
        return new Date(data['data_fattura']) >= this.fromDate && new Date(data['data_fattura']) <= this.toDate;
      }
      return true;
    }
    this.dataSource.filter = '' + Math.random();
   
  }

  resetRan(){
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        // console.log(this.fromDate+' - '+new Date(data['data_offerta']));
        return new Date(data['data_fattura']) == this.fromDate && new Date(data['data_fattura']) <= this.toDate;
      }
      return true;
    }  
  }

  getTotal() {
    this.totimponibile = this.fatturelist.map(t => t.imponibile);
    var numbertotimponibile = [];
    length = this.totimponibile.length;

    for (var i = 0; i < length; i++)
      numbertotimponibile.push(parseFloat(this.totimponibile[i]));
    return numbertotimponibile.reduce((acc, value) => acc + value, 0);

  }

  eliminaFattura(id): void {
    if (window.confirm('Sei sicuro ?' + id)) {
      this.fatture.deleteFattura(id).subscribe(res => {
        if (res[0] == "KO") {
          alert(res[1]);
        } else {
          this.ListFatture();
        }
        //console.log(res);
      });
    }
  }

}

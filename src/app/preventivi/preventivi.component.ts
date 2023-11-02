import { HttpClient } from '@angular/common/http';
import { Component, Input, Injector, OnInit, Inject, AfterViewInit, ViewChild, } from '@angular/core';
import { FormControl, FormGroup, UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PreventiviService } from '../services/preventivi.service';
import { DOCUMENT, DatePipe, Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalComponent } from '../global-component';
import { MatTableDataSource } from '@angular/material/table';
import { Preventivo } from '../models/preventivo.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { User } from '../models/amministratore.model';


@Component({
  selector: 'app-preventivi',
  templateUrl: './preventivi.component.html',
  styleUrls: ['./preventivi.component.css']
})
export class PreventiviComponent implements OnInit {
  dev = GlobalComponent.dev;
  @Input() operatore: any;
  @Input() tipo: any;
  @Input() user: any;
  @Input() id_offerta_conferma: any;
  list_conf: boolean;
  prev: any;
  preventivilist: Preventivo[] = new Array();
  loading: boolean;

  prevhot: any;
  home: boolean = false;
  dettaglio: boolean = false;
  id_offerta: any;
  lista: boolean = false;
  total: any;
  totimponibile: any = 0
  lastcall: any;
  users: any;
  chiamate: any;
  data_offerta: Date;


  filterForm = new FormGroup({
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  get fromDate() { return this.filterForm.get('fromDate').value; }
  get toDate() { return this.filterForm.get('toDate').value; }

  displayedColumns: string[] = ['numero', 'numero_offerta', 'data_offerta', 'nome_materiale', 'cognome', 'imponibile', 'cognome_operatore', 'data_chiamata', 'clickofferta', 'action'];
  dataSource = new MatTableDataSource();
  pipe: DatePipe;
  //  provinceService:any = new ProvinceService();


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, @Inject(DOCUMENT) private document: any, private preventivi: PreventiviService, private Location: Location, public dialog: MatDialog) {




  }

  ngOnInit(): void {

    this.ListPreventivi();



  }

  ngAfterViewInit() {
  }


  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

  ListPreventivi(): void {
    this.loading = true;
    this.preventivi.getPreventivi()
      .subscribe(response => {
        this.preventivilist = response;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = response;
        //console.log(this.dataSource.data);

        this.loading = false;
        //this.total = this.preventivilist.map(t => t.imponibile);

      });

  }


  lastChiamata(id): void {
    this.preventivi.getLastCall(id)
      .subscribe(response => {
        this.chiamate = response;

        //console.log(this.chiamate);
        //this.total = this.preventivilist.map(t => t.imponibile);

      });

  }
  duplicaOfferta(id) {

    let url: string = 'https://gestionalecero.it/duplica_offerta.php?duplica=' + id;
    //console.log(url);
    // window.location.href = 'https://gestionalecero.it/area_riservata/login-home.php?id_dettaglio='.id.'&username='.this.username.'&password='.this.password.'&clk=admin';

    let u: string = '';

    if (!/^http[s]?:\/\//.test(url)) {
      u += 'http://';
    }
    u += url;
    let link = this.document.createElement("a");
    //link.target = '_blank';
    link.href = u;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }

  eliminaOfferta(id): void {
    if (window.confirm('Sei sicuro ?' + id)) {
      this.preventivi.deleteOfferta(id).subscribe(res => {
        if (res[0] == "KO") {
          alert(res[1]);
        } else {
          this.ListPreventivi();
        }
        //console.log(res);
      });
    }
  }

  getTotal() {
    this.totimponibile = this.preventivilist.map(t => t.imponibile);
    var numbertotimponibile = [];
    length = this.totimponibile.length;

    for (var i = 0; i < length; i++)
      numbertotimponibile.push(parseFloat(this.totimponibile[i]));
    return numbertotimponibile.reduce((acc, value) => acc + value, 0);

  }

  clickedRows = new Set<Preventivo>();

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
        console.log(this.fromDate+' - '+new Date(data['data_offerta'])+' - '+this.toDate);
        return new Date(data['data_offerta']) >= this.fromDate && new Date(data['data_offerta']) <= this.toDate;
      }
      return true;
    }
    this.dataSource.filter = '' + Math.random();
   
  }

  resetRan(){
    this.dataSource.filterPredicate = (data, filter) => {
      if (this.fromDate && this.toDate) {
        // console.log(this.fromDate+' - '+new Date(data['data_offerta']));
        return new Date(data['data_offerta']) == this.fromDate && new Date(data['data_offerta']) <= this.toDate;
      }
      return true;
    }  
  }

  preventivo = this.preventivilist;
  selectedPreventivo!: Preventivo;

  onSelect(contatto: Preventivo): void {
    this.selectedPreventivo = contatto;
    //console.log(contatto.id);
  }



}

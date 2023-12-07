import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { GlobalComponent } from '../global-component';
import { PreventiviService } from '../services/preventivi.service';


declare var window: any;

@Component({
  selector: 'app-lista-preventivi',
  templateUrl: './lista-preventivi.component.html',
  styleUrls: ['./lista-preventivi.component.css']
})
export class ListaPreventiviComponent implements OnInit {
  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
  @Input() operatore: any;
  @Input() tipo: any;
  @Input() user: any;
  @Input() id_offerta_conferma: any;
  assegnabile: any = localStorage.getItem("assegnabile");
  id_operatore: any = localStorage.getItem("id");
  list_conf: boolean;
  prev: any;
  preventivilist: any;
  loading: boolean;
  id_ruolo: any = localStorage.getItem("id_ruolo");
  prevhot: any;
  home: boolean = false;
  dettaglio: boolean = false;
  id_offerta: any;
  lista: boolean = false


  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private preventivi: PreventiviService, private Location: Location, public dialog: MatDialog) { }

  ngOnInit(): void {

    console.log(this.Location.path());
    if (this.Location.path() == '/home') {
      this.home = true;
      this.ListPreventiviNotOpen();
      this.ListPreventiviHot();
    }
    if (this.Location.path() == '/dettaglio-contatto/' + this.user) {
      this.dettaglio = true;
      this.ListPreventiviDettaglioContatto();
    }

  }

  /* ngAfterViewInit() {
    if (this.Location.path() == '/home') {
      this.ListPreventiviNotOpen();
      this.ListPreventiviHot();
    }
    if (this.Location.path() == '/dettaglio-contatto/' + this.user) {
      this.ListPreventiviDettaglioContatto();
    }


  } */


  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }


  ListPreventiviNotOpen(): void {
    this.preventivi.getPreventiviList(this.operatore, 'not_open')
      .subscribe(response => {
        this.prev = response;
      });
  }

  ListPreventiviHot(): void {
    this.preventivi.getPreventiviListHot(this.operatore)
      .subscribe(response => {
        this.prevhot = response;
      });
  }
  ListPreventiviDettaglioContatto(): void {
    console.log(this.id_operatore);
    this.preventivi.getPreventiviDettContact(this.user, this.assegnabile, this.id_operatore)
      .subscribe(response => {
        this.prev = response;

        this.id_offerta = this.prev.id;
        console.log(this.prev);

        ////console.log('dio boiaccio' + this.selected);

      });
  }

  openDialog(tipo, id_offerta, id_utente, template) {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      backdropClass: 'confirmDialogComponent',
      panelClass: 'custom-modalbox',
      data: { tipo: tipo, id_offerta: id_offerta, id_utente: id_utente, template: template }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
  styleUrls: ['lista-preventivi.component.css']
})
export class DialogContentExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }


}

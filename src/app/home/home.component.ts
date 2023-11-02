import { HttpClient } from '@angular/common/http';
import { Component, Input, Injector, OnInit, Inject, AfterViewInit, ViewChild, } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PreventiviService } from '../services/preventivi.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalComponent } from '../global-component';
import { AmministratoriService } from '../services/amministratori.service';
import { Contact } from '../models/contact.model';
import { HomeService } from '../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {

  name: any;
  nome: boolean;
  session: any = localStorage.getItem("name");
  operatore: any = localStorage.getItem("id");
  nome_operatore: any = localStorage.getItem("nome");
  cognome_operatore: any = localStorage.getItem("cognome");
  id_ruolo: any = localStorage.getItem("id_ruolo");
  assegnabile: any = localStorage.getItem("assegnabile");
  amministratori: any;
  contatti_richiamare: any;
  contatti_campione:any;

  constructor(public http: HttpClient, public route: ActivatedRoute, public router: Router, private ammservice: AmministratoriService, private homeservice: HomeService) {}

  ngOnInit(): void {
    this.listaRichiamare();
    this.listaCampioni();
    this.loadAmministratore()
  }

  public listaRichiamare(): void {
    this.homeservice.listaRichiamare(this.operatore)
      .subscribe({
        next: (response => {
          this.contatti_richiamare = response;
          console.log(this.contatti_richiamare);
        }),
        error: err => {
          alert(`Error ${err}!`);
        }
      });
  }

  public listaCampioni(): void {
    this.homeservice.listaCampioni(this.operatore)
    .subscribe({
      next: (response => {
        this.contatti_campione = response;
        console.log(this.contatti_campione);
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

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }


}

import { Component, Inject, OnInit } from '@angular/core';
import { GlobalComponent } from '../global-component';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContattiService } from '../services/contatti.service';
import { ProvinceService } from '../services/province.service';
import { Ruoli } from '../services/ruoli.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { AreariservataService } from '../services/area-riservata.service';
import * as moment from 'moment';
import { PreventiviService } from '../services/preventivi.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { template } from 'lodash';

@Component({
  selector: 'app-area-riservata',
  templateUrl: './area-riservata.component.html',
  styleUrls: ['./area-riservata.component.css']
})
export class AreaRiservataComponent implements OnInit {

  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
  loading: boolean = false;
  id: number;
  username: string;
  password: string;
  paramsSubscription: Subscription;
  contatti: any;
  user_id: any;
  amm_id: string;
  selectshow: boolean = false;
  appuntamenti: any;
  province: any;
  ruoli: any;
  data_lavori: Date;
  data_prev: Date;
  datalavori: any;
  link_cal: any
  interesse: any;
  showappuntamento: boolean = false;
  start: any;
  today: Date = new Date();
  statoemail: any;
  stato: boolean = true;
  statomail: any;
  buttonmail: any;
  prev: any;
  id_offerta: any;
  assegnabile: any;
  id_operatore: any = localStorage.getItem("id_ruolo");
  admin: any;
  sondaggio: boolean = false;
  formsondaggio: boolean = true;
  chacksondaggio: any;
  nome_op: any;
  cognome_op: any;
  id_operatore_sondaggio: any;
  form: UntypedFormGroup = new UntypedFormGroup({});
  error: any;
  valutazione: any;

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private preventivi: PreventiviService, private service: ContattiService, private Location: Location, private areariservata: AreariservataService, private ruolo: Ruoli, public dialog: MatDialog) {


    if (this.id_operatore != null) {
      this.admin = 'admin';
    } else {
      this.admin = '';
    }

  }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.username = params['username'];
      this.password = params['password'];
      this.user_id = this.id;
      this.checkLogin();

      this.form = this.fb.group({
        'request': ['insertsondaggio'],
        id_utente: [null],
        id_operatore: [null],
        simpatia: [null, [Validators.required]],
        disponibilita: [null, [Validators.required]],
        competenza: [null, [Validators.required]],
        puntualita: [null, [Validators.required]],
      });

    });
  }


  checkLogin() {
    this.areariservata.checkLogin(this.id, this.username, this.password)
      .subscribe(res => {
        if (res[0] == "KO") {
          console.log('sessione scaduta');
        } else {
          this.getContatto(this.id);
          this.getAppuntamentoDettaglio();
          this.getStatoInvioMail();
          this.ListPreventiviDettaglioContatto();
          this.checkSondaggio();
        }
      });
  }

  getStatoInvioMail() {
    this.areariservata.getStatoInvioMail(this.id)
      .subscribe(res => {
        this.statoemail = res;
        if (res[0] == "KO") {
          this.stato = false;
        } else {
          this.stato = true;
        }
      });

  }
  changeStatoInvioMail() {
    if (window.confirm('Sei sicuro ?')) {
      this.areariservata.changeStatoInvioMail(this.id)
        .subscribe(res => {
          if (res[0] == "KO") {
            console.log('qualcosa non ha funzionato');
          } else {
            this.getStatoInvioMail();
          }
        });
    }
  }

  getContatto(id) {
    this.service.getContatto(this.id)
      .subscribe(response => {
        this.contatti = response;
        this.amm_id = this.contatti.map(t => t.richiama_chi);
        this.data_lavori = this.contatti.map(t => t.richiamare_il);
        this.interesse = this.contatti.map(t => t.interesse.replace(/ /g, '+'));
        this.data_prev = new Date(this.data_lavori);
      });

  }

  getAppuntamentoDettaglio() {
    this.service.getAppuntamentoDett(this.id)
      .subscribe(response => {
        this.appuntamenti = response;
        this.start = this.appuntamenti.map(t => t.start);
        var startDate = moment(this.start);//Date format
        var endDate = moment(this.today);
        if (moment(startDate).isSameOrBefore(endDate)) {
          this.showappuntamento = true;
        }
      });

  }
  deleteApp() {
    this.service.deleteAppAreaRiservata(this.id)
      .subscribe(response => {
        if (response[0] == "OK") {
          this.showappuntamento = false;

        } else {
          this.error = response[1];
        }
      });
  }
  ListPreventiviDettaglioContatto(): void {

    this.preventivi.getPreventiviDettContact(this.id, this.assegnabile, this.id_operatore)
      .subscribe(response => {
        this.prev = response;

        this.id_offerta = this.prev.id;
      });
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

  saveDateLavori(event: any) {
    let newdatalavori = (moment(event.target.value).format('YYYY-MM-DD'));
    this.service.saveDateLavori(this.id, newdatalavori, this.valutazione)
      .subscribe(response => {
        this.datalavori = response;
      });
  }
  checkSondaggio() {
    this.areariservata.checkSondaggio(this.id)
      .subscribe(res => {
        this.chacksondaggio = res;
        if (res[0] == "KO") {
          this.nome_op = res[1];
          this.cognome_op = res[2];
          this.id_operatore_sondaggio = res[3];
          this.formsondaggio = true;
          this.sondaggio = true;
          this.openDialog(this.id,this.sondaggio, this.nome_op, this.cognome_op,this.id_operatore_sondaggio);
        } else {
          this.sondaggio = false;
        }
      });
  }

  Sondaggio(form) {
    this.areariservata.insertSondaggio(JSON.stringify(this.form.value)).subscribe((res: any) => {
      if (res[0] == "OK") {
        this.formsondaggio = false;
      }
      //this.getDatiPartner();
    })
  }



  openDialog(id,sondaggio,nome_op, cognome_op, id_operatore_sondaggio) {
    const dialogRef = this.dialog.open(SondaggioDialog, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      backdropClass: 'confirmDialogComponent',
      panelClass: 'custom-modalbox',
      data: { tipo: 'tipo', operatore: 'operatore',id:id, sondaggio: sondaggio, nome_op: nome_op, cognome_op: cognome_op,id_operatore_sondaggio:id_operatore_sondaggio }
    });
    dialogRef.afterClosed().subscribe(result => {
    });
  }
}

@Component({
  selector: 'sondaggio-modal',
  templateUrl: 'sondaggio-modal.html',
  styleUrls: ['area-riservata.component.css']
})
export class SondaggioDialog {

  form: UntypedFormGroup = new UntypedFormGroup({});
  formsondaggio:boolean=true;

  constructor(
    public dialogRef: MatDialogRef<SondaggioDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public fb: UntypedFormBuilder,
    private areariservata: AreariservataService,) {

      this.form = this.fb.group({
        'request': ['insertsondaggio'],
        id_utente: [null],
        id_operatore: [null],
        simpatia: [null, [Validators.required]],
        disponibilita: [null, [Validators.required]],
        competenza: [null, [Validators.required]],
        puntualita: [null, [Validators.required]],
      });

     }

  onNoClick(): void {
    this.dialogRef.close();
  }

  Sondaggio(form) {
    this.areariservata.insertSondaggio(JSON.stringify(this.form.value)).subscribe((res: any) => {
      if (res[0] == "OK") {
        this.formsondaggio = false;
      }
    })
  }

}


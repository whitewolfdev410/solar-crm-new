import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, HostListener, ViewChild, Inject, PipeTransform, Pipe } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AmministratoriService } from '../services/amministratori.service';
import { ContattiService } from '../services/contatti.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { chiamate } from '../models/chiamate.model';
import { MatInputModule } from '@angular/material/input';
import { Subscription, observable, timer } from 'rxjs';
import * as moment from 'moment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatMenuTrigger } from '@angular/material/menu';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';




@Component({
  selector: 'app-chiamate',
  templateUrl: './chiamate.component.html',
  styleUrls: ['./chiamate.component.css']
})





export class ChiamateComponent implements OnInit {
  @Input() user: any;
  @Input() admin: string;
  @Input() data_lavori: Date;

  edit_chiamata: string = "none";
  operatore: any;
  amm: any;
  amministratori: any;
  idraulici: any;
  amministratore: any;
  chiamate: Array<chiamate>;
  formNewContact: any;
  formEditAmministrat: UntypedFormGroup;
  selected: string;
  selected_idraulico: string;
  selectOperatore: UntypedFormControl = new UntypedFormControl();
  selectIdraulico: UntypedFormControl = new UntypedFormControl();
  f_edit_chiamata: boolean = true;
  edit_chiam: string = "none";
  edit_field_chiamata: string = "none";
  aggiungiChiam: UntypedFormControl = new UntypedFormControl();
  nomeOperatore: string;
  chiamataField: UntypedFormControl = new UntypedFormControl();
  dataSourceChiamate: any;
  contatti: any;
  amm_id: any;
  idraulico_id: any;
  esterno: boolean;
  id_ruolo: any = localStorage.getItem("id_ruolo");
  nome_operatore: any = localStorage.getItem("nome");
  //id_operatore: any = localStorage.getItem("id");
  visibile: boolean;
  checked: boolean;
  //datalavori: any;
  non_risponde: boolean;
  contatto_errato: boolean;
  messaggio_wa:boolean;
  contattato_email:boolean;
  nn_risponde: any;
  errato: any;
  mess_wa:any;
  email:any;
  valutazione: any;
  name: any = 'World';
  id_chiamata: any;
  val: boolean;
  start: boolean = false;
  start_stop_button: boolean = true;
  chiamateAperte: any;
  sempreAperta: any;
  secondi: any;
  aggiungiChiamata: any;
  dialogRef: any;
  avvio: any = '0';
  countDown: Subscription;
  counter =0;
  tick = 1000;
  tipologiechiamate:any;
  @ViewChild(MatMenuTrigger) ddTrigger: MatMenuTrigger;
  /* @HostListener('window:keyup.esc') onKeyUp() {
    let cn = confirm('Sure ?')
    if (cn) {
      this.dialogRef.close();
    }
  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    console.log('event:', event);
    event.returnValue = false;
  } */

  //public displayedColumns = ['id', 'note', 'user_id', 'action'];
  displayedColumns: string[] = ['note', 'action'];
  //public dataSource = new MatTableDataSource();




  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private ammservice: AmministratoriService, private service: ContattiService, public dialoginput: MatInputModule, private dialog: MatDialog,
    private snackBar: MatSnackBar) {
    this.chiamate = new Array<chiamate>();
    if (this.id_ruolo == 3) {
      this.esterno = true;
    } else {
      this.esterno = false;
    }
    this.service.operatore.subscribe((id_operatore)=>{
      this.selectOperatore.setValue(id_operatore);
    })
    

  }
  ngOnInit(): void {
    this.checkChiamateAperte(this.user, this.avvio);
    //this.admin='3';
    //console.log('user' + this.user);

    //  //console.log('amministratore'+ this.admin);

  }
  ngAfterViewInit() {
    this.loadAmministratore()
    this.loadIdraulico()
    this.loadChiamate()
    this.loadselectedAdmin()
    this.loadselectedIdraulico()
   this.loadTipologieChiamata()
  }
  ngOnDestroy() {
    this.countDown = null;
  }
  // openDialog() {
  // const dialogRef = this.dialog.open(ConfirmationDialog, { disableClose: true });
  //}

  /*openDialog() {
    this.dialog.open(ConfirmationDialog,
      {
        disableClose: true,
        width: '600px',
        data: { callback: this.callBack.bind(this), defaultValue: this.aggiungiChiamata }
      });
    this.startChiamata(this.user);

  }
  callBack(aggiungiChiamata: string) {
    this.name = aggiungiChiamata;
    this.addChiamata(this.user, this.id_chiamata, aggiungiChiamata);
    this.dialog.closeAll();
  }*/

  checkChiamateAperte(id, avvio) {
    this.countDown = null;
    this.service.checkChiamateAperte(this.user)
      .subscribe({
        next: (response => {
          this.chiamateAperte = response;
          console.log(this.chiamateAperte);
          this.sempreAperta = this.chiamateAperte.map(t => t.chiusa);
          console.log(this.sempreAperta);
          if (this.sempreAperta == '0') {
            this.id_chiamata = this.chiamateAperte.map(t => t.id);
            this.id_chiamata = this.id_chiamata[0];
            this.aggiungiChiamata = this.chiamateAperte.map(t => t.note);
            this.aggiungiChiamata = this.aggiungiChiamata;
            this.secondi = this.chiamateAperte.map(t => t.secondi);
            this.counter = this.secondi;

            this.aggiungiChiamata = this.aggiungiChiamata[0];
            this.start = true;
            this.start_stop_button = false;
            this.operatore = localStorage.getItem("id");
            this.avvio = '1';
            this.startcounter();
          }

          // this.operatore = this.chiamate.map(t => t.operatore);
        }),
        error: err => {
          alert(`Error ${err}!`);
        }
      });

  }

  startChiamata(id, avvio,tipo): void {
    
    this.operatore = localStorage.getItem("id");
    this.start = true;
    this.start_stop_button = false;
    this.aggiungiChiamata = '';
    this.avvio = '1';
    
      console.log(tipo);
    
    //console.log(this.aggiungiChiamata.value);
    // console.log(aggiungiChiamata);
    //console.log(this.operatore);
    this.service.startChiamata(id, this.operatore,tipo).subscribe((res: any) => {
      //console.log('Post updated successfully!');
      // console.log(res[0]);
      this.id_chiamata = res[0];
      if (res[0] == "KO") {
        alert(res[1]);
      } else {
        this.loadChiamate();
       this.startcounter();
        //this.aggiungiChiamata.reset();
        this.loadselectedAdmin();
      }
      //this.router.navigateByUrl('post/index');
    })
    //console.log('update chiamata');
  }
  startcounter(){
    this.durataChiamata();
  }
  stopcounter(){
    this.counter=0;
      this.countDown.unsubscribe();
      console.log(this.countDown)
      this.avvio=0;
  }
  stopChiamata(id): void {
    
    this.operatore = localStorage.getItem("id");
    this.start = false;
    this.start_stop_button = true;
    this.operatore = localStorage.getItem("id");
    this.stopcounter();
    this.service.stopChiamata(id, this.id_chiamata, this.operatore, this.aggiungiChiamata).subscribe((res: any) => {
      //console.log('Post updated successfully!');
      if (res[0] == "KO") {
        alert(res[1]);
      } else {
        if(res[1]==0){
        const dialogRef = this.dialog.open(DialogConfirmComponent, {
          data: { message: this.nome_operatore+' Ricordati di recensire il contatto!! Cordiali saluti Michele Cerone' },
        });
      }
        this.counter = 0;
        // alert(res[1]);
        this.checkChiamateAperte(id, this.avvio);
        this.loadChiamate();
        //this.aggiungiChiamata.reset();
        this.loadselectedAdmin();
        this.non_risponde = false;
      }
      
      //this.router.navigateByUrl('post/index');
    })
  }
  autoSaveChiamata(id): void {
    this.operatore = localStorage.getItem("id");
    console.log(this.aggiungiChiamata);
    console.log(this.id_chiamata);
    console.log(this.user);
    this.addChiamata();
  }

  addChiamata(): void {
    this.operatore = localStorage.getItem("id");
    this.service.addChiamata(this.user, this.id_chiamata, this.operatore, this.aggiungiChiamata).subscribe((res: any) => {
      //console.log('Post updated successfully!');
      if (res[0] == "KO") {
        alert(res[1]);
      } else {
        // alert(res[1]);
        this.checkChiamateAperte(this.user, this.avvio);
        this.loadChiamate();
        //this.aggiungiChiamata.reset();
        this.loadselectedAdmin();
      }
      //this.router.navigateByUrl('post/index');
    })
    //console.log('update chiamata');
  }

  durataChiamata() {
if(this.avvio==1){
    this.countDown = timer(0, this.tick).subscribe((count) => {
      /* if (this.counter == 0 && count) {
        console.log('timer completed', count, this.counter);
        if (this.countDown) {
          this.countDown.unsubscribe();
        }
      } */
      ++this.counter;

    });
  }
  }

  loadTipologieChiamata(): void {
    this.service.loadTipologieChiamata()
      .subscribe(response => {
        this.tipologiechiamate = response;
        console.log(this.tipologiechiamate)

      });
  }



  loadAmministratore(): void {
    this.ammservice.getAmministratori()
      .subscribe(response => {
        this.amministratori = response;
        //      //console.log('pippo' + this.amministratori);
        //      //console.log('dio boiaccio' + this.selected);

      });

  }


  


  loadselectedAdmin() {
    //console.log(this.user)
    this.service.getContatto(this.user)
      .subscribe(response => {
        this.contatti = response;
        this.amm_id = this.contatti.map(t => t.richiama_chi);
        //console.log(this.amm_id);
        this.selected = "" + this.amm_id;
        this.visibile = this.contatti.map(t => t.mostra_idraulico);
        this.nn_risponde = this.contatti.map(t => t.non_risponde);
        this.errato = this.contatti.map(t => t.errato);
        this.mess_wa = this.contatti.map(t => t.messaggio_wa);
        this.email = this.contatti.map(t => t.contattato_email);
        if (this.visibile == true) {
          this.checked = true;
        }
        if (this.nn_risponde == 'on') {
          this.non_risponde = true;
        }
        if (this.mess_wa == 'on') {
          this.messaggio_wa = true;
        }
        if (this.email == 'on') {
          this.contattato_email = true;
        }
        if (this.errato == 'on') {
          this.contatto_errato = true;
        }

        console.log(this.visibile)

      });

  }



  editAmministratore(): void {
    //console.log(this.selectOperatore.value);
    this.service.updateOperatore(this.user, this.selectOperatore.value).subscribe((res: any) => {
      //console.log('Post updated successfully!');
      //this.router.navigateByUrl('post/index');
      this.loadselectedAdmin();
    })

  }

  loadIdraulico(): void {
    this.ammservice.getIdraulici()
      .subscribe(response => {
        this.idraulici = response;
        //      //console.log('pippo' + this.amministratori);
        //      //console.log('dio boiaccio' + this.selected);

      });

  }
  loadselectedIdraulico() {
    //console.log(this.user)
    this.service.getContatto(this.user)
      .subscribe(response => {
        this.contatti = response;
        this.idraulico_id = this.contatti.map(t => t.id_idraulico);
        //console.log(this.idraulico_id);
        this.selected_idraulico = "" + this.idraulico_id;

      });

  }

  editIdraulico(): void {
    //console.log(this.selectIdraulico.value);
    this.service.updateIdraulico(this.user, this.selectIdraulico.value).subscribe((res: any) => {
      //console.log('Post updated successfully!');
      //this.router.navigateByUrl('post/index');
      this.loadselectedIdraulico();
    })

  }


  private loadChiamate() {
    this.service.getChiamateList(this.user)
      .subscribe({
        next: (response => {
          this.chiamate = response;
          //console.log(this.chiamate);
          this.dataSourceChiamate = new MatTableDataSource(this.chiamate);
          // this.operatore = this.chiamate.map(t => t.operatore);
        }),
        error: err => {
          alert(`Error ${err}!`);
        }
      });
  }

  applyFilter(filterValue: string) {
    //debugger;
    /* filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue; */
    this.dataSourceChiamate.filter = filterValue.trim().toLowerCase();
  }

  deleteChiamata(id: number) {
    if (window.confirm('Sei sicuro ?')) {
      this.service.deleteChiamata(id).subscribe(res => {
        if (res[0] == "KO") {
          alert(res[1]);
        } else {
          this.loadChiamate();
          this.start = false;
          this.start_stop_button = true;
          this.aggiungiChiamata = '';
        }
        //console.log(res);
      });
    }
  }


  updateChiamata(chiamate: chiamate) {
    this.service.updateChiamata(chiamate).subscribe({
      next: (value => {
        //console.log('Post updated successfully!');
      }),
      error: (err => {
        alert('errore');
      })
    })
    //console.log('update chiamata');
  }




  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }
  updateVisibility(event) {
    if (window.confirm('Sei sicuro ?')) {
      console.log(event.checked)
      this.service.updateVisibilityDett(this.user, event.checked).subscribe((res: any) => {
      })
    }
  }

  onCheckedNnRisponde(event) {
    //console.log(event.checked);
    //console.log("value changed");
    this.service.updateNnRisponde(this.user, event.checked,this.operatore).subscribe((res: any) => {
    })

  }
  onCheckedContattoMessaggioWA(event) {
    //console.log(event.checked);
    //console.log("value changed");
    this.service.updateMessaggioWA(this.user, event.checked,this.operatore).subscribe((res: any) => {
    })

  }
  onCheckedContattoEmail(event) {
    //console.log(event.checked);
    //console.log("value changed");
    this.service.updateEmail(this.user, event.checked,this.operatore).subscribe((res: any) => {
    })

  }
  onCheckedContattoErrato(event) {
    //console.log(event);
    // console.log("value changed");
    this.service.updateContattoErrato(this.user, event.checked,this.operatore).subscribe((res: any) => {
    })
  }

}


export interface Element {
  attivo: number;
  cognome_amm: string;
  data_chiamata: Date;
  id: number;
  id_amm: number;
  nome_amm: string;
  note: string;
  operatore: number;
  password_amm: string;
  ruolo_amm: string;
  user_id: number;
  username_amm: string;
}


/* // POPUP NUOVA CHIAMATA
export type DialogDataSubmitCallback<T> = (row: T) => void;

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'nuova-chiamata.html',
})
export class ConfirmationDialog implements OnInit {
  //aggiungiChiamata: FormControl = new FormControl('');
  val: boolean = false;

  //constructor(
  //public dialogRef: MatDialogRef<ConfirmationDialog>) { }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { callback: DialogDataSubmitCallback<any>; defaultValue: any },
    private dialogRef: MatDialogRef<ConfirmationDialog>
  ) { }


  onYesClick(): void {
    this.dialogRef.close(true);
  }

  ngOnInit() {
    this.dialogRef.disableClose = true;
    this.dialogRef.backdropClick().subscribe(_ => {
      let cn = confirm('Sei sicuro? non hai chiuso la chiamata')
      if (cn) {
        this.dialogRef.close();
      }
    })
  }

} */

@Pipe({
  name: 'formatTime',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: number): string {
    // 2
    var hours = Math.floor(value / 60 / 60);

    // 37
    var minutes = Math.floor(value / 60) - (hours * 60);

    // 42
    var seconds = value % 60;
    return (
      ('00' + hours).slice(-2) +
      ':' +
      ('00' + minutes).slice(-2) +
      ':' +
      ('00' + Math.floor(value - minutes * 60)).slice(-2)
    );
  }
}
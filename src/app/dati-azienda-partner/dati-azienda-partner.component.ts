import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { DatiPartner } from '../services/dati-partner.service';
import { GlobalComponent } from '../global-component';


@Component({
  selector: 'app-dati-azienda-partner',
  templateUrl: './dati-azienda-partner.component.html',
  styleUrls: ['./dati-azienda-partner.component.css']
})
export class DatiAziendaPartnerComponent implements OnInit {

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, public route: ActivatedRoute, public router: Router, public datipartnerservice: DatiPartner) { }


  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
  session: any = localStorage.getItem("name");
  operatore: any = localStorage.getItem("id");
  nome_operatore: any = localStorage.getItem("nome");
  cognome_operatore: any = localStorage.getItem("cognome");
  id_ruolo: any = localStorage.getItem("id_ruolo");
  datipartners: any;
  editdatipartner: boolean = false
  showdatipartner: boolean = false
  formEdit: UntypedFormGroup = new UntypedFormGroup({});
  formAdd: UntypedFormGroup = new UntypedFormGroup({});
  count: boolean;
  progressShow: boolean = false;
  progress: number;

  error: string;
  loghi: any;
  showupload: boolean = false;
  public files: any[] = [];


  ngOnInit(): void {
    this.formEdit = this.fb.group({
      'request': ['editDatiPartner'],
      'id': [this.operatore],
      testo: [null, [Validators.required, Validators.minLength(2)]],
      indirizzo: [null],
      cap: [null],
      provincia: [null],
      localita: [null],
      nazione: [null],
      partita_iva: [null],
      codice_fiscale: [null],
      codice_destinatario: [null],
      pec: [null]
    });
    this.formAdd = this.fb.group({
      'request': ['addDatiPartner'],
      'id': [this.operatore],
      testo: [null, [Validators.required, Validators.minLength(2)]],
      indirizzo: [null],
      cap: [null],
      provincia: [null],
      localita: [null],
      nazione: [null],
      partita_iva: [null],
      codice_fiscale: [null],
      codice_destinatario: [null],
      pec: [null]
    });


    this.getLogo()
    this.getDatiPartner()
  }
  public getDatiPartner() {
    console.log(this.operatore);
    this.datipartnerservice.getDatiPartner(this.operatore)
      .subscribe(response => {
        this.datipartners = response;
        this.count = this.datipartners.map(t => t.count);
        if (this.count == true) {
          this.showdatipartner = true;
        }
        console.log(this.datipartners)
      });


  }

  public showformmodifica() {
    this.editdatipartner = true;
  }




  private editDatiPartner(): void {
    this.datipartnerservice.updateDatiPartner(JSON.stringify(this.formEdit.value)).subscribe((res: any) => {
      this.getDatiPartner();
    })
    this.editdatipartner = false;
  }

  public addDatiPartner() {
    console.log(this.formAdd.value)
    this.datipartnerservice.addDatiPartner(JSON.stringify(this.formAdd.value)).subscribe((res: any) => {
      this.getDatiPartner();
    })
  }

  onFileChangeAllegato(pFileList: File[]) {
    this.files = Object.keys(pFileList).map(key => pFileList[key]);

    let formData = new FormData();
    for (let file of this.files) {
      formData.append('file[]', file);
    }
    // formData.append('file', this.files[0]);
    formData.append('request', "UPLOAD");
    formData.append('user', this.operatore);
    formData.append('partner', "true");
    formData.append('logo', "1");
    this.http.post('https://gestionalecero.it/gest_2022/upload.php', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if (events.type == HttpEventType.UploadProgress) {
          this.progressShow = true;
          this.progress = Math.round(events.loaded / events.total * 100);
          ////console.log(this.progress);
        } else if (events.type === HttpEventType.Response) {
          let res = events.body;
          this.progressShow = false;

          if (res[0] == "OK") {
            this.files = new Array();
            this.getLogo()
          } else {
            this.error = res[1];
          }
        }
      });
    //console.log(this.files);
  }

  private getLogo() {
    this.datipartnerservice.getLogo(this.operatore)
      .subscribe({
        next: (response => {
          this.loghi = response;
          if (this.loghi.length === 0) {
            this.showupload = false;
          } else {
            this.showupload = true;
          }

          // this.operatore = this.chiamate.map(t => t.operatore);
        }),
        error: err => {
          alert(`Error ${err}!`);
        }
      });
  }


  deleteLogo(id){
    if (window.confirm('Sei sicuro ?')) {
      this.datipartnerservice.deleteLogo(id).subscribe(res => {
        if (res[0] == "KO") {
          alert(res[1]);
        } else {
          this.getLogo();
        }
        //console.log(res);
      });
    }
  } 

}

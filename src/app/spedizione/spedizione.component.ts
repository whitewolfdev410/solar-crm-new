import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { SpedizioneService } from '../services/spedizione.service';
import { ProvinceService } from '../services/province.service';
import { MatExpansionPanel } from '@angular/material/expansion';


@Component({
  selector: 'app-spedizione',
  templateUrl: './spedizione.component.html',
  styleUrls: ['./spedizione.component.css']
})
export class SpedizioneComponent implements OnInit {

  @Input() user: any;
  @Input() operatore: any;
  dettaglio: boolean = false;
  spedizioni: any;
  province: any;
  datiSpedizione: UntypedFormGroup;
  selected = new UntypedFormControl();
  formSpedizioni: UntypedFormGroup;
  formSpedizioniAdd:UntypedFormGroup;
  panelOpenState:boolean=false;

  @ViewChild('pannelloAdd') firstPanel: MatExpansionPanel;

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private spedizione: SpedizioneService, private Location: Location, public dialog: MatDialogModule, public matinput: MatInputModule, private service: ProvinceService) {
     this.formSpedizioniAdd = this.fb.group({
      // 'request': ['AddUpdateDatiFatturazione'],
      'request': ['AddSpedizione'],
      'id': [],
      'id_utente': [this.user],
      'destinatario': [''],
      'riferimento': [''],
      'indirizzo': [''],
      'provinciaAdd': [''],
      'cap': [''],
      'localita': [''],
      'telefono': [''],
      'orario_consegna': [''],
    });

    this.formSpedizioni = this.fb.group({
      spedizioniArray: this.fb.array([])
    });
  }

  ngOnInit(): void {
    if (this.Location.path() == '/dettaglio-contatto/' + this.user) {
      this.dettaglio = true;
    }
    
  
  }
  ngAfterViewInit() { 
    this.loadDatiSpedizioneDettaglioContatto()
    this.getProvince();
   }

  setFormArray(data: any[]): void {
    const fgs = data.map((item, index) =>


      this.fb.group({
        //age: [{ value: item.age, disabled: false }, Validators.required],
        //sex: [{ value: item.sex, disabled: false }, Validators.required],
        request: ['UpdateDatiSpedizione'],
        id: [{ value: item.id, disabled: false }, Validators.required],
        id_utente: [{ value: item.id_utente, disabled: false }, Validators.required],
        destinatario: [{ value: item.destinatario, disabled: false }, Validators.required],
        riferimento: [{ value: item.riferimento, disabled: false }, Validators.required],
        indirizzo: [{ value: item.indirizzo, disabled: false }, Validators.required],
        provincia: [{ value: item.provincia, disabled: false }, Validators.required],
        cap: [{ value: item.cap, disabled: false }, Validators.required],
        localita: [{ value: item.localita, disabled: false }, Validators.required],
        telefono: [{ value: item.telefono, disabled: false }, Validators.required],
        orario_consegna: [{ value: item.orario_consegna, disabled: false }, Validators.required]
      })

    );

    const fa = this.fb.array(fgs);
    this.formSpedizioni.setControl("spedizioniArray", fa);
   // console.log("init formGroup: ", this.formSpedizioni);
  }
  public loadDatiSpedizioneDettaglioContatto() {
    this.spedizione.getDatiSpedizioneDettaglio(this.user)
      .subscribe(response => {
        this.spedizioni = response;
       // console.log(this.spedizioni);
        this.setFormArray(this.spedizioni);
      });


  }
  updateField(field,element,id){
    this.spedizione.updateSpedizioneField(field, element, id).subscribe({
      next: (value => {
        console.log('Post updated successfully!');
      }),
      error: (err => {
        alert('errore');
      }) 
    })
  }
  updateDatiSpedizione({ value, valid }): void {
    console.log("submit form: ", value);
    /*  this.spedizione.updateSpedizione(this.datiSpedizione).subscribe({
       next: (value => {
         //console.log('Post updated successfully!');
       }),
       error: (err => {
         alert('errore');
       }) 
     })*/
    //console.log('update chiamata');
  }

  addSpedizione (): void {
    //console.log("submit form: ", value);
    // console.log(this.datiFatturazioneAdd.value);
    this.spedizione.AddDatiSpedizione(JSON.stringify(this.formSpedizioniAdd.value)).subscribe((res: any) => {
      this.loadDatiSpedizioneDettaglioContatto()
      this.firstPanel.toggle();
    })
  }

  getProvince() {
    this.service.getProvince()
      .subscribe(response => {
        this.province = response;
      });
  }

}

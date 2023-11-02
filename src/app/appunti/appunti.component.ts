import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, HostListener, ViewChild } from '@angular/core';
import { FormArray, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AmministratoriService } from '../services/amministratori.service';
import { ContattiService } from '../services/contatti.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { chiamate } from '../models/chiamate.model';
import {MatInputModule} from '@angular/material/input';
import { observable } from 'rxjs';
import * as moment from 'moment';


@Component({
  selector: 'app-appunti',
  templateUrl: './appunti.component.html',
  styleUrls: ['./appunti.component.css']
})
export class AppuntiComponent implements OnInit {
  @Input() user: any;
  @Input() admin: string;
  @Input() data_lavori: Date;
  
  edit_chiamata: string = "none";
  operatore: any;
  amm: any;
  amministratori: any;
  idraulici: any;
  amministratore: any;
  appunti: Array<chiamate>;
  formNewContact: any;
  formEditAmministrat: UntypedFormGroup;
  selected: string;
  selected_idraulico: string;
  selectOperatore: UntypedFormControl = new UntypedFormControl();
  selectIdraulico: UntypedFormControl = new UntypedFormControl();
  f_edit_chiamata: boolean = true;
  edit_chiam: string = "none";
  edit_field_chiamata: string = "none";
  aggiungiAppunto: UntypedFormControl = new UntypedFormControl();
  nomeOperatore: string;
  chiamataField: UntypedFormControl = new UntypedFormControl();
  dataSourceChiamate: any;
  contatti: any;
  amm_id: any;
  idraulico_id: any;
  esterno: boolean;
  id_ruolo: any = localStorage.getItem("id_ruolo");
  visibile: boolean;
  checked: boolean;
  datalavori:any;
  non_risponde:boolean;
  contatto_errato:boolean;
  nn_risponde:any;
  errato:any;
  appunto:any;


  //public displayedColumns = ['id', 'note', 'user_id', 'action'];
  displayedColumns: string[] = ['note', 'action'];
  //public dataSource = new MatTableDataSource();


  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private ammservice: AmministratoriService, private service: ContattiService, public dialog: MatInputModule) {
    this.appunti = new Array<chiamate>();
    if (this.id_ruolo == 3) {
      this.esterno = true;
    } else {
      this.esterno = false;
    }
    
  }



  ngOnInit(): void {
    //this.admin='3';
    //console.log('user' + this.user);

    //  //console.log('amministratore'+ this.admin);

  }
  ngAfterViewInit() {
    this.loadAmministratore()
    this.loadAppunti()
  }


  loadAmministratore(): void {
    this.ammservice.getAmministratori()
      .subscribe(response => {
        this.amministratori = response;
        //      //console.log('pippo' + this.amministratori);
        //      //console.log('dio boiaccio' + this.selected);

      });

    
     
    
  }    
    
      private loadAppunti() {
        this.service.loadAppunti(this.user)
          .subscribe({
            next: (response => {
              this.appunto = response;
              //console.log(this.chiamate);
              this.dataSourceChiamate = new MatTableDataSource(this.appunto);
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
    
      deleteAppunto(id: number) {
        if (window.confirm('Sei sicuro ?')) {
          this.service.deleteAppunto(id).subscribe(res => {
            if (res[0] == "KO") {
              alert(res[1]);
            } else {
              this.loadAppunti();
            }
            //console.log(res);
          });
        }
      }
    
    
      updateAppunto(appunto: chiamate) {
        this.service.updateAppunto(appunto).subscribe({
          next: (value => {
            //console.log('Post updated successfully!');
          }),
          error: (err => {
            alert('errore');
          })
        })
        //console.log('update chiamata');
      }
    
    
    
      addAppunto(id): void {
        this.operatore = localStorage.getItem("id");
        //console.log(this.aggiungiChiamata.value);
        //console.log(id);
        //console.log(this.operatore);
        this.service.addAppunto(id, this.operatore, this.aggiungiAppunto.value).subscribe((res: any) => {
          //console.log('Post updated successfully!');
          if (res[0] == "KO") {
            alert(res[1]);
          } else {
            this.loadAppunti();
            this.aggiungiAppunto.reset();
          }
          //this.router.navigateByUrl('post/index');
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

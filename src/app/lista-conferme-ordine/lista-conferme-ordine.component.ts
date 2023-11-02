import { HttpClient } from '@angular/common/http';
import { Component, Input, Injector, OnInit, Inject, } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfermeService } from '../services/conferme.service';
import { Location } from '@angular/common';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import{ GlobalComponent } from '../global-component';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { Conferma } from '../models/conferma.model';
import { MatTableDataSource } from '@angular/material/table';
import { PreventiviService } from '../services/preventivi.service';
import {MatInputModule} from '@angular/material/input';





@Component({
  selector: 'app-lista-conferme-ordine',
  templateUrl: './lista-conferme-ordine.component.html',
  styleUrls: ['./lista-conferme-ordine.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*', minHeight: "*"})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})


export class ListaConfermeOrdineComponent implements OnInit {
  dev = GlobalComponent.dev;
  @Input() operatore: any;
  @Input() tipo: any;
  @Input() user: any;
  assegnabile: any = localStorage.getItem("assegnabile");
  id_operatore: any = localStorage.getItem("id");
  dettaglio: boolean = false;
  conf: any;
  //id_conferma: any;
  panelOpenState = false;
 
 
  nota: Array<Conferma>;
  noteConferma: UntypedFormControl = new UntypedFormControl();

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private conferma: ConfermeService, private Location: Location, public dialog: MatDialog, public matinput: MatInputModule) {

    this.nota = new Array<Conferma>();

   }

  ngOnInit(): void {
    if (this.Location.path() == '/dettaglio-contatto/' + this.user) {
      this.dettaglio = true;
     
    }
  }
  ngAfterViewInit() { 
    if (this.Location.path() == '/dettaglio-contatto/' + this.user) {
      this.ListConfermeDettaglioContatto();
    }
   }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

  

  private ListConfermeDettaglioContatto() {
    this.conferma.getConfermeList(this.user, this.assegnabile,this.id_operatore)
      .subscribe({
        next: (response => {
          this.conf = response;
          console.log(this.conf);
        }),
        error: err => {
          alert(`Error ${err}!`);
        }
      });
  }



  updateNote(nota: Conferma) {
    this.conferma.updateNota(nota).subscribe({
      next: (value => {
        console.log('Post updated successfully!');
      }),
      error: (err => {
        alert('errore');
      })
    })
    //console.log('update nota');
  }
 
}

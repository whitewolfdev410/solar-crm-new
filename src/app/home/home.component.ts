import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { Listino } from '../models/listino.model';
import { AmministratoriService } from '../services/amministratori.service';
import { HomeService } from '../services/home.service';
import { ListinoService } from '../services/listino.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})


export class HomeComponent implements OnInit {
  displayedColumns = ['id', 'name', 'price', 'action'];
  dataSource: Listino[] = []
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
  contatti_campione: any;
  currentUpdateIndex = -1

  constructor(public dialog: MatDialog, public http: HttpClient, private snackBar: MatSnackBar, public route: ActivatedRoute, public router: Router, private ammservice: AmministratoriService, private listinoService: ListinoService, private homeservice: HomeService) { }

  ngOnInit(): void {
    this.listaRichiamare();
    this.listaCampioni();
    this.loadAmministratore()
    this.loadListini();
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
      });
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }
    return null;
  }

  add() {
    this.dataSource.push({
      id: 0,
      name: '',
      price: 0
    })
    this.dataSource = [...this.dataSource]
  }

  deleteRow(element: any, index: number) {

    const dialogRef = this.dialog.open(DialogConfirmComponent, {
      data: { message: 'Confermi di voler rimuovere il servizio?' },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result)
        return
      if (index > 0) {
        this.listinoService.delete(element).subscribe((response) => {
          this.dataSource.splice(index, 1);
          this.dataSource = [...this.dataSource]
          this.openSnackBar('Il servizio è stato rimosso', 'Conferma')
        })
      } else {
        this.dataSource.splice(index, 1);
        this.dataSource = [...this.dataSource]
      }
    });

  }

  loadListini() {
    this.listinoService.all().subscribe((response) => {
      this.dataSource = [...response.data]
    })
  }

  save(element: Listino, index: number) {
    (element.id == 0 ? this.listinoService.create(element) : this.listinoService.update(element)).subscribe((response) => {
      this.openSnackBar('Il listino è stato aggiornato', 'Conferma')
      if (this.currentUpdateIndex == index)
        this.currentUpdateIndex = -1
      this.dataSource[index] = response.data
      this.dataSource = [...this.dataSource]
    })
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }


}

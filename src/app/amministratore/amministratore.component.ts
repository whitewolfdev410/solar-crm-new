import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { UntypedFormGroup, FormControl, Validators, UntypedFormBuilder } from '@angular/forms';
import { User } from '../models/amministratore.model';
import { Ruoli } from '../services/ruoli.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sondaggi } from '../services/sondaggi.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-amministratore',
  templateUrl: './amministratore.component.html',
  styleUrls: ['./amministratore.component.css']
})
export class AmministratoreComponent implements OnInit {
  loading: boolean = false;
  form: UntypedFormGroup;
  users: User[] = new Array();
  name: any;
  ruoli: any;
  dataSourceAmministratori: any;
  sondaggi:any;
  session: any = localStorage.getItem("name");
  operatore: any = localStorage.getItem("id");
  id_ruolo: any = localStorage.getItem("id_ruolo");
  nome_operatore: any = localStorage.getItem("nome");
  cognome_operatore: any = localStorage.getItem("cognome");
  ruolo_operatore: any = localStorage.getItem("ruolo");

  displayedColumns: string[] = ['attivo', 'nome', 'cognome', 'ruolo', 'username', 'password', 'telefono', 'sondaggio', 'action'];
  dataSource = new MatTableDataSource();
  //  provinceService:any = new ProvinceService();

  


  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  constructor(public http: HttpClient, public fb: UntypedFormBuilder, public route: ActivatedRoute, public router: Router, public ruoliservice: Ruoli, public sondaggio: Sondaggi,public dialog: MatDialog) {



    this.form = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'nome': ['', Validators.required],
      'cognome': ['', Validators.required],
      'telefono': ['', Validators.required],
      'attivo': [true, Validators.requiredTrue],
      'ruolo': ['', Validators.required],
    });


  }

  ngOnInit(): void {
    this.loadAmministratori();
    this.loadRuoli();
  }
  loadAmministratori(): void {
    this.loading = true;
    console.log(this.ruolo_operatore);
    if(this.ruolo_operatore=='Amministratore'){
      this.http.get<User[]>('https://gestionalecero.it/gest_2022/index.php?request=users').subscribe(res => {
        this.users = res;
        //console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = res;
        //console.log(this.dataSource);
        this.loading = false;
      });
    }else{
      this.http.get<User[]>('https://gestionalecero.it/gest_2022/index.php?request=userDett&id='+this.operatore).subscribe(res => {
        this.users = res;
        //console.log(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.data = res;
        //console.log(this.dataSource);
        this.loading = false;
      });
    }
    
  }



  attiva(id) {
    this.http.get<User[]>('https://gestionalecero.it/gest_2022/index.php?request=attiva&amministratore=' + id).subscribe(res => {
      this.users = res;

    });

  }
  disattiva(id) {
    this.http.get<User[]>('https://gestionalecero.it/gest_2022/index.php?request=disattiva&amministratore=' + id).subscribe(res => {
      this.users = res;

    });

  }
  eliminaUtente(id) {
    this.http.get<User[]>('https://gestionalecero.it/gest_2022/index.php?request=eliminautente&amministratore=' + id).subscribe(res => {
      this.users = res;
      this.loadAmministratori();
    });

  }
  createAmministratore(): void {
    this.loading = true;
    if (!this.form.valid) {
      alert("compilare tutti i campi obbligatori!");
      this.loading = false;
      return;
    }
    this.http.post('https://gestionalecero.it/gest_2022/post.php', {
      request: 'createUser',
      username: this.form.controls['username'].value,
      password: this.form.controls['password'].value,
      nome: this.form.controls['nome'].value,
      cognome: this.form.controls['cognome'].value,
      telefono: this.form.controls['telefono'].value,
      attivo: this.form.controls['attivo'].value,
      ruolo: this.form.controls['ruolo'].value
    }).subscribe(res => {
      //console.log(res);
      this.form.reset();
      this.loading = false;
      this.loadAmministratori();
    });
  }


  loadRuoli(): void {
    this.ruoliservice.getRuoli()

      .subscribe(response => {

        this.ruoli = response;
        console.log(this.ruoli);
      });
  }
  applyFilter(fevent: Event) {
    const filterValue = (event!.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  dataSourceSondaggio = new MatTableDataSource();

  

    
    

  openDialog(id,nome,cognome): void {
    const dialogRef = this.dialog.open(Sondaggiodialog, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data:{ id: id, nome: nome,cognome:cognome }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    // this.animal = result;
    });
    
  }
  


}

@Component({
  selector: 'Sondaggiodialog',
  templateUrl: 'sondaggio-dialog.html',
})
export class Sondaggiodialog implements OnInit{
  displayedColumnsSondaggio: string[] = ['nome','simpatia','disponibilita','competenza','puntualita','data'];
  dataSourceSondaggio = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  sondaggi: any;
  nome:any;
  cognome:any;
  //  provinceService:any = new ProvinceService();


  constructor(public dialogRef: MatDialogRef<Sondaggiodialog>,
    @Inject(MAT_DIALOG_DATA) public data: AmministratoreComponent,
     public sondaggio: Sondaggi) {
    }

    ngOnInit(): void {
      this.nome=this.data['nome'];
      this.cognome=this.data['cognome'];
      this.loadSondaggi(this.data['id'])
    }

    validDateFormat(dateString) {
      if (dateString) {
        return dateString.replace(/\s/, 'T');
      }
      return null;
    }
    
    loadSondaggi(id){
      this.sondaggio.loadsondaggi(id)
        .subscribe(res => {
          this.sondaggi = res;
          console.log(this.sondaggi)
          this.dataSourceSondaggio.paginator = this.paginator;
          this.dataSourceSondaggio.sort = this.sort;
          this.dataSourceSondaggio.data = this.sondaggi;
         
        });
      }
      applyFilterSondaggio(fevent: Event) {
        const filterValue = (event!.target as HTMLInputElement).value;
        this.dataSourceSondaggio.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSourceSondaggio.paginator) {
          this.dataSourceSondaggio.paginator.firstPage();
        }
      }
   

  onNoClick(): void {
    this.dialogRef.close();
  }

}
import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/common';
import { GlobalComponent } from '../global-component';
import { Ruoli } from '../services/ruoli.service';
import { Menu } from '../models/menu.model';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { ContattiService } from '../services/contatti.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  elem: any;
  @Input() headerShow;
  ruolo: boolean;
  ruoloa: any;
  //id_ruolo:any;
  fullscreen: boolean;
  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
  id_ruolo = GlobalComponent.key_ruolo;
  assegnabile: any;
  parent_id: any;
  menuitems: any;
  nestedDataSource: any = new MatTreeNestedDataSource<Menu>();
  nestedTreeControl = new NestedTreeControl<Menu>(node => node.submenu);
  anno_globale = localStorage.getItem("anno_globale");
  anni: any;
  notifiche: any;
  //subheaderShow: boolean = false;
  name: any
  badgeCount = 0;
  operatore: any = localStorage.getItem("id");
  containerNotifiche:boolean=false;
  dialogRef: any;

  constructor(@Inject(DOCUMENT) private document: any, public http: HttpClient, public route: ActivatedRoute, public router: Router, private Location: Location, public ruoliservice: Ruoli, private service: ContattiService,public dialoginput: MatInputModule, private dialog: MatDialog,
  private snackBar: MatSnackBar) {
    if (!this.dev) {
      this.name = localStorage.getItem("name");
      this.ruoloa = localStorage.getItem("ruolo");
      this.id_ruolo = localStorage.getItem("id_ruolo");
      this.assegnabile = localStorage.getItem("assegnabile");
      this.http.post("https://gestionalecero.it/gest_2022/session/session.php", {
        request: "check"
      }).subscribe(res => {
        if (res[0] == "KO") {
          ////console.log(localStorage);
          localStorage.removeItem("");
          this.router.navigate(['/']);
          //this.headerShow = false;
        } else {
          this.ruoloa = localStorage.getItem("ruolo");
          this.id_ruolo = localStorage.getItem("id_ruolo");
          this.name = localStorage.getItem("name");
          if (this.name) {
            this.headerShow = true
          }
          //console.log(this.name);
        }
      });
      if (localStorage.getItem("ruolo") == 'Amministratore') {
        this.ruolo = true;
      }
    } else {
      //this.name='michele.cerone1977@gmail.com';
      this.headerShow = true;
      this.ruolo = true;
    }
  }

  ngOnInit(): void {
    this.elem = document.documentElement;
    //console.log('router ' + this.Location.path());
    this.loadMenuItems()
    //login
    const currentYear = (new Date()).getFullYear();
    const range_date = (start, stop, step) => Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + (i * step));
    //this.getDaysArray(currentYear, 2010)
    //console.log(range_date(currentYear, 2010, -1));
    const range = (start, end) => Array.from(Array(end - start + 1).keys()).map(x => x + start);
    //console.log(range(2010, currentYear));
    this.anni = range(2010, currentYear);
    this.loadNotifiche();

  }

/* openDialog() {
   const dialogRef = this.dialog.open(ConfirmationDialog, { disableClose: true });
  } */

  openDialog() {
    this.dialog.open(ConfirmationDialog,
      {
        
        disableClose: true,
        width: '600px',
        data: { callback: this.callBack.bind(this), defaultValue: this.notifiche }
      });
    //this.startChiamata(this.user);

  }
  callBack(aggiungiChiamata: string) {
    this.name = aggiungiChiamata;
   // this.addChiamata(this.user, this.id_chiamata, aggiungiChiamata);
    this.dialog.closeAll();
  }



  loadNotifiche(){
    this.service.loadNotifiche(this.operatore)
      .subscribe(response => {
        this.notifiche = response;
        this.badgeCount=this.notifiche.length;
        console.log(this.notifiche.length);
        console.log(this.notifiche);
        if(this.notifiche.length!=0){
        //this.openDialog()
      }
        //      //console.log('pippo' + this.amministratori);
        //      //console.log('dio boiaccio' + this.selected);

      });

  }
  clearNotfiche() {
    this.badgeCount = 0;
    this.containerNotifiche=true;
  }  

  setAnnoGlobale(anno) {
    console.log(anno);
    localStorage.setItem("anno_globale", anno);
    window.location.reload();
  }

  goToContactList() {
    this.router.navigate(['/home'])
      .then(() => {
        window.location.reload();
      });
  }

  loadMenuItems() {
    this.ruoliservice.getMenuItems()
      .subscribe(response => {
        this.menuitems = response;
        this.parent_id = this.menuitems.map(t => t.id_menu);
        this.nestedDataSource.data = response;
        //console.log(this.id_ruolo);
        //this.loadSubMenuItems(this.parent_id);
      });
  }


  logout() {
    this.http.post("https://gestionalecero.it/gest_2022/session/session.php", {
      request: "logout"
    }).subscribe(res => {
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      localStorage.removeItem('nome');
      localStorage.removeItem('cognome');
      localStorage.removeItem('ruolo');
      localStorage.removeItem('id_ruolo');
      localStorage.clear();
      this.router.navigate(['/'])
        .then(() => {
          window.location.reload();
        });
      this.headerShow = false;



      //this.subheaderShow = false;
    })
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.fullscreen = true;
  }
  /* Close fullscreen */
  closeFullscreen() {
    if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
    }
    this.fullscreen = false;
  }


}

// POPUP NUOVA CHIAMATA
export type DialogDataSubmitCallback<T> = (row: T) => void;

@Component({
  selector: 'confirmation-dialog',
  templateUrl: 'chiamata_aperta.html',
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

}

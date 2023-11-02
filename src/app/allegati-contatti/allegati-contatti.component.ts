import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContattiService } from '../services/contatti.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-allegati-contatti',
  templateUrl: './allegati-contatti.component.html',
  styleUrls: ['./allegati-contatti.component.css']
})
export class AllegatiContattiComponent implements OnInit {
  @Input() user: any;
  allegati: any;
  public files: any[] = [];
  toUpload: any = new Array();
  error: string;
  progress: number;
  progressShow:boolean=false;


  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private service: ContattiService,private _snackBar: MatSnackBarModule, public dialog: MatDialogModule) { }

  ngOnInit(): void {
    //console.log(this.user);
    this.getListAllegati();
  }

  private getListAllegati() {
    this.service.getAllegatiList(this.user)
      .subscribe({
        next: (response => {
          this.allegati = response;
          console.log(this.allegati);

          // this.operatore = this.chiamate.map(t => t.operatore);
        }),
        error: err => {
          alert(`Error ${err}!`);
        }
      });
  }

  onFileChange(pFileList: File[]){
    this.files = Object.keys(pFileList).map(key => pFileList[key]);
    
    let formData = new FormData();
    for (let file of this.files) {
      formData.append('file[]', file);
  }
   // formData.append('file', this.files[0]);
    formData.append('request', "UPLOAD");
    formData.append('user', this.user);
    this.http.post('https://gestionalecero.it/gest_2022/upload.php', formData, {
      reportProgress: true,
      observe: 'events'
    })
      .subscribe(events => {
        if (events.type == HttpEventType.UploadProgress) {
          this.progressShow=true;
        this.progress = Math.round(events.loaded/events.total *100);
        ////console.log(this.progress);
        } else if (events.type === HttpEventType.Response) {
          let res = events.body;
          this.progressShow=false;

          if (res[0] == "OK") {
            this.files = new Array();
            this.getListAllegati()
          } else {
            this.error = res[1];
          }
        }
      });
    //console.log(this.files);


  }

  deleteAllegato(id){
    //alert(this.user);
    if (window.confirm('Sei sicuro ?' + id)) {
      this.service.deleteAllegato(id,this.user).subscribe(res => {
        if (res[0] == "KO") {
          alert(res[1]);
        } else {
          this.getListAllegati();
        }
        //console.log(res);
      });
    }
  }




}

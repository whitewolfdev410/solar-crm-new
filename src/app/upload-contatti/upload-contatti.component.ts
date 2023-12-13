import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContattiService } from '../services/contatti.service';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDialogModule} from '@angular/material/dialog';
import { Location } from '@angular/common';
import * as XLSX from 'xlsx';
import { GlobalComponent } from '../global-component';

type AOA = any[][];

@Component({
  selector: 'app-upload-contatti',
  templateUrl: './upload-contatti.component.html',
  styleUrls: ['./upload-contatti.component.css']
})
export class UploadContattiComponent implements OnInit {
  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
    progress: number;
  progressShow:boolean=false;
  progressShow_gen:boolean=false;
  data: string[];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  fileName = 'SheetJS.xlsx';
  fileUploaded = false;
  codigosPostales: string[];
  error: string;

 constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private service: ContattiService,private _snackBar: MatSnackBarModule,  private Location: Location,public dialog: MatDialogModule) { }

  ngOnInit(): void {

  }


  onFileChange(evt: FileList) {
    /* wire up file reader */
    // const target: DataTransfer = evt.target as DataTransfer;
    if (evt.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws);
      
      //console.log(this.data);


      this.http.post(GlobalComponent.url_global +'/upload_contatti_facebook.php?request=upload', this.data)
        .subscribe(res => {
    console.log(res);

    if (res[0] == "OK") {
     
      if (this.Location.path() === '/home') {
        //window.location.reload();
      } else {
        //this.router.navigate(['home']);
      }

    } else {
      this.error = res[1];
    }

   
  });
    };
    reader.readAsBinaryString(evt[0]);
  }

  onFileChangeGen(evt: FileList) {
    /* wire up file reader */
    // const target: DataTransfer = evt.target as DataTransfer;
    if (evt.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws);
      
      console.log(this.data);


      this.http.post(GlobalComponent.url_global +'/upload_contatti_generale.php?request=uploadGen', this.data)
        .subscribe(res => {
    //console.log(res);

    if (res[0] == "OK") {
     
      if (this.Location.path() === '/home') {
        window.location.reload();
      } else {
        this.router.navigate(['home']);
      }

    } else {
      this.error = res[1];
    }

   
  });
    };
    reader.readAsBinaryString(evt[0]);
  }

  onFileChangeSyncroFB(evt: FileList) {
    /* wire up file reader */
    // const target: DataTransfer = evt.target as DataTransfer;
    if (evt.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws);
      
      console.log(this.data);


      this.http.post(GlobalComponent.url_global +'/upload_contatti_facebook.php?request=SyncroFB', this.data)
        .subscribe(res => {
    //console.log(res);

    if (res[0] == "OK") {
     
      if (this.Location.path() === '/home') {
        window.location.reload();
      } else {
        this.router.navigate(['home']);
      }

    } else {
      this.error = res[1];
    }

   
  });
    };
    reader.readAsBinaryString(evt[0]);
  }

  onFileChangeCampioni(evt: FileList) {
    /* wire up file reader */
    // const target: DataTransfer = evt.target as DataTransfer;
    if (evt.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      this.data = XLSX.utils.sheet_to_json(ws);
      
      console.log(this.data);


      this.http.post(GlobalComponent.url_global +'/upload_contatti_generale.php?request=uploadCampioni', this.data)
        .subscribe(res => {
    //console.log(res);

    if (res[0] == "OK") {
     
      if (this.Location.path() === '/home') {
        window.location.reload();
      } else {
        this.router.navigate(['home']);
      }

    } else {
      this.error = res[1];
    }

   
  });
    };
    reader.readAsBinaryString(evt[0]);
  }

}
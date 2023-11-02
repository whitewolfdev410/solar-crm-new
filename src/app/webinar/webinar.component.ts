import { HttpClient } from '@angular/common/http';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Webinar } from '../services/webinar.service';
import * as moment from 'moment';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-webinar',
  templateUrl: './webinar.component.html',
  styleUrls: ['./webinar.component.css']
})
export class WebinarComponent implements OnInit{

  showdetails: boolean = false;

  form: UntypedFormGroup = new UntypedFormGroup({});
  formEdit: UntypedFormGroup = new UntypedFormGroup({});

  @ViewChild('picker') picker: any;

  public date: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate: moment.Moment;
  public maxDate: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, public route: ActivatedRoute, public router: Router, public webinarservice: Webinar) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      data_ora_webinar: [null,[Validators.required, Validators.minLength(2)]], 
      //ora_webinar: [null, [Validators.required]],
      link_webinar: [null],
      link_registrazione_webinar: [null],
      data_ora_openday: [null],
      luogo_openday: [null],
      giorno_max_registrazione_openday: [null],
      //ruoli: this.fb.array([], [Validators.required]),
      //checkboxes: this.fb.array([]),
    });
    this.formEdit = this.fb.group({
      id_menu: [null],
      testo: [null, [Validators.required, Validators.minLength(2)]],
      link: [null],
      link_dev: [null],
      genitore: [null],
      sottomenu: [null],
      ruoli_edit: this.fb.array([]),
    });

    //this.loadRuoli();
    //this.loadPagine();
    //this.loadMenuItems()

    //this.nestedDataSource.data=TREE_DATA;
  }

  saveWebinar(form: any) {
   this.webinarservice.addWebinar(this.form.value).subscribe((res: any) => {
   if (res[0] == "KO") {
    alert(res[1]);
    } else {
    console.log('webinar inserito');
      // this.loadRuoli();
       // this.loadMenuItems();
       // this.loadPagine();
       // this.ngOnInit();
       // this.form.reset();
     }
    })
    console.log(JSON.stringify(form.value, null, 4));
  }

}

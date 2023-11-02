import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatCalendar, MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { CalendarioService } from '../services/calendario.service';

import { NativeDateAdapter } from '@angular/material/core';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as _moment from 'moment';
import {default as _rollupMoment} from 'moment';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ContattiService } from '../services/contatti.service';
const moment = _rollupMoment || _moment;

export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-calendario',
  styleUrls: ['./calendario.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
  templateUrl: './calendario.component.html',
})
export class CalendarioComponent implements OnInit {
 
 eventi:any;
 @ViewChild(MatCalendar) calendar: MatCalendar<Date>;
 selectedDate = new Date();
 calendarVisible = true;
 start:any
 datas:any;
 ora:boolean=false
 dataora:any;
 ore:any;
 orafilter:any;
 annofilter:any;
 mesefilter:any;
 giornofilter:any;
 paramsSubscription: Subscription;
 id_contatto:any;
 interesse:any;
 provenienza:any;
 psw:any;
 ora_scelta:any;
 isClicked: boolean = false;
 form: FormGroup;
 giorniform: FormGroup;
 cell:any;
 app:any;
 nuovo:any;
 show_cellulare:boolean=false;
 minDate: any;
 maxDate: any;

   constructor(private calendario: CalendarioService, private formBuilder: FormBuilder, public fb: UntypedFormBuilder,private router: Router, private route: ActivatedRoute,private contattiservice:ContattiService) {

    this.form = this.fb.group({
      'request': ['insertApp'],
      'id_contatto':[null,Validators.required],
      'interesse':[null,Validators.required],
      'cellulare': [null, Validators.required],
      'data': [null, Validators.required],
      'psw': [null, Validators.required]
      //'categorie': this.fb.array([], Validators.required),
      //'categorie': [null],
      //'validate': ''
    });
 
  
   }

  ngOnInit(): void {
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.id_contatto = +params['id_contatto'];
      this.interesse= params['interesse'];// (+) converts string 'id' to a number
      this.provenienza= params['provenienza'];
      this.psw=params['psw'];
    });
    this.loadEvent();
    this.insertNuovo();
  }

insertNuovo(){
  this.calendario.inserisciNuovo(this.id_contatto)
  .subscribe(res => {
    this.nuovo = res;
    console.log(this.datas);
  });

}

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      date = new Date(date); // <<< My edit
      const highlightDate = this.datas.map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
        console.log(highlightDate);
        return highlightDate ? 'red' : '';
      
    };
  }


  loadEvent() {
    console.log(this.provenienza);
    this.calendario.getEventi(this.id_contatto,this.interesse,this.psw)
      .subscribe(res => {
        this.eventi = res;
        this.datas = this.eventi.map(t => t.start);
        console.log(this.datas[0]);
        var CurrentDate = new Date(this.datas[0]);
        this.minDate = CurrentDate;
      });
  }

  onPreviousDay() {
    this._addDays(-1);
  }

  onNextDay() {
    this._addDays(1);
  }

  onSelectedChange(selectedDate) {
    this.selectedDate = selectedDate;
    this.ora=true;
    this.show_cellulare=false;
    this.dataora= (moment(selectedDate)).format('DD-MMMM-YYYY');
    this.annofilter=(moment(selectedDate)).format('YYYY');
    this.mesefilter=(moment(selectedDate)).format('MM');
    this.giornofilter=(moment(selectedDate)).format('DD');
    this.load_ore(this.annofilter,this.mesefilter,this.giornofilter);
  }

load_ore(anno,mese,giorno){
  this.calendario.getOre(anno,mese,giorno,this.interesse)
      .subscribe(res => {
        this.ore = res;
        console.log(this.ore);
      });
}
setoraappuntamento(ora){
  this.ora_scelta=ora;
  console.log(this.ora_scelta);
  this.show_cellulare=true;
}
click() {
  this.isClicked = !this.isClicked;
}

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

  private _addDays(days: number) {
    this.selectedDate = new Date(
      this.selectedDate.getFullYear(),
      this.selectedDate.getMonth()+1,
      //this.selectedDate.getDate() + days
    );

    this.calendar._goToDateInView(this.selectedDate, 'month');
  }

checkCell(){
  this.contattiservice.checkCell(this.form.value)
  .subscribe(res => {
    this.cell = res;
    if(res[0]=='OK'){
      console.log(this.form.value);
      this.insertApp(this.form.value);
    }else{
      if (window.confirm('Il numero che hai inserito per l\'appuntamento è diverso da quello che hai inserito nei dati della richiesta di informazioni.Vuoi continuare?')) {
        console.log(this.form.value);
      this.insertApp(this.form.value);
      }
    }
    console.log(this.cell);
  });
}

  insertApp(data){
    this.calendario.insertApp(data)
      .subscribe(res => {
        this.app = res;
        if(res[0]=='OK'){
          window.location.href = 'https://solarcalor.eu/thank-you-page';
         
  
        }
        console.log(this.app);
      });
  }
}

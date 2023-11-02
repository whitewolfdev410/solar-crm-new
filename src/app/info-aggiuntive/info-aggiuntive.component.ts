import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroup, Validators, UntypedFormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContattiService } from '../services/contatti.service';
import { infoAgg } from '../models/infoagg.model';
import { Subscription } from 'rxjs/internal/Subscription';

import * as moment from 'moment';

declare var window: any;

@Component({
  selector: 'app-info-aggiuntive',
  templateUrl: './info-aggiuntive.component.html',
  styleUrls: ['./info-aggiuntive.component.css'],

})
export class InfoAggiuntiveComponent implements OnInit {
  @Input() data_lavori: Date;
  showinfoagg: boolean;
  showinfoaggempty: boolean;
  infoaggfield: UntypedFormControl = new UntypedFormControl();
  infos: any;
  edit_info_agg: boolean = true;
  edit_field_info_agg: string = "none";
  edit_info: string = "none";
  @Input() user: any;
  space: boolean = false;
  impianto: boolean = false;
  impiantocheck: any;
  isOpen: boolean = false;
  formvalutazione: UntypedFormGroup = new UntypedFormGroup({});
  paramsSubscription: Subscription;
  id: number;
  user_id: any;
  valutazione: string;
  contatto: any;
  value: string = 'none';
  lavoriprevisti: any;
  datalavori:any;
  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private service: ContattiService) { }

  ngOnInit(): void {
    this.LoadValutazione(this.user)
    this.paramsSubscription = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.user_id = this.id;

      this.formvalutazione = this.fb.group({
        'request': ['insertvalutazione'],
        id_utente: [null],
        valutazione: [null, [Validators.required]],
      });

    });
    this.lavoriprevisti = new window.bootstrap.Modal(
      document.getElementById('lavori_previsti')
    );

  }

  ngAfterViewInit() {
    this.getInfoAgg(this.user);
  }


  makeFieldEditable(): void {
    this.edit_info_agg = false;
    this.edit_info = "border-violet";
    this.edit_field_info_agg = "edit_field";
  }


  getInfoAgg(id: Number): void {
    //this.id = this.route.snapshot.params['postId'];
    this.service.getInfoAggiuntive(this.user).subscribe((data: infoAgg) => {
      this.infos = data;
      if (Object.keys(data).length === 0) {
        this.showinfoagg = false;
        this.showinfoaggempty = true;
      } else {
        this.showinfoagg = true;
        this.showinfoaggempty = false;
      }

    });
  }

  


  updateInfoAgg(): void {
    this.edit_info_agg = true;
    this.edit_info = "none";
    this.edit_field_info_agg = "none";
    ////console.log(this.infoaggfield.value);
    // //console.log(this.id);
    this.service.updateInfoAggiuntive(this.user, this.infoaggfield.value).subscribe((res: any) => {
      //console.log('Post updated successfully!');
      //this.router.navigateByUrl('post/index');
    })

  }
  addInfoAgg(): void {
    this.edit_info_agg = true;
    this.edit_info = "none";
    this.edit_field_info_agg = "none";
    ////console.log(this.infoaggfield.value);
    // //console.log(this.id);
    this.service.addInfoAggiuntive(this.user, this.infoaggfield.value).subscribe((res: any) => {
      //console.log('Post updated successfully!');
      //this.router.navigateByUrl('post/index');
    })

  }
  onClickedOutside(e: Event) {
    this.edit_info_agg = true;
    this.edit_info = "none";
    this.edit_field_info_agg = "none";
  }

  LoadValutazione(user) {
    this.service.getContatto(user)
      .subscribe(response => {
        this.contatto = response;
        // this.valutazione = this.contatto.map(t => t.valutazione);

      });

  }

  Valutazione(form) {
    console.log(this.formvalutazione.value)

    this.service.insertValutazione(this.formvalutazione.value).subscribe((res: any) => {
      if (res[0] == "OK") {
        this.LoadValutazione(this.user)
        if (res[1] == "3") {
          this.openFormModal()
        }
        //this.formvalutazione = false;
      }
      //this.getDatiPartner();
    })
  }

  openFormModal() {
    this.lavoriprevisti.show();
  }

  saveDateLavori(event: any) {
    // look at how the date is emitted from save
    console.log(event.target.value);
    //this.session.dateDebut = event.target.value.begin;
    //console.log(event.target.value.end);
let newdatalavori=(moment(event.target.value).format('YYYY-MM-DD'));
console.log(newdatalavori);

this.service.saveDateLavori(this.user,newdatalavori,'3')
.subscribe(response => {
  this.datalavori = response;
  this.lavoriprevisti.hide();
});
    // change in view
     //this.dateRangeDisp = event.target.value;


    // save date range as string value for sending to db

    // ... save to db
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContattiService } from '../services/contatti.service';
import { PreventiviService } from '../services/preventivi.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-send-mail',
  templateUrl: './send-mail.component.html',
  styleUrls: ['./send-mail.component.css']
})
export class SendMailComponent implements OnInit {

  @Input() tipo: any;
  @Input() id_offerta: any;
  @Input() id_utente: any;
  @Input() template: any;
  contatti: any;
  sendMailPreventivo: UntypedFormGroup;
  link: string;
  password:string;
  username:string;


  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private preventivi: PreventiviService, private Location: Location, private service: ContattiService) {
    this.sendMailPreventivo= fb.group({
      link_custom_email: new UntypedFormControl(),
      descrizione: new UntypedFormControl(),
      email: new UntypedFormControl(),
      id_utente: new UntypedFormControl(),
      tel_send: new UntypedFormControl(),
      id_offerta: new UntypedFormControl(),
      nome: new UntypedFormControl()
  });

  }

  ngOnInit(): void {
    this.getContatto();
  }
  getContatto() {
    //console.log(this.id_utente);
    this.service.getContatto(this.id_utente)
      .subscribe(response => {
        this.contatti = response;
        //console.log(this.contatti);
        this.password = this.contatti.map(t=>t.password);
        this.username = this.contatti.map(t=>t.username);
        this.link='https://gestionalecero.it/area_riservata/login-home.php?id_dettaglio='+this.id_offerta+'&password='+this.password+'&username='+this.username
//this.link='https://gestionalecero.it/gest_2022/area-riservata/'+this.id_utente+'/'+this.username+'/'+this.password+'';
      });

  }
  sendMailPrev() {

    ////console.log(this.sendMailPreventivo.value);

   
    this.http.post('https://gestionalecero.it/gest_2022/mail.php', {
      request: 'sendMailOfferta',
      template:'49486',
      link_custom_email: this.sendMailPreventivo.controls['link_custom_email'].value,
      descrizione: this.sendMailPreventivo.controls['descrizione'].value,
      email: this.sendMailPreventivo.controls['email'].value,
      id_utente: this.sendMailPreventivo.controls['id_utente'].value,
      tel_send: this.sendMailPreventivo.controls['tel_send'].value,
      id_offerta: this.sendMailPreventivo.controls['id_offerta'].value,
      nome: this.sendMailPreventivo.controls['nome'].value
      
    }).subscribe(res => {
      ////console.log(res);
   
      //this.router.navigate([this.router.url])
      //this.reloaddata(1)
    });



}
}

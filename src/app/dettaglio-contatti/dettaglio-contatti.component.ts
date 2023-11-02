import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, Inject, ViewChild, ViewContainerRef, ComponentFactoryResolver, HostListener, VERSION } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ContattiService } from '../services/contatti.service';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import { GlobalComponent } from '../global-component';
import { ProvinceService } from '../services/province.service';
import { Ruoli } from '../services/ruoli.service';
import { ChiamateComponent } from '../chiamate/chiamate.component';
import { ListaPreventiviComponent } from '../lista-preventivi/lista-preventivi.component';
import { InfoAggiuntiveComponent } from '../info-aggiuntive/info-aggiuntive.component';
import { ListaConfermeOrdineComponent } from '../lista-conferme-ordine/lista-conferme-ordine.component';
import { FatturazioneComponent } from '../fatturazione/fatturazione.component';
import { SpedizioneComponent } from '../spedizione/spedizione.component';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-dettaglio-contatti',
  templateUrl: './dettaglio-contatti.component.html',
  styleUrls: ['./dettaglio-contatti.component.css']
})
export class DettaglioContattiComponent implements OnInit {


  



  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
  loading: boolean = false;
  id: number;
  paramsSubscription: Subscription;
  contatti: any;
  nonletto: any;
  doppio: any;
  double: Number;
  anagrafica: boolean = true;
  edit_anagrafica: boolean = true;
  formEditContact: UntypedFormGroup;
  operatore: any = localStorage.getItem("id");
  edit: string = "none";
  edit_field: string = "none";
  contactData: any = {};
  user_id: any;
  amm_id: string;
  selectshow: boolean = false;
  appuntamenti: any;
  province: any;
  ruoli: any;
  data_lavori: Date;
  data_prev: Date;
  id_utente: any;
  componentRef;
  componentRefInfo;
  type: any = 0;
  space: boolean = false;
  impianto: boolean = false;
  impiantocheck: any;
  isOpen: boolean = false;
 
  @ViewChild("primotab", { read: ViewContainerRef }) container;
  @ViewChild("secondotab", { read: ViewContainerRef }) container1;
  @ViewChild("secondotab_a", { read: ViewContainerRef }) container1_a;
  @ViewChild("terzotab", { read: ViewContainerRef }) container2;
  @ViewChild("terzotab_a", { read: ViewContainerRef }) container2_a;
  @ViewChild("quartotab", { read: ViewContainerRef }) container3;
  //@Input() contatto?: Contact;

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private service: ContattiService, @Inject(DOCUMENT) private document: any, private Location: Location, private provincia: ProvinceService, private ruolo: Ruoli,private resolver: ComponentFactoryResolver) {


    
    this.formEditContact = this.fb.group({
      'request': ['updateContact', Validators.required],
      'id': ['', Validators.required],
      'nome': ['', Validators.required],
      'cognome': ['', Validators.required],
      'indirizzo': ['', Validators.required],
      'email': ['', Validators.required],
      'telefono': ['', Validators.required],
      'telefono2': ['', Validators.required],
      'provincia': ['', Validators.required],
      'cap': ['', Validators.required],
      'username': ['', Validators.required],
      'password': ['', Validators.required],
      'figura_professionale': [''],
      'tipo_collaborazione': [''],
      'azienda': ['', Validators.required],
      //'interesse': ['', Validators.required],
      // 'messaggio': ['', Validators.required],
      'privacy': [true, Validators.requiredTrue],
      'operatore': [this.operatore, Validators.required],
      //interesse: this.fb.array([], [Validators.required]),
    });
    //console.log(this.formEditContact);
    //if (this.Location.path() === 'home') {
    //  location.reload()
    // }

  }
  get formEditData() {
    return this.formEditContact.controls;
  }
  ngOnInit(): void {


    this.paramsSubscription = this.route.params.subscribe(params => {
      this.id = +params['id']; // (+) converts string 'id' to a number
      this.user_id = this.id;
      this.getContatto(this.id);
      this.getAppuntamentoDettglio()

    });
  }
  ngAfterViewInit() {
    this.getProvince();
    this.getCollaborazione();
    this.checkImpianto();
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

  
  getContatto(id) {
    this.service.getContatto(this.id)
      .subscribe(response => {
        this.contatti = response;
        this.amm_id = this.contatti.map(t => t.richiama_chi);
        this.data_lavori = this.contatti.map(t => t.richiamare_il);
        //console.log(this.contatti);
        this.data_prev = new Date(this.data_lavori);
        setTimeout(() => {
          this.contattoDouble(this.id);
        }, 2000);
        this.createComponent(this.type);
        this.checkImpianto();
      });

  }

  checkImpianto(): void {
    //this.id = this.route.snapshot.params['postId'];
    this.service.checkImpianto(this.id).subscribe((res: any) => {
      this.impiantocheck = res;

      let count = res.length;

      if (count === 0) {
        this.space = false;
        this.impianto = false;
        this.isOpen = true;
      } else if (count === 1) {
        this.space = true;
        this.impianto = true;
        this.isOpen = true;
        console.log('sa fsfa' + this.isOpen)
      } else {
        this.space = true;
        this.impianto = true;

      }
    });
  }

  createComponent(type) {
    console.log('type'+type);
    this.container.clear();
    this.container1.clear();
    this.container1_a.clear();
    this.container2.clear();
    this.container2_a.clear();
    this.container3.clear();

    if (type.index === 0 || type === 0) {
      //PRIMO TAB
      const info = this.resolver.resolveComponentFactory(InfoAggiuntiveComponent);
      this.componentRefInfo = this.container.createComponent(info);
      this.componentRefInfo.instance.user = this.id;
      this.componentRefInfo.instance.data_lavori = this.data_prev;
      this.componentRefInfo.instance.operatore = this.operatore;

      const chiamate = this.resolver.resolveComponentFactory(ChiamateComponent);
      this.componentRef = this.container.createComponent(chiamate);
      this.componentRef.instance.user = this.id;
      this.componentRef.instance.operatore = this.operatore;
      //this.componentRef.instance.data_lavori = this.data_prev;
      console.log(this.componentRef.instance.operatore);
     
    } else if (type.index === 1) {
      //SECONDO TAB
      const preventivi = this.resolver.resolveComponentFactory(ListaPreventiviComponent);
      this.componentRef = this.container1.createComponent(preventivi);
      this.componentRef.instance.user =  this.id;
      this.componentRef.instance.operatore = this.operatore;

      const conferme = this.resolver.resolveComponentFactory(ListaConfermeOrdineComponent);
      this.componentRef = this.container1_a.createComponent(conferme);
      this.componentRef.instance.user =  this.id;
      this.componentRef.instance.operatore = this.operatore;
    }else if (type.index === 2) {
      //TERZO TAB
      const fatturazione = this.resolver.resolveComponentFactory(FatturazioneComponent);
      this.componentRef = this.container2.createComponent(fatturazione);
      this.componentRef.instance.user =  this.id;
      this.componentRef.instance.operatore = this.operatore;

      const spedizione = this.resolver.resolveComponentFactory(SpedizioneComponent);
      this.componentRef = this.container2_a.createComponent(spedizione);
      this.componentRef.instance.user =  this.id;
      this.componentRef.instance.operatore = this.operatore;
    }
    else if (type.index === 3) {
      //QUARTO TAB
      const tag = this.resolver.resolveComponentFactory(TagComponent);
      this.componentRef = this.container3.createComponent(tag);
      this.componentRef.instance.user =  this.id;
      this.componentRef.instance.operatore = this.operatore;
    }
    
  }


  goAreaRiservata(id_utente, username, password) {

    let url: string = 'area-riservata/' + id_utente + '/' + username + '/' + password + '/admin';


    //console.log(url);
    // window.location.href = 'https://gestionalecero.it/area_riservata/login-home.php?id_dettaglio='.id.'&username='.this.username.'&password='.this.password.'&clk=admin';

    let u: string = '';

    if (!/^http[s]?:\/\//.test(url)) {
      u += 'http://';
    }
    u += url;
    let link = this.document.createElement("a");
    link.target = '_blank';
    link.href = u;
    link.setAttribute('visibility', 'hidden');
    link.click();
  }
  setNonLetto(id) {
    this.service.setNonLetto(this.id)
      .subscribe(response => {
        //this.nonletto=response;
        if (response[0] == "OK") {
          //console.log(this.nonletto);
          this.router.navigate(['home']);

        } else {
          alert('qualcosa è andato storto');
        }
      });
  }
  contattoDouble(id) {
    this.service.contattoDouble(this.id)
      .subscribe(response => {
        this.doppio = response;
        this.double = this.doppio + 1;
      });
  }
  eliminaContatto(id: number): void {
    if (window.confirm('Sei sicuro ?')) {
      this.http.get('https://gestionalecero.it/gest_2022/index.php?request=elimina&id_contatto=' + id).subscribe(res_off => {
        if (res_off[0] == "KO") {
          alert(res_off[1]);
        } else {
          this.router.navigate(['home']);
        }
        //console.log(res_off);
      });
    }
  }
  showFormAnagrafica(): void {
    this.edit_anagrafica = false;
    this.edit = "border-violet";
    this.edit_field = "edit_field";
    this.selectshow = true;
  }


  editContact() {

    //console.log(this.formEditContact.value);
    this.service.updateAnagraficaContatto(this.id, this.formEditContact.value).subscribe((res: any) => {
      //console.log('Post updated successfully!');
      //this.router.navigateByUrl('post/index');
      this.getContatto(this.id);
    })

    this.edit_anagrafica = true;
    this.edit = "none";
    this.edit_field = "none";
    this.selectshow = false;

  }
  getAppuntamentoDettglio() {
    this.service.getAppuntamentoDett(this.id)
      .subscribe(response => {
        this.appuntamenti = response;
        console.log(this.appuntamenti)
      });

  }

  getProvince() {
    this.provincia.getProvince()
      .subscribe(response => {
        this.province = response;
      });
  }
  getCollaborazione() {
    this.ruolo.getRuoli()
      .subscribe(response => {
        this.ruoli = response;
      });
  }

  spegniContatto(id: number): void {
    this.http.get('https://gestionalecero.it/gest_2022/index.php?request=spegni&id_contatto=' + id).subscribe(res_off => {
      if (res_off[0] == "KO") {
        alert(res_off[1]);
      } else {
        this.router.navigate(['home']);
      }
      //      //console.log(res_off);
    });
  }

}

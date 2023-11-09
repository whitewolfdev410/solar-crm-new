import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GlobalComponent } from '../global-component';
import { faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  name: any;
  headerShow: boolean = false;
  dev = GlobalComponent.dev;
  admin = GlobalComponent.admin;
  faUser=faUser;
  currentyear:any;

  constructor(public http: HttpClient, public router: Router, public fb: UntypedFormBuilder,) {

    this.loginForm = fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required],
    });
  }

  ngOnInit(): void {
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
      this.router.navigate(['/']);
      this.headerShow = false;

      //this.subheaderShow = false;
    })
  }
  login() {
    this.http.post("https://gestionalecero.it/gest_2022/session/session.php", {
      request: "login",
      username: this.loginForm.controls['username'].value,
      password: this.loginForm.controls['password'].value

    }).subscribe((res)=> {
      if (res[0] == "KO") {
        alert(res[1]);
      } else {
        this.currentyear = (new Date()).getFullYear();
        if (this.dev==false){

        localStorage.setItem("name", res[1]);
        localStorage.setItem("id", res[2]);
        localStorage.setItem("nome", res[3]);
        localStorage.setItem("cognome", res[4]);
        localStorage.setItem("ruolo", res[5]);
        localStorage.setItem("id_ruolo", res[6]);
        localStorage.setItem("assegnabile", res[7]);
        localStorage.setItem("anno_globale",this.currentyear);
        this.router.navigate(['/home']);
      }else{

        if(this.admin==2){
         localStorage.setItem("name", 'giuseppe');
        localStorage.setItem("id", '17');
        localStorage.setItem("nome", 'giuseppe');
        localStorage.setItem("cognome", 'stasabuchi');
        localStorage.setItem("ruolo", 'idraulico');
        localStorage.setItem("id_ruolo", '3');
        localStorage.setItem("assegnabile", '1');
        localStorage.setItem("anno_globale",this.currentyear);
      }

        if(this.admin==3){
         localStorage.setItem("name", 'elena');
        localStorage.setItem("id", '8');
        localStorage.setItem("nome", 'elena');
        localStorage.setItem("cognome", 'angeli');
        localStorage.setItem("ruolo", 'commerciale');
        localStorage.setItem("id_ruolo", '2');
        localStorage.setItem("assegnabile", '0');
        localStorage.setItem("anno_globale",this.currentyear);
      }else{
        localStorage.setItem("name", 'michele.cerone1977@gmail.com');
        localStorage.setItem("id", '2');
        localStorage.setItem("nome", 'michele');
        localStorage.setItem("cognome", 'cerone');
        localStorage.setItem("ruolo", 'Amministratore');
        localStorage.setItem("id_ruolo", '1'); 
        localStorage.setItem("assegnabile", '0');
        localStorage.setItem("anno_globale",this.currentyear);
        }
        this.router.navigate(['/home']);
      }
      }

    })

  }
  

  showHeader() {
    this.headerShow = true
  }

  logout() {
    this.http.post("https://gestionalecero.it/gest_2022/session/session.php", {
      request: "logout"
    }).subscribe(res => {
      localStorage.removeItem('name');
      localStorage.removeItem('id');
      localStorage.removeItem('nome');
      localStorage.removeItem('cognome');
      this.router.navigate(['/']);
    })
  }

}

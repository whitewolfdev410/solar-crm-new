import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BolleService } from '../services/bolle.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-lista-bolle',
  templateUrl: './lista-bolle.component.html',
  styleUrls: ['./lista-bolle.component.css']
})
export class ListaBolleComponent implements OnInit {

  @Input() user: any;
  @Input() operatore: any;
  bolle:any;
  dettaglio:boolean=false;

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private bolleservice: BolleService,private Location: Location) { }

  ngOnInit(): void {
    if (this.Location.path() == '/dettaglio-contatto/' + this.user) {
      this.dettaglio = true;
    }
    
  }
  ngAfterViewInit() { 
    this. getBolleListDett();
   
   }

  getBolleListDett() {
    this.bolleservice.getBolleDett(this.user)
      .subscribe(response => {
        this.bolle = response;
      });
  }
  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

}

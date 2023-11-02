import { Component, Input, OnInit } from '@angular/core';
import { ContattiService } from '../services/contatti.service';
import { doubleCont } from '../models/doublecontatto.model';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dati-contatto-doppio',
  templateUrl: './dati-contatto-doppio.component.html',
  styleUrls: ['./dati-contatto-doppio.component.css']
})
export class DatiContattoDoppioComponent implements OnInit {
  @Input() user: any;
  doubles:any;

  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private service: ContattiService) { }

  ngOnInit(): void {
    this.getDoppioData(this.user)
  }
  getDoppioData(id: Number): void {
    //this.id = this.route.snapshot.params['postId'];
    this.service.getDoubleData(this.user).subscribe((data: doubleCont) => {
      this.doubles = data;
      console.log(this.doubles);
    });
  }
}

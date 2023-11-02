import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalComponent } from '../global-component';


@Component({
  selector: 'app-operatore',
  templateUrl: './operatore.component.html',
  styleUrls: ['./operatore.component.css']
})
export class OperatoreComponent implements OnInit {
  dev = GlobalComponent.dev;
  @Input() operatore: any;
  operatori: any;


  ngOnInit(): void {
    this.loadAmministratori()
  }

  constructor(public http: HttpClient, private router: Router, private route: ActivatedRoute) { }


  loadAmministratori(): void {
  //  console.log('https://gestionalecero.it/gest_2022/index.php?request=user&id=' + this.operatore);
    this.http.get('https://gestionalecero.it/gest_2022/index.php?request=userDett&id=' + this.operatore).subscribe(res => {
      this.operatori = res;
    //console.log(this.operatori);
    });
  }

}


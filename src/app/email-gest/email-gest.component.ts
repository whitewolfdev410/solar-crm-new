import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportMailService } from '../services/report-mail.service';

@Component({
  selector: 'app-email-gest',
  templateUrl: './email-gest.component.html',
  styleUrls: ['./email-gest.component.css']
})
export class EmailGestComponent implements OnInit{
  @Input() user: any;
  reportmails:any;
  constructor(public http: HttpClient, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public report:ReportMailService) { }

  ngOnInit(): void {
    this.ReportMail();
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

ReportMail(){
  this.report.getReport(this.user)
  .subscribe(response => {
    this.reportmails = response;
    console.log(this.reportmails);
  });
}

}

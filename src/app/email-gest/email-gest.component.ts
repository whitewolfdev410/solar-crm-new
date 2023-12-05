import { HttpClient } from '@angular/common/http';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ReportMailService } from '../services/report-mail.service';
import { GlobalComponent } from '../global-component';

@Component({
  selector: 'app-email-gest',
  templateUrl: './email-gest.component.html',
  styleUrls: ['./email-gest.component.css']
})
export class EmailGestComponent implements OnInit {
  @Input() user: any;
  reportmails: any;

  dev = GlobalComponent.dev;
  @Input() operatore: any;
  @Input() tipo: any;
  @Input() id_offerta_conferma: any;
  assegnabile: any = localStorage.getItem("assegnabile");
  id_operatore: any = localStorage.getItem("id");
  automazioni: any;

  constructor(public http: HttpClient, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, public report: ReportMailService) { }

  ngOnInit(): void {
    this.ReportMail();
    this.getAutomazioniList();
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

  ReportMail() {
    this.report.getReport(this.user)
      .subscribe(response => {
        this.reportmails = response;
        console.log(this.reportmails);
      });
  }

  getAutomazioniList() {
    this.report.getAutomazioniList()
      .subscribe(response => {
        this.automazioni = response;
        console.log(this.automazioni);
      });
  }

  openDialog(id_automazione, user, name_automazione) {
    const dialogRef = this.dialog.open(TemplateEmail, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      backdropClass: 'confirmDialogComponent',
      panelClass: 'custom-modalbox',
      data: { id_automazione: id_automazione, id_utente: user, name_automazione: name_automazione }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

}


@Component({
  selector: 'modal-email',
  templateUrl: 'modal-email.html',
  styleUrls: ['../lista-preventivi/lista-preventivi.component.css']
})
export class TemplateEmail {

  constructor(
    public dialogRef: MatDialogRef<TemplateEmail>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
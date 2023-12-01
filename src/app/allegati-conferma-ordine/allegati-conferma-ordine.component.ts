import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ConfermeService } from '../services/conferme.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-allegati-conferma-ordine',
  templateUrl: './allegati-conferma-ordine.component.html',
  styleUrls: ['./allegati-conferma-ordine.component.css']
})
export class AllegatiConfermaOrdineComponent implements AfterViewInit {
  @Input() user: any;
  @Input() id_preventivo: string;
  @Input() upload_folder: string;
  allegati:any;


  constructor(public http: HttpClient, private conferma: ConfermeService) { }

  ngOnInit(): void {
    
  }
  ngAfterViewInit():void{
    this.ListConfermeDettaglioContatto()
  }

  private ListConfermeDettaglioContatto() {
    this.conferma.getConfermeListAllegati(this.user,this.id_preventivo)
      .subscribe({
        next: (response => {
          this.allegati = response;
        }),
        error: err => {
          alert(`Error ${err}!`);
        }
      });
  }


}

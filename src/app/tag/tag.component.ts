import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { UntypedFormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TagsService } from '../services/tag.service';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {
  @Input() user: any;
  @Input() operatore: any;
  tags: any;
  tagslist: any;
  dettaglio: boolean = false;
  checked: boolean = true;
  cartella_id: any;
  id: any;
  constructor(public http: HttpClient, public fb: UntypedFormBuilder, private router: Router, private route: ActivatedRoute, private tagservice: TagsService, private Location: Location) {


  }

  ngOnInit(): void {

    this.getTagsListDett();
    this.getTagsList();

    if (this.Location.path() == '/dettaglio-contatto/' + this.user) {
      this.dettaglio = true;
    }
  }
/*   ngAfterViewInit() { 
    this.getTagsListDett();
    this.getTagsList();
   
   } */

  getTagsListDett() {
    this.tagservice.getTagsDett(this.user)
      .subscribe(response => {
        this.tags = response;
        
        this.cartella_id = this.tags.map(t => t.id_cartella);
      });
  }
  getTagsList() {
    this.tagservice.getTagsList(this.user)
      .subscribe (response => {
        this.tagslist = response;
        this.id = this.tagslist.map(t => t.id);
        setTimeout(() => this.CheckChecked(),2500)
     
        console.log(this.tagslist);
   
      });
  }

CheckChecked(){
  this.tags.forEach(array1Ttem => {

    this.tagslist.forEach(array2Item => {
      if (array1Ttem.id_cartella == array2Item.id) {
        array2Item.checked = true;
      }
      else {
        //array2Item.checked = false;
        //console.log("This item not present in array =>",array1Ttem);
      }
      console.log(this.tagslist);

    })
  })
}

  updatetag(id) {
    this.tagservice.updateTagsDett(id, this.user).subscribe((res: any) => {
    })
  }

  validDateFormat(dateString) {
    if (dateString) {
      return dateString.replace(/\s/, 'T');
    }

    return null;

  }

}

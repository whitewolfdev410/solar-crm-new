import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Input, HostListener } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators, UntypedFormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/amministratore.model';
import { Ruoli } from '../services/ruoli.service';
import { Menu } from '../models/menu.model';
import { GlobalComponent } from '../global-component';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

/* interface CourseNode{
  name:string;
  children?:CourseNode[];
}

const TREE_DATA:CourseNode[]=[
  {
    name:'Angular for beginner',
    children:[
      {name: 'Introduction'},
      {name: 'explanation'},
    ]
  }
]; */

@Component({
  selector: 'app-menu-build',
  templateUrl: './menu-build.component.html',
  styleUrls: ['./menu-build.component.css']
})
export class MenuBuildComponent implements OnInit {
  users: User[] = new Array();
  ruoli: any;
  pagine: any;
  menuitems: any;
  menuitem: any;
  submenuitems: any;
  dev = GlobalComponent.dev;
  url_global = GlobalComponent.url_global;
  parent_id: any;
  id_ruolo: any = localStorage.getItem("id_ruolo");
  showdetails: boolean = false;
  sottomenu: string;
  checked: boolean = false;
  ruolo: any;
  ruoli_id: any = new Array();
  zs: any[];
  porcamadonna: any;
  checkBox: any;
  checkboxes: any[];
  z: any;

  nestedDataSource: any = new MatTreeNestedDataSource<Menu>();
  nestedTreeControl = new NestedTreeControl<Menu>(node => node.submenu);

  form: UntypedFormGroup = new UntypedFormGroup({});
  formEdit: UntypedFormGroup = new UntypedFormGroup({});
  //form_ruolo: FormGroup = new FormGroup({});
  aggiungiRuolo: UntypedFormControl = new UntypedFormControl();
  ruolimenu: any;
  ruoliedit: any;
  ruoli_edit: any = []
  checkboxEdit: boolean = false;
  assegnabile: any
  assegnabileChecked: boolean
  constructor(public http: HttpClient, public fb: UntypedFormBuilder, public route: ActivatedRoute, public router: Router, public ruoliservice: Ruoli) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      testo: [null, [Validators.required, Validators.minLength(2)]],
      link: [null],
      link_dev: [null],
      genitore: [null],
      sottomenu: [null],
      ruoli: this.fb.array([], [Validators.required]),
      checkboxes: this.fb.array([]),
    });
    this.formEdit = this.fb.group({
      id_menu: [null],
      testo: [null, [Validators.required, Validators.minLength(2)]],
      link: [null],
      link_dev: [null],
      genitore: [null],
      sottomenu: [null],
      ruoli_edit: this.fb.array([]),
    });

    this.loadRuoli();
    this.loadPagine();
    this.loadMenuItems()

    //this.nestedDataSource.data=TREE_DATA;
  }

  hasNestedChild(index: number, node: Menu) {
    return node?.submenu?.length > 0;
  }

  loadRuoli(): void {
    this.ruoliservice.getRuoli()
      .subscribe(response => {
        this.ruoli = response;
      });
  }


  loadPagine(): void {
    this.ruoliservice.getPagine()
      .subscribe(response => {
        this.pagine = response;
        // console.log(this.pagine);
      });
  }
  loadMenuItems(): void {
    this.ruoliservice.getMenuItems()
      .subscribe(response => {
        this.menuitems = response;
        this.parent_id = this.menuitems.map(t => t.id_menu);
        this.nestedDataSource.data = response;
        //console.log(this.id_ruolo);
        //this.loadSubMenuItems(this.parent_id);
      });
  }


  editItem(id_menu): void {
    //console.log(id_menu);
    this.ngOnInit();
    this.ruoliservice.getMenuItem(id_menu)
      .subscribe(response => {
        this.menuitem = response;
        this.sottomenu = this.menuitem.map(t => t.sottomenu);
        this.ruolo = this.menuitem.map(t => t.ruolo);
        var rules = this.ruolo;
        this.ruoli_id = (rules.toString().replace(/-/g, ','));
        this.zs = this.ruoli_id.split(',');
        this.loadRuoliMenu(id_menu);
        this.loadRuoliEdit(id_menu);
        if (this.sottomenu == '1') {
          this.checked = true;
        } else {
          this.checked = false;
        }
        this.showdetails = true;
      });
  }

  loadRuoliEdit(id_menu): void {
    this.ruoliservice.getRuoliEdit(id_menu)
      .subscribe(response => {
        this.ruoliedit = response;
        this.ruoli_edit = response;
        this.ruoli_edit.forEach(x => {
          (this.formEdit.get("ruoli_edit") as UntypedFormArray).push(
            this.fb.group({ status: [x.checked], id: [x.id], nome: [x.nome] })
          );
        });
        console.log(this.formEdit['controls'].ruoli_edit['controls'][0]['controls']['id'].value)
      });
  }

  loadRuoliMenu(id_menu): void {
    this.ruoliservice.getRuoliMenu(id_menu)
      .subscribe(response => {
        this.ruolimenu = response;

      });
  }

  // vedo quali checkbox sono checked
  /*   toggleCheckBox(elementId){
      //console.log(elementId);
      return (this.zs.indexOf(elementId) != -1) ? true : false;
   } */


  onCheckboxChange(e: any) {
    const checkArray: UntypedFormArray = this.form.get('ruoli') as UntypedFormArray;
    if (e.source.checked) {
      checkArray.push(new UntypedFormControl(e.source.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: any) => {
        if (item.value == e.source.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }


  editMenuItem(form: any) {
    this.ruoliservice.editMenu(this.formEdit.value).subscribe((res: any) => {
      if (res[0] == "KO") {
        alert(res[1]);
      } else {
        // this.loadRuoli();
        this.loadMenuItems();
        this.loadPagine();
        this.ngOnInit();
        this.showdetails = false;
      }
    })
    console.log(JSON.stringify(form.value, null, 4));
  }


  saveMenu(form: any) {
    this.ruoliservice.addMenu(this.form.value).subscribe((res: any) => {
      if (res[0] == "KO") {
        alert(res[1]);
      } else {
        this.loadRuoli();
        this.loadMenuItems();
        this.loadPagine();
        this.ngOnInit();
        this.form.reset();
      }
    })
    console.log(JSON.stringify(form.value, null, 4));
  }

  addRuolo(): void {
    this.ruoliservice.addRuolo(this.aggiungiRuolo.value).subscribe((res: any) => {
      if (res[0] == "KO") {
        alert(res[1]);
      } else {
        this.loadRuoli();
        this.aggiungiRuolo.reset();
      }
    })
  }
  updateRuolo(id_ruolo, event) {
    if (event.checked) {
      event.checked = 1;
    } else {
      event.checked = 0;
    }
    this.ruoliservice.updateRuolo(id_ruolo, event.checked).subscribe((res: any) => {
    })

  }


}

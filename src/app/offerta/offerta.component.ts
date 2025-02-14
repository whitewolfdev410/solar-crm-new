import { Component, isDevMode } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, debounceTime, distinctUntilChanged, filter, skipWhile, startWith, switchMap } from 'rxjs';
import { ImportModalDialogComponent } from '../import-modal-dialog/import-modal-dialog.component';
import { AmministratoriService } from '../services/amministratori.service';
import { OffertaService } from '../services/offerta.service';
export const skipNull = () => <T>(source: Observable<T>): Observable<T> => source.pipe(skipWhile(value => value === null));

@Component({
  selector: 'app-offerta',
  templateUrl: './offerta.component.html',
  styleUrls: ['./offerta.component.css']
})
export class OffertaComponent {
  isDev = isDevMode()
  idOfferta: any
  customerid: string = ''
  partnerid: string
  form: FormGroup;
  checkAll = new FormControl(false);
  modelsControllers = new FormControl(null);
  modelsList = []
  users = []
  modelsId = []
  dataSource = new MatTableDataSource([])
  transportVat = new FormControl(0)
  partner = new FormControl('')
  suppliers = []
  partners = []
  filteredPartners = []
  products = []

  materials = []
  idraulici = []
  models = []
  filteredModels = []

  usersFilter: string = ""
  usersOffset: 0
  usersLimit: 20
  displayedColumns = [
    'checkbox',
    'position',
    'product',
    'desc',
    'qty',
    'price',
    'discount',
    'discounted',
    'discountedImport',
    'vat'
  ]

  constructor(private activatedRoute: ActivatedRoute, private router: Router, public dialog: MatDialog, private snackBar: MatSnackBar, private fb: FormBuilder, private service: OffertaService, private ammservice: AmministratoriService, private _route: ActivatedRoute) {
    const assegnabile = localStorage.getItem("assegnabile",);
    const data_fattura = new Date()
    const data_scadenza = new Date();

    data_scadenza.setUTCDate(data_scadenza.getUTCDate() + 15);
    this.checkAll.valueChanges.subscribe((value: boolean) => {
      this.checkAllEvent(value)
    })
    this.form = this.fb.group({
      offerta: this.fb.group({
        anagrafica_azienda: [null, Validators.required],
        fornitore: [null, Validators.required],
        numero_fattura: [null, Validators.required],
        data_fattura: [data_fattura, Validators.required],
        data_scadenza: [data_scadenza, Validators.required],
        users: [null, Validators.required],
        models: [null, Validators.required],
        prodotti: new FormArray([]),
        vat: [0, Validators.required],
        total: [0, Validators.required],
        note: [null],
        transport: [0, Validators.required],
        taxable: [0, Validators.required],
        discount: [0, Validators.required],
        material: [null, Validators.required],
        taxable_vat: [0, Validators.required],
        totalVat: [0, Validators.required],
        totalPayment: [0, Validators.required],
      })
    })

    // applico sconto generale
    this.form.get('offerta.discount').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300)
    ).subscribe((value) => {
      const prodotti = <FormArray>this.form.get('offerta.prodotti');
      for (let p of prodotti.controls) {
        p.get('discount').setValue(value)
        let discounted = (p.get('price').value / 100) * value
        p.get('discounted').setValue(discounted.toFixed(2))
        const discountedImport = discounted * p.get('qty').value
        p.get('discountedImport').setValue(discountedImport.toFixed(2))
      }
    })

    // applico iva generale
    this.form.get('offerta.vat').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300)
    ).subscribe((value) => {
      const prodotti = <FormArray>this.form.get('offerta.prodotti');
      for (let p of prodotti.controls) {
        p.get('vat').setValue(value)
      }
      if (!this.transportVat.value)
        this.transportVat.setValue(value)
    })

    // calcolo totali di riepilogo
    this.form.get('offerta').valueChanges.pipe(
      distinctUntilChanged(),
      debounceTime(300)
    ).subscribe((value) => {

      const prodotti = <FormArray>this.form.get('offerta.prodotti');

      // calcolo del totale nel riepilogo
      let total = 0;
      let avgVat = 0;
      for (let p of prodotti.controls) {
        let price = p.get('price').value
        let quantity = p.get('qty').value
        total += price * quantity
        avgVat += p.get('vat').value
      }
      this.form.get('offerta.total').setValue(total)

      // spese di trasporto
      const transport = this.form.get('offerta.transport').value

      // imponibile
      const taxable = total + transport
      this.form.get('offerta.taxable').setValue(taxable)

      // iva totale
      avgVat = avgVat / prodotti.controls.length
      this.form.get('offerta.totalVat').setValue(avgVat)

    })

    // aziende
    this.service.allPartner(assegnabile).subscribe((response) => {
      this.partners = response.data
      this.filteredPartners = response.data
      this.form.get('offerta.anagrafica_azienda').setValue(response.data[0])
    })
    // materiali 
    this.service.getMaterials().subscribe((response) => {
      this.materials = response.data
    })
    // numero fattura
    if (!this.idOfferta) {
      this.service.getDocNumber().subscribe((response) => {
        this.form.get('offerta.numero_fattura').setValue(response.data)
      })
      // modelli da importare
    }
    this.service.allModels().subscribe((response) => {
      this.models = response.data
      this.filteredModels = response.data
    })
    // partner idraulici
    this.ammservice.getIdraulici().subscribe((response) => {
      this.idraulici = response
      this._route.paramMap.pipe(
        skipNull(),
        switchMap((params: ParamMap) => this.customerid = params.get('id'))
      )

      if (this.customerid) {
        this.service.allUsersPaged(this.customerid, this.usersOffset, this.usersLimit).subscribe((response) => {
          const customer = response.data[0]
          const idraulico = this.idraulici.filter((el) => { return parseInt(el.id) == parseInt(customer.id_idraulico) })
          // case 1
          this.form.get('offerta.users').setValue(customer)
          this.partner.setValue(idraulico[0])
        })
      }

    })

    this.service.allUsersPaged().subscribe((response) => {
      this.users = response.data
    })
    this.initValueChanges()

    this.activatedRoute.params.subscribe((p) => {
      if (p['offerta']) {
        this.idOfferta = p['offerta']
        this.service.getOfferta(this.idOfferta).subscribe((response) => {
          this.form.patchValue(response.data)
          this.partner.patchValue(response.data.partner)
          this.form.get('offerta.users').patchValue(response.data.users)
          this.form.get('offerta.anagrafica_azienda').patchValue(response.data.anagrafica_azienda)
          this.form.get('offerta.material').patchValue(response.data.material)
          this.form.get('offerta.vat').patchValue(response.data.vat)
          this.form.get('offerta.discount').patchValue(response.data.discount)
          this.form.get('offerta.transport').patchValue(response.data.transport)
          debugger
          const prodotti = <FormArray>this.form.get('offerta.prodotti');
          for (let row of response.data.prodotti) {
            const el = this.fb.group(this.getProductGroup());
            el.patchValue(row)
            prodotti.push(el)
          }
          this.dataSource = new MatTableDataSource((this.form.get('offerta.prodotti') as FormArray).controls)
          this.transportVat.patchValue(response.data.transportVat)
        })
      }
    })

  }

  compareObjects(o1: any, o2: any) {
    if (o1.id == o2.id)
      return true;
    else return false
  }

  initValueChanges() {

    // autocomplete clienti
    this.form.get('offerta.users').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        startWith(''),
        switchMap((val: string) => {
          this.usersFilter = val
          return this.service.allUsersPaged(this.usersFilter, this.usersOffset, this.usersLimit)
        })
      ).subscribe((filtered: any) => {
        this.users = filtered.data;
      });

    // autocomplete azienda
    this.form.get('offerta.anagrafica_azienda').valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
      ).subscribe((val) => {
        this.filteredPartners = this.partners.filter((partner) => {
          if (typeof (val) == 'object') {
            return partner.nome.toLocaleLowerCase().includes(val.nome.toLocaleLowerCase())
          }
          return partner.nome.toLocaleLowerCase().includes(val.toLocaleLowerCase())
        })
      });

  }

  optionSelected(event: any, key: string) {
    this.form.get(key).setValue(event)
  }

  displayFn(state: any, filterBy: string) {
    if (state)
      return state.name;
  }

  dialogModels() {

    const dialogRef = this.dialog.open(ImportModalDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      data: { dataSource: this.filteredModels, modelsChecked: this.modelsId }
    });

    dialogRef.afterClosed().subscribe(id => {
      this.modelsId = id

      let prodotti = <FormArray>this.form.get('offerta.prodotti');
      for (let i = prodotti.controls.length - 1; i >= 0; i--) {
        if (prodotti.at(i).get('id_offerta').value != null) {
          prodotti.removeAt(i)
        }
      }
      this.dataSource = new MatTableDataSource((this.form.get('offerta.prodotti') as FormArray).controls)
      if (!id.length)
        return
      this.service.getModels(this.modelsId).subscribe((response) => {
        for (let row of response) {
          if (!this.modelsList.includes(row.id_offerta))
            this.modelsList.push(row.id_offerta)

          const el = this.fb.group(this.getProductGroup());

          el.patchValue(row)
          prodotti.push(el)
        }
        this.dataSource = new MatTableDataSource((this.form.get('offerta.prodotti') as FormArray).controls)
      })

    });

  }

  toggleList(i: number) {
  }

  setProductToRow($event, i: number) {
    const value = $event.option.value;
    const prodotti = <FormArray>this.form.get('offerta.prodotti');
    prodotti.at(i).patchValue(value)
  }


  deleteProducts() {
    const prodotti = <FormArray>this.form.get('offerta.prodotti');
    for (let i = prodotti.controls.length - 1; i >= 0; i--) {
      const checked = prodotti.at(i).get('checkbox').value
      if (checked)
        prodotti.removeAt(i)
    }
    this.dataSource = new MatTableDataSource((this.form.get('offerta.prodotti') as FormArray).controls)
    this.checkAll.setValue(false)
  }

  addProduct() {
    const prodotti = <FormArray>this.form.get('offerta.prodotti');
    const row = this.fb.group(this.getProductGroup());
    // autocomplete prodotto
    row.get('product').valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      filter((query: string) => query?.length > 2)
    ).subscribe((term: string) => {
      this.service.getProductsByName(term, this.partner.value).subscribe((response => {
        this.products = response
        this.dataSource = new MatTableDataSource((this.form.get('offerta.prodotti') as FormArray).controls)
      }))
    })
    prodotti.push(row)
    this.dataSource = new MatTableDataSource((this.form.get('offerta.prodotti') as FormArray).controls)
  }

  rowValueChanges(i) {
    const prodotti = <FormArray>this.form.get('offerta.prodotti');
    const row = prodotti.at(i).value;
    let discounted = (row.price / 100) * row.discount
    //row.price = price
    row.discounted = discounted
    row.discountedImport = discounted * row.qty
    prodotti.at(i).patchValue(row)
  }

  checkAllEvent(event: boolean) {
    const prodotti = <FormArray>this.form.get('offerta.prodotti');
    for (let i = 0; i < prodotti.controls.length; i++) {
      prodotti.at(i).get('checkbox').setValue(event)
    }
  }
  /*
  importModels(event) {
    let prodotti = <FormArray>this.form.get('offerta.prodotti');
    for (let i = prodotti.controls.length - 1; i >= 0; i--) {
      if (prodotti.at(i).get('id_offerta').value != null) {
        prodotti.removeAt(i)
      }
    }
    this.dataSource = new MatTableDataSource((this.form.get('offerta.prodotti') as FormArray).controls)
    if (!this.modelsControllers.value || !this.modelsControllers.value.length)
      return
    const id = this.modelsControllers.value.map((el) => { return el.id })

  }
  */


  getProductGroup() {
    return {
      id: [null],
      id_supplier: [null],
      id_offerta: [null],
      product: [null, Validators.required],
      desc: [null, Validators.required],
      qty: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(0)]],
      discount: [0, [Validators.required, Validators.min(0)]],
      discounted: [0, [Validators.required, Validators.min(0)]],
      discountedImport: [0, [Validators.required, Validators.min(0)]],
      vat: [0, [Validators.required, Validators.min(0)]],
      checkbox: [null],
    }
  }
  save() {
    this.form.get('offerta.totalVat').setValue(this.totalVat.net + this.totalVat.transport)
    this.form.get('offerta.totalPayment').setValue(this.totalPayment)
    this.form.get('offerta.taxable').setValue(this.taxable)
    // partner

    let request = this.form.value
    request.partner = this.partner.value
    request.vatTotal = this.totalVat.net + this.totalVat.transport
    request.id = this.idOfferta
    request.operatore = localStorage.getItem("id");
    request.transportVat = this.transportVat.value
    this.service.save(request).subscribe((res) => {
      this.openSnackBar('L\'offerta è stato aggiornata', 'Conferma')
      this.router.navigateByUrl("update-offerta/" + res.data)
    })
  }

  get getPartnerLabel() {
    const anagrafica_azienda = this.form.get('offerta.anagrafica_azienda').value;
    if (anagrafica_azienda && anagrafica_azienda.nome) {
      return anagrafica_azienda.nome + ' ' + anagrafica_azienda.indirizzo
    }
    return ''
  }

  get getUserLabel() {
    const user = this.form.get('offerta.users').value;
    if (user && user.nome) {
      return user.nome + ' ' + user.cognome
    }
    return ''
  }
  get getIdraulicoLabel() {
    const user: any = this.partner.value;
    if (user && user.nome) {
      return user.nome + ' ' + user.cognome
    }
    return ''
  }
  get getModelsLabel() {
    if (this.modelsControllers.value)
      return this.modelsControllers.value.map((el) => { return el.nome_offerta }).join()
    return ''
  }
  get total() {
    const prodotti = <FormArray>this.form.get('offerta.prodotti');
    const total = prodotti.value.reduce((accumulator, object: any) => {
      return accumulator + parseFloat(object.price);
    }, 0);
    const discount = prodotti.value.reduce((accumulator, object: any) => {
      return accumulator + parseFloat(object.discountedImport);
    }, 0);
    const net = total - discount
    return { total, discount, net }
  }
  // total + transport
  get taxable() {
    const net = this.total.net
    const transport = this.form.get('offerta.transport').value;
    // iva trasporto
    if (this.transportVat.value) {
      const transportVat = (transport * this.transportVat.value) / 100
      return net + (transport + transportVat)
    }
    else
      return net + parseFloat(transport)
  }
  //net vat, transport vat
  get totalVat() {
    const transport = this.form.get('offerta.transport').value;
    const transportVat = this.transportVat.value;

    const vat = this.form.get('offerta.vat').value;
    const t = this.total.total - this.total.discount

    return {
      transport: ((transport / 100) * transportVat),
      net: ((this.total.net / 100) * vat)
    }
  }

  get totalPayment() {
    return this.total.net + this.totalVat.net + this.totalVat.transport
  }

  setOptionData(e) {
    this.form.get('offerta.users').setValue(e.option.value);
  }

  setOptionData2(e) {
    this.partner.setValue(e.option.value);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}

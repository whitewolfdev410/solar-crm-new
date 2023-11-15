import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MagazzinoService } from '../services/magazzino.service';


@Component({
  selector: 'app-magazzino',
  templateUrl: './magazzino.component.html',
  styleUrls: ['./magazzino.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class MagazzinoComponent implements OnInit {
  dataSource = new MatTableDataSource([])
  dataSourceGiacenze = new MatTableDataSource([])
  expandedElement: any | null;
  pageIndex = 0;
  pageSize = 25;
  pageIndex2 = 0;
  pageSize2 = 25;

  filter = new FormControl();

  displayedColumns: string[] = ['expand', 'reference', 'product_name', 'action', 'quantity', 'booked', 'sold', 'recap',
    'shipped', 'order_status', 'supplier_status']; product_supplier_price_te
  displayedColumnsGiacenze: string[] = ['reference', 'product_name', 'quantity', 'product_supplier_price_te'];
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];

  total = 0
  length = 0
  length2 = 0
  constructor(private service: MagazzinoService) {
    this.search(this.pageIndex, this.pageSize, null)
    this.search2(this.pageIndex2, this.pageSize2)

    this.filter.valueChanges.subscribe((filter: string) => {
      this.search(this.pageIndex, this.pageSize, filter)
    })



  }

  search(page: number, size: number, filter: string) {
    this.service.getMagazzinoList(page, size, filter).subscribe((response: any) => {
      this.dataSource = new MatTableDataSource([...response.data])
      this.length = response.count
    })
  }

  search2(page: number, size: number) {
    this.service.getGiacenzaList(this.pageIndex2, this.pageSize2).subscribe(((response: any) => {
      this.dataSourceGiacenze = new MatTableDataSource([...response.data])
      this.total = response.total
      this.length2 = response.count
    }))
  }

  page(event: any) {
    this.pageIndex = event.pageIndex
    this.pageSize = event.pageSize
    this.search(event.pageIndex, event.pageSize, this.filter.value)
  }

  page2(event: any) {
    this.pageIndex2 = event.pageIndex
    this.pageSize2 = event.pageSize
    this.search2(this.pageIndex2, this.pageSize2)
  }

  ngOnInit(): void {
  }

  editQ(data: any) {
    this.service.setQuantity(data).subscribe(((response: any) => {

    }))
  }

  addQ(data: any) {
    data.quantity++;
    this.service.setQuantity(data).subscribe(((response: any) => {

    }))
  }

  subQ(data: any) {
    if (data <= 0)
      return
    data.quantity--;
    this.service.setQuantity(data).subscribe(((response: any) => {

    }))
  }

}

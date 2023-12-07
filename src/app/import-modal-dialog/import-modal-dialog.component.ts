import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-import-modal-dialog',
  templateUrl: './import-modal-dialog.component.html',
  styleUrls: ['./import-modal-dialog.component.css']
})
export class ImportModalDialogComponent implements OnInit {
  source: any
  dataSource: MatTableDataSource<any>;
  displayedColumns = ['n', 'checkbox', 'nome_offerta']
  modelsChecked = [];
  @ViewChild('paginator', { static: true }) paginator: MatPaginator;

  constructor(public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: ImportModalDialogComponent) {
    this.source = data
    this.modelsChecked = data.modelsChecked
  }
  ngOnInit() {

    this.dataSource = new MatTableDataSource(this.source.dataSource);
    this.dataSource.paginator = this.paginator;
  }
  checkChange($element, $event) {
    if ($event.checked) {
      this.modelsChecked.push($element.id)
      $element.checked = true
    }
    else {
      this.modelsChecked = this.modelsChecked.filter((el) => { return el != $element.id })
      $element.checked = false
    }
    console.log([$element, $event])
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  save() {
    this.dialogRef.close(this.modelsChecked)
  }

}


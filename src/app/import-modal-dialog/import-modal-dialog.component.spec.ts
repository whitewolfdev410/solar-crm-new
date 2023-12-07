import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportModalDialogComponent } from './import-modal-dialog.component';

describe('ImportModalDialogComponent', () => {
  let component: ImportModalDialogComponent;
  let fixture: ComponentFixture<ImportModalDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportModalDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportModalDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

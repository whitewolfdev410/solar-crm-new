import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaFattureComponent } from './lista-fatture.component';

describe('ListaFattureComponent', () => {
  let component: ListaFattureComponent;
  let fixture: ComponentFixture<ListaFattureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaFattureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaFattureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

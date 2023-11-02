import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaConfermeOrdineComponent } from './lista-conferme-ordine.component';

describe('ListaConfermeOrdineComponent', () => {
  let component: ListaConfermeOrdineComponent;
  let fixture: ComponentFixture<ListaConfermeOrdineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaConfermeOrdineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaConfermeOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

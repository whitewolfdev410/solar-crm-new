import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuovoModelloOffertaComponent } from './nuovo-modello-offerta.component';

describe('NuovoModelloOffertaComponent', () => {
  let component: NuovoModelloOffertaComponent;
  let fixture: ComponentFixture<NuovoModelloOffertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuovoModelloOffertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuovoModelloOffertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

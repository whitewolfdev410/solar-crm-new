import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiepilogoFattureFornitoriComponent } from './riepilogo-fatture-fornitori.component';

describe('RiepilogoFattureFornitoriComponent', () => {
  let component: RiepilogoFattureFornitoriComponent;
  let fixture: ComponentFixture<RiepilogoFattureFornitoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RiepilogoFattureFornitoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiepilogoFattureFornitoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

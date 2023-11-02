import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiAziendaPartnerComponent } from './dati-azienda-partner.component';

describe('DatiAziendaPartnerComponent', () => {
  let component: DatiAziendaPartnerComponent;
  let fixture: ComponentFixture<DatiAziendaPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatiAziendaPartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatiAziendaPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatiContattoDoppioComponent } from './dati-contatto-doppio.component';

describe('DatiContattoDoppioComponent', () => {
  let component: DatiContattoDoppioComponent;
  let fixture: ComponentFixture<DatiContattoDoppioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatiContattoDoppioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatiContattoDoppioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

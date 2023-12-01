import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatOfferteComponent } from './stat-offerte.component';

describe('StatOfferteComponent', () => {
  let component: StatOfferteComponent;
  let fixture: ComponentFixture<StatOfferteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatOfferteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatOfferteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

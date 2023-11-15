import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatOperatoriComponent } from './stat-operatori.component';

describe('StatOperatoriComponent', () => {
  let component: StatOperatoriComponent;
  let fixture: ComponentFixture<StatOperatoriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatOperatoriComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatOperatoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

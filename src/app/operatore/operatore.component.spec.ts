import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatoreComponent } from './operatore.component';

describe('OperatoreComponent', () => {
  let component: OperatoreComponent;
  let fixture: ComponentFixture<OperatoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

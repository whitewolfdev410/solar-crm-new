import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaBolleComponent } from './lista-bolle.component';

describe('ListaBolleComponent', () => {
  let component: ListaBolleComponent;
  let fixture: ComponentFixture<ListaBolleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaBolleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaBolleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPreventiviComponent } from './lista-preventivi.component';

describe('ListaPreventiviComponent', () => {
  let component: ListaPreventiviComponent;
  let fixture: ComponentFixture<ListaPreventiviComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaPreventiviComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaPreventiviComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

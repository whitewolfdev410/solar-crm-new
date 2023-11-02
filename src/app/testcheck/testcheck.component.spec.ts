import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestcheckComponent } from './testcheck.component';

describe('TestcheckComponent', () => {
  let component: TestcheckComponent;
  let fixture: ComponentFixture<TestcheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestcheckComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestcheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

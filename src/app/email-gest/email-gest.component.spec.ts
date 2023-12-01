import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailGestComponent } from './email-gest.component';

describe('EmailGestComponent', () => {
  let component: EmailGestComponent;
  let fixture: ComponentFixture<EmailGestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmailGestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmailGestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

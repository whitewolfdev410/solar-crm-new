import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAggiuntiveComponent } from './info-aggiuntive.component';

describe('InfoAggiuntiveComponent', () => {
  let component: InfoAggiuntiveComponent;
  let fixture: ComponentFixture<InfoAggiuntiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoAggiuntiveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoAggiuntiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

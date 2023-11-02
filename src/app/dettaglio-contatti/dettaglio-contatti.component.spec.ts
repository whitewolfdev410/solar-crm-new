import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DettaglioContattiComponent } from './dettaglio-contatti.component';

describe('DettaglioContattiComponent', () => {
  let component: DettaglioContattiComponent;
  let fixture: ComponentFixture<DettaglioContattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DettaglioContattiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DettaglioContattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

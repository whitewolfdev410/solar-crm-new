import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllegatiConfermaOrdineComponent } from './allegati-conferma-ordine.component';

describe('AllegatiConfermaOrdineComponent', () => {
  let component: AllegatiConfermaOrdineComponent;
  let fixture: ComponentFixture<AllegatiConfermaOrdineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllegatiConfermaOrdineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllegatiConfermaOrdineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

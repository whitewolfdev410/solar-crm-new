import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllegatiContattiComponent } from './allegati-contatti.component';

describe('AllegatiContattiComponent', () => {
  let component: AllegatiContattiComponent;
  let fixture: ComponentFixture<AllegatiContattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllegatiContattiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllegatiContattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

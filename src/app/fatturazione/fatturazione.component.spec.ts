import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FatturazioneComponent } from './fatturazione.component';

describe('FatturazioneComponent', () => {
  let component: FatturazioneComponent;
  let fixture: ComponentFixture<FatturazioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FatturazioneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FatturazioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

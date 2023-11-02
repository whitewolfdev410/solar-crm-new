import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadContattiComponent } from './upload-contatti.component';

describe('UploadContattiComponent', () => {
  let component: UploadContattiComponent;
  let fixture: ComponentFixture<UploadContattiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadContattiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadContattiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

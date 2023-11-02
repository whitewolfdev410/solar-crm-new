import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampioniComponent } from './campioni.component';

describe('CampioniComponent', () => {
  let component: CampioniComponent;
  let fixture: ComponentFixture<CampioniComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampioniComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CampioniComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

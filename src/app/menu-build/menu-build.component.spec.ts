import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuBuildComponent } from './menu-build.component';

describe('MenuBuildComponent', () => {
  let component: MenuBuildComponent;
  let fixture: ComponentFixture<MenuBuildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuBuildComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuBuildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

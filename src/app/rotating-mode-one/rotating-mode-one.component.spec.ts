import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RotatingModeOneComponent } from './rotating-mode-one.component';

describe('RotatingModeOneComponent', () => {
  let component: RotatingModeOneComponent;
  let fixture: ComponentFixture<RotatingModeOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RotatingModeOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RotatingModeOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

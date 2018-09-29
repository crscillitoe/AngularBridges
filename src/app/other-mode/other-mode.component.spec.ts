import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherModeComponent } from './other-mode.component';

describe('OtherModeComponent', () => {
  let component: OtherModeComponent;
  let fixture: ComponentFixture<OtherModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

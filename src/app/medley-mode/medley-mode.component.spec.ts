import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedleyModeComponent } from './medley-mode.component';

describe('MedleyModeComponent', () => {
  let component: MedleyModeComponent;
  let fixture: ComponentFixture<MedleyModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedleyModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedleyModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

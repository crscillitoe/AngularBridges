import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnoyingModeComponent } from './annoying-mode.component';

describe('AnnoyingModeComponent', () => {
  let component: AnnoyingModeComponent;
  let fixture: ComponentFixture<AnnoyingModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnoyingModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnoyingModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

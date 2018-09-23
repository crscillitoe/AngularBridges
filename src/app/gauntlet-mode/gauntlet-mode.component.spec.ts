import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GauntletModeComponent } from './gauntlet-mode.component';

describe('GauntletModeComponent', () => {
  let component: GauntletModeComponent;
  let fixture: ComponentFixture<GauntletModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GauntletModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GauntletModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

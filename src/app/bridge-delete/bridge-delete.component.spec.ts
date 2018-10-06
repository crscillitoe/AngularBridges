import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BridgeDeleteComponent } from './bridge-delete.component';

describe('BridgeDeleteComponent', () => {
  let component: BridgeDeleteComponent;
  let fixture: ComponentFixture<BridgeDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BridgeDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BridgeDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

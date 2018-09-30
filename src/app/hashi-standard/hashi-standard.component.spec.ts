import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HashiStandardComponent } from './hashi-standard.component';

describe('HashiStandardComponent', () => {
  let component: HashiStandardComponent;
  let fixture: ComponentFixture<HashiStandardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HashiStandardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HashiStandardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

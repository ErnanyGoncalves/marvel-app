import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroisComponent } from './herois.component';

describe('HeroisComponent', () => {
  let component: HeroisComponent;
  let fixture: ComponentFixture<HeroisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

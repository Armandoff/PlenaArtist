import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupSchedulePage } from './makeup-schedule.page';

describe('MakeupSchedulePage', () => {
  let component: MakeupSchedulePage;
  let fixture: ComponentFixture<MakeupSchedulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeupSchedulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeupSchedulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

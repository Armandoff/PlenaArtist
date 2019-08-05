import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupSavePage } from './makeup-save.page';

describe('MakeupSavePage', () => {
  let component: MakeupSavePage;
  let fixture: ComponentFixture<MakeupSavePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeupSavePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeupSavePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

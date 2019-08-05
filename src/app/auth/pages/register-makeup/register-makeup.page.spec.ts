import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterMakeupPage } from './register-makeup.page';

describe('RegisterMakeupPage', () => {
  let component: RegisterMakeupPage;
  let fixture: ComponentFixture<RegisterMakeupPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterMakeupPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterMakeupPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

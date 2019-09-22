import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeupPresentationPage } from './makeup-presentation.page';

describe('MakeupPresentationPage', () => {
  let component: MakeupPresentationPage;
  let fixture: ComponentFixture<MakeupPresentationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeupPresentationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeupPresentationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

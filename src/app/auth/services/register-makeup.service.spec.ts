import { TestBed } from '@angular/core/testing';

import { RegisterMakeupService } from './register-makeup.service';

describe('RegisterMakeupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterMakeupService = TestBed.get(RegisterMakeupService);
    expect(service).toBeTruthy();
  });
});

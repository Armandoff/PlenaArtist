import { TestBed } from '@angular/core/testing';

import { MakeupProfileService } from './makeup-profile.service';

describe('MakeupProfileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MakeupProfileService = TestBed.get(MakeupProfileService);
    expect(service).toBeTruthy();
  });
});

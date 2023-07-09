import { TestBed } from '@angular/core/testing';

import { ApiPublicService } from './api-public.service';

describe('ApiPublicService', () => {
  let service: ApiPublicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiPublicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

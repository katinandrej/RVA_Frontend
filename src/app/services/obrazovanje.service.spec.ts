import { TestBed, inject } from '@angular/core/testing';

import { ObrazovanjeService } from './obrazovanje.service';

describe('ObrazovanjeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObrazovanjeService]
    });
  });

  it('should be created', inject([ObrazovanjeService], (service: ObrazovanjeService) => {
    expect(service).toBeTruthy();
  }));
});

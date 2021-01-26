import { TestBed, inject } from '@angular/core/testing';

import { RadnikService } from './radnik.service';

describe('RadnikService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RadnikService]
    });
  });

  it('should be created', inject([RadnikService], (service: RadnikService) => {
    expect(service).toBeTruthy();
  }));
});

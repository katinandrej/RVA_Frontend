import { TestBed, inject } from '@angular/core/testing';

import { SektorService } from './sektor.service';

describe('SektorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SektorService]
    });
  });

  it('should be created', inject([SektorService], (service: SektorService) => {
    expect(service).toBeTruthy();
  }));
});

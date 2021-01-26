import { TestBed, inject } from '@angular/core/testing';

import { PreduzeceService } from './preduzece.service';

describe('PreduzeceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PreduzeceService]
    });
  });

  it('should be created', inject([PreduzeceService], (service: PreduzeceService) => {
    expect(service).toBeTruthy();
  }));
});

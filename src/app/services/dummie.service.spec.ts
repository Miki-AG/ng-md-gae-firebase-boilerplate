import { TestBed, inject } from '@angular/core/testing';

import { DummieService } from './dummie.service';

describe('DummieService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DummieService]
    });
  });

  it('should be created', inject([DummieService], (service: DummieService) => {
    expect(service).toBeTruthy();
  }));
});

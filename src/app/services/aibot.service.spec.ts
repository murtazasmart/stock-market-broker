import { TestBed, inject } from '@angular/core/testing';

import { AibotService } from './aibot.service';

describe('AibotService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AibotService]
    });
  });

  it('should be created', inject([AibotService], (service: AibotService) => {
    expect(service).toBeTruthy();
  }));
});

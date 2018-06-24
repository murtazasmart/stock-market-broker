import { TestBed, inject } from '@angular/core/testing';

import { CpuPlayerService } from './cpu-player.service';

describe('CpuPlayerService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CpuPlayerService]
    });
  });

  it('should be created', inject([CpuPlayerService], (service: CpuPlayerService) => {
    expect(service).toBeTruthy();
  }));
});

import { TestBed, inject } from '@angular/core/testing';

import { PuzzleService } from './puzzle.service';

describe('PuzzleService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PuzzleService]
    });
  });

  it('should be created', inject([PuzzleService], (service: PuzzleService) => {
    expect(service).toBeTruthy();
  }));
});

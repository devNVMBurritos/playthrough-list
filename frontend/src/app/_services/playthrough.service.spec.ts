import { TestBed } from '@angular/core/testing';

import { PlaythroughService } from './playthrough.service';

describe('PlaythroughService', () => {
  let service: PlaythroughService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaythroughService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

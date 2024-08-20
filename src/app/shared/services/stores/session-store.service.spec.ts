import { TestBed } from '@angular/core/testing';

import { SessionStoreService } from './session-store.service';

describe('SessionStoreService', () => {
  let service: SessionStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

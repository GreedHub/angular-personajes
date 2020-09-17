import { TestBed } from '@angular/core/testing';

import { ChatWssService } from './chat-wss.service';

describe('ChatWssService', () => {
  let service: ChatWssService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChatWssService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

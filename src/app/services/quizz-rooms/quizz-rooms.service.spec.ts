import { TestBed } from '@angular/core/testing';

import { QuizzRoomsService } from './quizz-rooms.service';

describe('QuizzRoomsService', () => {
  let service: QuizzRoomsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizzRoomsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

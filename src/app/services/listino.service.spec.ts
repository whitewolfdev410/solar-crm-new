import { TestBed } from '@angular/core/testing';

import { ListinoService } from './listino.service';

describe('ListinoService', () => {
  let service: ListinoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListinoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

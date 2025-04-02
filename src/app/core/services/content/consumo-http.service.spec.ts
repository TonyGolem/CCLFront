import { TestBed } from '@angular/core/testing';

import { ConsumoHTTPService } from './consumo-http.service';

describe('ConsumoHTTPService', () => {
  let service: ConsumoHTTPService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumoHTTPService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

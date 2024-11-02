import { TestBed } from '@angular/core/testing';

import { ServiPrevisionesService } from './servi-previsiones.service';

describe('ServiPrevisionesService', () => {
  let service: ServiPrevisionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiPrevisionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

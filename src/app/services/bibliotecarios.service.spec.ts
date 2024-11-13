import { TestBed } from '@angular/core/testing';

import { BibliotecariosService } from './bibliotecarios.service';

describe('BibliotecariosService', () => {
  let service: BibliotecariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BibliotecariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

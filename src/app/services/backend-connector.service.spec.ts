import { TestBed } from '@angular/core/testing';

import { GeojsonImporterService } from './backend-connector.service';

describe('GeojsonImportorService', () => {
  let service: GeojsonImporterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeojsonImporterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

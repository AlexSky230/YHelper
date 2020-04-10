import { TestBed } from '@angular/core/testing';

import { SharedForecastService } from './shared-forecast.service';

describe('SharedForecastService', () => {
  let service: SharedForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

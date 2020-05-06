import { TestBed } from '@angular/core/testing';

import { SearchShortcutService } from './search-shortcut.service';

describe('SearchShortcutService', () => {
  let service: SearchShortcutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchShortcutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

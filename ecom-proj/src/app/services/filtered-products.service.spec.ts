import { TestBed } from '@angular/core/testing';

import { FilteredProductsService } from './filtered-products.service';

describe('FilteredProductsServiceService', () => {
  let service: FilteredProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilteredProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

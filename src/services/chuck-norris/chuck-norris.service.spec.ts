import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChuckNorrisService } from './chuck-norris.service';
import { provideHttpClient } from '@angular/common/http';

describe('ChuckNorrisService', () => {
  let service: ChuckNorrisService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChuckNorrisService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

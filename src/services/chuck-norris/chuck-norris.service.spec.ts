import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { ChuckNorrisService } from './chuck-norris.service';

describe('ChuckNorrisService', () => {
  let service: ChuckNorrisService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ChuckNorrisService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch Chuck Norris facts', () => {
    const mockFact = { value: 'Chuck Norris can divide by zero.' };

    service.getChuckNorrisFacts().subscribe((fact) => {
      expect(fact).toEqual(mockFact);
    });

    const req = httpMock.expectOne('https://api.chucknorris.io/jokes/random');
    expect(req.request.method).toBe('GET');
    req.flush(mockFact);
  });

  it('should handle error when fetching Chuck Norris facts', () => {
    const mockError = new ErrorEvent('Network error', {
      message: 'Could not fetch the api',
    });

    service.getChuckNorrisFacts().subscribe(
      () => fail('should have failed with the network error'),
      (error) => {
        expect(error.message).toContain('Could not fetch the api');
      }
    );

    const req = httpMock.expectOne('https://api.chucknorris.io/jokes/random');
    req.error(mockError);
  });
});

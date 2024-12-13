import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisService implements OnInit {
  chuckNorrisFacts = signal<any>(undefined);
  isFetching = signal<Boolean>(false);
  private httpClient = inject(HttpClient);

  ngOnInit(): void {
    this.getChuckNorrisFacts();
  }

  getChuckNorrisFacts = () => {
    this.isFetching.set(true);
    return this.httpClient.get('https://api.chucknorris.io/jokes/random').pipe(
      map((res) => res),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error('something went wrong in the api'));
      })
    );
  };
}

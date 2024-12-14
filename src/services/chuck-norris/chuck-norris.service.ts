import { HttpClient } from '@angular/common/http';
import { inject, Injectable, OnInit, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Fact } from '../../app/components/model/model';

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
      map((res) => res as Fact),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error('Could not fetch the api'));
      })
    );
  };
}

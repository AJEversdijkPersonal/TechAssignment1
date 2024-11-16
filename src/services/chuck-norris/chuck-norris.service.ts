import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable, OnInit, signal } from '@angular/core';
import { ChuckNorrisFact } from './service.model';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChuckNorrisService implements OnInit {
  chuckNorrisFacts = signal<any>(undefined);
  isFetching = signal<Boolean>(false);
  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.getChuckNorrisFacts();
  }

  getChuckNorrisFacts = () => {
    this.isFetching.set(true);
    const chuckNorrisFactsSubscription = this.httpClient
      .get('https://api.chucknorris.io/jokes/random')
      .subscribe({
        next: (res) => {
          this.chuckNorrisFacts.set(res);
          console.log(res);
        },
        complete: () => this.isFetching.set(false),
        error: (res) => console.log('call failed', res?.error),
      });
    this.destroyRef.onDestroy(() => {
      chuckNorrisFactsSubscription.unsubscribe();
    });
  };
}

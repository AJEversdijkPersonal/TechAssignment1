import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChuckNorrisService } from '../services/chuck-norris/chuck-norris.service';
import { Fact } from './components/model/model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'techAssesment1';
  isFetching = signal<boolean>(false);
  error = signal<string>('');
  fact = signal<Fact | null>(null);
  facts = signal<Fact[]>([]);
  newFacts = signal<boolean>(false);
  private destroyRef = inject(DestroyRef);

  private factServer = inject(ChuckNorrisService);
  interval = signal(() => {
    if (this.newFacts()) {
      this.startFetchingFacts();
    }
  });

  chuckNorrisSub: Subscription | undefined;

  ngOnInit(): void {
    this.isFetching.set(true);
    this.startFetchingFacts();

    this.destroyRef.onDestroy(() => {
      this.chuckNorrisSub?.unsubscribe();
    });
  }

  startFetchingFacts = () => {
    setInterval(() => {
      this.chuckNorrisSub = this.factServer.getChuckNorrisFacts().subscribe({
        next: (res) => {
          console.log(res);
          this.fact.set(res);
          this.pushToFacts(res);
        },
        complete: () => {
          this.isFetching.set(false);
        },
        error: (error) => {
          console.log(error);
          this.error.set(error.message);
        },
      });
    }, 5000);
  };

  pushToFacts = (fact: Fact) => {
    this.facts.update((values) => {
      if (this.facts().length < 10) {
        return [...values, fact];
      } else {
        this.facts().shift();
        return [...values, fact];
      }
    });
    console.log('new facts', this.facts());
  };

  toggleChuckNorrisFacts = () => {
    this.newFacts.update(() => !this.newFacts());
    console.log(this.newFacts());
  };
}

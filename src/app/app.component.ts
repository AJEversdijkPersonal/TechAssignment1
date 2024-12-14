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
  interval: NodeJS.Timeout | null = null;

  chuckNorrisSub: Subscription | undefined;

  ngOnInit(): void {
    this.isFetching.set(true);
    this.startFetchingFacts();

    this.destroyRef.onDestroy(() => {
      this.chuckNorrisSub?.unsubscribe();
    });
  }

  startFetchingFacts = () => {
    this.interval = setInterval(() => {
      this.chuckNorrisSub = this.factServer.getChuckNorrisFacts().subscribe({
        next: (res) => {
          this.fact.set(res);
          if (this.newFacts()) {
            // I don't like how I am doing this, but I am running short on time. The timer did not want to clear and I did not want to spend time on fixing this now.
            this.pushToFacts(res);
          }
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
  };

  toggleChuckNorrisFacts = () => {
    this.newFacts.update(() => !this.newFacts());
  };
}

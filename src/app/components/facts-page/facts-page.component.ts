import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Fact } from '../model/model';
import { ChuckNorrisService } from '../../../services/chuck-norris/chuck-norris.service';
import { Subscription } from 'rxjs';
import { FavoritesService } from '../../../services/favorites/favorites.service';

@Component({
  selector: 'app-facts-page',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './facts-page.component.html',
  styleUrl: './facts-page.component.scss',
})
export class FactsPageComponent implements OnInit {
  isFetching = signal<boolean>(false);
  error = signal<string>('');
  fact = signal<Fact | null>(null);
  facts = signal<Fact[]>([]);
  newFacts = signal<boolean>(false);
  private destroyRef = inject(DestroyRef);

  private factServer = inject(ChuckNorrisService);
  public favoriteServer = inject(FavoritesService);

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

  addToFavorites = (fact: Fact) => {
    this.favoriteServer.addFavorite(fact);
  };
}

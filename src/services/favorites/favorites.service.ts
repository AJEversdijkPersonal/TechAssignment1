import { computed, Injectable, OnInit, signal } from '@angular/core';
import { Fact } from '../../app/components/model/model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  #favorites = signal<Fact[]>([]);
  #favoritesString = signal<string | null>(null);
  favorites = computed(this.#favorites);

  getFavorites = () => {
    this.#favoritesString.set(localStorage.getItem('favoriteFacts'));
    // This syntax is so stupid, I really don't think this should be needed, but the linter wants it this way.
    // JSON.parse(this.favoritesString()) should just be accepted after if(this.favoritesString())
    // Interesting little learning from this project, so I decided to leave it as a comment.
    const favoritesString = this.#favoritesString();
    if (favoritesString) {
      this.#favorites.set(JSON.parse(favoritesString));
      console.log(this.favorites());
    }
  };

  addFavorite = (fact: Fact) => {
    this.#favorites.update((values) => [...values, fact]);
    localStorage.setItem('favoriteFacts', JSON.stringify(this.favorites()));
    this.getFavorites();
  };

  removeFavorite = (id: string) => {
    this.#favorites.update((values) =>
      values.filter((value) => value.id !== id)
    );
    localStorage.setItem('favoriteFacts', JSON.stringify(this.favorites()));
    this.getFavorites();
  };
}

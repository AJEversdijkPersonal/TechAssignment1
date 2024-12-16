import { computed, Injectable, OnInit, signal } from '@angular/core';
import { Fact } from '../../app/components/model/model';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  favoritesSignal = signal<Fact[]>([]);
  favoritesStringSignal = signal<string | null>(null);
  favorites = computed(this.favoritesSignal);

  getFavorites = () => {
    this.favoritesStringSignal.set(localStorage.getItem('favoriteFacts'));
    // This syntax is so stupid, I really don't think this should be needed, but the linter wants it this way.
    // JSON.parse(this.favoritesString()) should just be accepted after if(this.favoritesString())
    // Interesting little learning from this project, so I decided to leave it as a comment.
    const favoritesString = this.favoritesStringSignal();
    if (favoritesString) {
      this.favoritesSignal.set(JSON.parse(favoritesString));
    }
  };

  addFavorite = (fact: Fact) => {
    this.favoritesSignal.update((values) => [...values, fact]);
    localStorage.setItem('favoriteFacts', JSON.stringify(this.favorites()));
    this.getFavorites();
  };

  removeFavorite = (id: string) => {
    this.favoritesSignal.update((values) =>
      values.filter((value) => value.id !== id)
    );
    localStorage.setItem('favoriteFacts', JSON.stringify(this.favorites()));
    this.getFavorites();
  };
}

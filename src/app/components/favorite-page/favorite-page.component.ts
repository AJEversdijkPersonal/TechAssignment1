import { Component, inject, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Fact } from '../model/model';
import { FavoritesService } from '../../../services/favorites/favorites.service';

@Component({
  selector: 'app-favorite-page',
  standalone: true,
  imports: [MatListModule, MatButtonModule],
  templateUrl: './favorite-page.component.html',
  styleUrl: './favorite-page.component.scss',
})
export class FavoritePageComponent implements OnInit {
  public favoriteService = inject(FavoritesService);
  favoriteFacts = signal<Fact[]>([]);

  ngOnInit(): void {
    this.favoriteService.getFavorites();
    this.favoriteFacts.set(this.favoriteService.favorites());
    console.log('favorites', this.favoriteFacts());
  }
}

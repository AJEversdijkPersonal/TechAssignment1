import { Component } from '@angular/core';
import { FavoritePageComponent } from '../favorite-page/favorite-page.component';
import { FactsPageComponent } from '../facts-page/facts-page.component';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [FavoritePageComponent, FactsPageComponent],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
})
export class MainPageComponent {}

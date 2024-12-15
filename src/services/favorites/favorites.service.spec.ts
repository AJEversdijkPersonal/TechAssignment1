import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Fact } from '../../app/components/model/model';

describe('FavoritesService', () => {
  let service: FavoritesService;
  const fact: Fact = {
    categories: [],
    created_at: '2020-01-05 13:42:23.484083',
    icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
    id: '7cLN3z4VSV2NX-0XL8Kpsw',
    updated_at: '2020-01-05 13:42:23.484083',
    url: 'https://api.chucknorris.io/jokes/7cLN3z4VSV2NX-0XL8Kpsw',
    value:
      'Chuck Norris was once invited to a Square Dance Hoedown. For clear and obvious reasons, there were no survivors.',
  };
  const factTwo: Fact = {
    categories: [],
    created_at: '2020-01-05 13:42:24.40636',
    icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
    id: 'DfNJKCAWTV6ARaxCxhkwhg',
    updated_at: '2020-01-05 13:42:24.40636',
    url: 'https://api.chucknorris.io/jokes/DfNJKCAWTV6ARaxCxhkwhg',
    value:
      'Chuck Norris can win a gunfight without firing a shot. And without a gun.',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritesService);
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty favorites', () => {
    expect(service.favorites()).toEqual([]);
  });

  it('should add a favorite', () => {
    service.addFavorite(fact);
    expect(service.favorites()).toEqual([fact]);
  });

  it('should add another favorite', () => {
    service.addFavorite(fact);
    service.addFavorite(factTwo);
    expect(service.favorites()).toEqual([fact, factTwo]);
  });

  it('should save favorites to localStorage', () => {
    service.addFavorite(fact);
    expect(localStorage.getItem('favoriteFacts')).toEqual(
      JSON.stringify([fact])
    );
  });

  it('should load favorites from localStorage', () => {
    localStorage.setItem('favoriteFacts', JSON.stringify([fact]));
    service.getFavorites();
    expect(service.favorites()).toEqual([fact]);
  });

  it('should handle empty localStorage', () => {
    service.getFavorites();
    expect(service.favorites()).toEqual([]);
  });

  it('should remove a favorite', () => {
    service.addFavorite(fact);
    service.addFavorite(factTwo);
    expect(service.favorites().length).toEqual(2);
    service.removeFavorite(fact.id);
    expect(service.favorites()).toEqual([factTwo]);
  });
});

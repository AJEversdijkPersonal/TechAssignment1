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
  const facts: Fact[] = [
    {
      categories: [],
      created_at: '2020-01-05 13:42:29.855523',
      icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
      id: 'g2NhQzDvQ0O1r8IDifi4iw',
      updated_at: '2020-01-05 13:42:29.855523',
      url: 'https://api.chucknorris.io/jokes/g2NhQzDvQ0O1r8IDifi4iw',
      value:
        'In the year 4321 Chuck Norris gave one ∞th of his power to an elderly man, the next day the man started World War 12.',
    },
    {
      categories: [],
      created_at: '2020-01-05 13:42:23.484083',
      icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
      id: '7cLN3z4VSV2NX-0XL8Kpsw',
      updated_at: '2020-01-05 13:42:23.484083',
      url: 'https://api.chucknorris.io/jokes/7cLN3z4VSV2NX-0XL8Kpsw',
      value:
        'Chuck Norris was once invited to a Square Dance Hoedown. For clear and obvious reasons, there were no survivors.',
    },
    {
      categories: [],
      created_at: '2020-01-05 13:42:24.142371',
      icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
      id: '0Z2AUYZ7Q4SfpWCrydHwrQ',
      updated_at: '2020-01-05 13:42:24.142371',
      url: 'https://api.chucknorris.io/jokes/0Z2AUYZ7Q4SfpWCrydHwrQ',
      value:
        'Chuck Norris once farted on someone and was a very gross one that the man got sick with a disease. This disease is now what we call: Ebola.',
    },
    {
      categories: ['political'],
      created_at: '2020-01-05 13:42:29.855523',
      icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
      id: 'qwwve4bkrygyuhf6whvt4a',
      updated_at: '2020-01-05 13:42:29.855523',
      url: 'https://api.chucknorris.io/jokes/qwwve4bkrygyuhf6whvt4a',
      value:
        'The 11th commandment is ?Thou shalt not piss off Chuck Norris? This commandment is rarely enforced, as it is impossible to accomplish.',
    },
  ];

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
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoritePageComponent } from './favorite-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('FavoritePageComponent', () => {
  let component: FavoritePageComponent;
  let fixture: ComponentFixture<FavoritePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavoritePageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// I had the following and right idea's of easily testing this, but it seems to not be that easy.
// Will need to look into how to properly mock these kinds of services.

// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { FavoritePageComponent } from './favorite-page.component';
// import { FavoritesService } from '../../../services/favorites/favorites.service';
// import { of } from 'rxjs';
// import { Fact } from '../model/model';
// import { MatListModule } from '@angular/material/list';
// import { MatButtonModule } from '@angular/material/button';

// describe('FavoritePageComponent', () => {
//   let component: FavoritePageComponent;
//   let fixture: ComponentFixture<FavoritePageComponent>;
//   let mockFavoritesService: jest.Mocked<FavoritesService>;

//   const fact: Fact = {
//     categories: [],
//     created_at: '2020-01-05 13:42:23.484083',
//     icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
//     id: '7cLN3z4VSV2NX-0XL8Kpsw',
//     updated_at: '2020-01-05 13:42:23.484083',
//     url: 'https://api.chucknorris.io/jokes/7cLN3z4VSV2NX-0XL8Kpsw',
//     value:
//       'Chuck Norris was once invited to a Square Dance Hoedown. For clear and obvious reasons, there were no survivors.',
//   };

//   beforeEach(async () => {
//     mockFavoritesService = {
//       getFavorites: jest.fn(),
//       addFavorite: jest.fn(),
//       removeFavorite: jest.fn(),
//       favorites: jest.fn().mockReturnValue(of([fact])),
//       favoritesSignal: jest.fn().mockReturnValue(of([fact])),
//       favoritesStringSignal: jest.fn().mockReturnValue(of([fact])),
//     } as any; //jest.Mocked<FavoritesService>;

//     await TestBed.configureTestingModule({
//       imports: [FavoritePageComponent, MatListModule, MatButtonModule],
//       providers: [
//         { provide: FavoritesService, useValue: mockFavoritesService },
//       ],
//     }).compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(FavoritePageComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should call getFavorites on init', () => {
//     expect(FavoritesService.getFavorites()).toHaveBeenCalled();
//   });

//   it('should set favoriteFacts on init', () => {
//     component.ngOnInit();
//     expect(component.favoriteFacts()).toEqual([fact]);
//   });
// });

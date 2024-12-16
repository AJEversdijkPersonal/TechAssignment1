import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FactsPageComponent } from './facts-page.component';
import { ChuckNorrisService } from '../../../services/chuck-norris/chuck-norris.service';
import { FavoritesService } from '../../../services/favorites/favorites.service';
import { of, throwError } from 'rxjs';
import { Fact } from '../model/model';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

describe('FactsPageComponent', () => {
  let component: FactsPageComponent;
  let fixture: ComponentFixture<FactsPageComponent>;
  let chuckNorrisService: ChuckNorrisService;
  let favoritesService: FavoritesService;

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

  beforeEach(async () => {
    const chuckNorrisServiceMock = {
      getChuckNorrisFacts: jest.fn().mockReturnValue(of(fact)),
    };

    const favoritesServiceMock = {
      addFavorite: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [FactsPageComponent, MatListModule, MatButtonModule],
      providers: [
        { provide: ChuckNorrisService, useValue: chuckNorrisServiceMock },
        { provide: FavoritesService, useValue: favoritesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FactsPageComponent);
    component = fixture.componentInstance;
    chuckNorrisService = TestBed.inject(ChuckNorrisService);
    favoritesService = TestBed.inject(FavoritesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should start fetching facts on init', () => {
    jest.spyOn(component, 'startFetchingFacts');
    component.ngOnInit();
    expect(component.startFetchingFacts).toHaveBeenCalled();
  });

  // TODO fix these two later
  //   it('should fetch facts and update fact signal', () => {
  //     component.startFetchingFacts();
  //     expect(chuckNorrisService.getChuckNorrisFacts).toHaveBeenCalled();
  //     expect(component.fact()).toEqual(fact);
  //   });

  //   it('should handle error when fetching facts', () => {
  //     jest
  //       .spyOn(chuckNorrisService, 'getChuckNorrisFacts')
  //       .mockReturnValue(throwError(() => new Error('Error fetching facts')));
  //     component.startFetchingFacts();
  //     expect(component.error()).toBe('Error fetching facts');
  //   });

  it('should add fact to favorites', () => {
    component.addToFavorites(fact);
    expect(favoritesService.addFavorite).toHaveBeenCalledWith(fact);
  });

  it('should toggle newFacts signal', () => {
    const initialNewFacts = component.newFacts();
    component.toggleChuckNorrisFacts();
    expect(component.newFacts()).toBe(!initialNewFacts);
  });

  it('should push new fact to facts array', () => {
    component.pushToFacts(fact);
    expect(component.facts()).toContain(fact);
  });

  it('should not exceed 10 facts in facts array', () => {
    for (let i = 0; i < 11; i++) {
      component.pushToFacts({
        id: i.toString(),
        value: `Fact ${i}`,
        updated_at: '',
        url: '',
        categories: [],
        created_at: '',
        icon_url: '',
      });
    }
    expect(component.facts().length).toBe(10);
  });
});

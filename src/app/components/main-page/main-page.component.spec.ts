import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { MainPageComponent } from './main-page.component';
import { MatButtonModule } from '@angular/material/button';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPageComponent, MatButtonModule],
    }).compileComponents();

    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to the specified route', () => {
    const navigateSpy = jest.spyOn(router, 'navigate');
    const route = '/test-route';
    component.navigateTo(route);
    expect(navigateSpy).toHaveBeenCalledWith([route]);
  });
});

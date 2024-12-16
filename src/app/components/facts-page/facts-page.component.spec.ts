import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsPageComponent } from './facts-page.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('factsPageComponent', () => {
  let component: FactsPageComponent;
  let fixture: ComponentFixture<FactsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FactsPageComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(FactsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

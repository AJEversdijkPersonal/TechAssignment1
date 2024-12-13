import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChuckNorrisService } from '../services/chuck-norris/chuck-norris.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'techAssesment1';
  isFetching = signal(false);
  error = signal<string>('');
  fact = signal<string>('');
  facts = signal<string[]>([]);

  private destroyRef = inject(DestroyRef);

  private factServer = inject(ChuckNorrisService);

  ngOnInit(): void {
    this.isFetching.set(true);
    const chuckNorrisSub = this.factServer.getChuckNorrisFacts().subscribe({
      next: (res) => {
        console.log(res);
        // this.fact.set(re);
      },
      complete: () => {
        this.isFetching.set(false);
      },
      error: (error) => {
        console.log(error);
        this.error.set(error.message);
      },
    });

    this.destroyRef.onDestroy(() => {
      chuckNorrisSub.unsubscribe();
    });
  }
  printFacts = () => {
    console.log(this.factServer.chuckNorrisFacts());
  };
}

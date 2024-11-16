import { Component, inject, OnInit } from '@angular/core';
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

  private factServer = inject(ChuckNorrisService);

  ngOnInit(): void {}
  printFacts = () => {
    console.log(this.factServer.chuckNorrisFacts());
  };
}

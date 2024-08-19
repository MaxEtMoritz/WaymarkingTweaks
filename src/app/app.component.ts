import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'WaymarkingTweaks';

  constructor(private http: HttpClient) {
    http
      .get('https://www.waymarking.com', { responseType: 'text' })
      .subscribe({
        next: (r) => console.debug(r),
        error: (e) => console.error(e),
      });
  }
}

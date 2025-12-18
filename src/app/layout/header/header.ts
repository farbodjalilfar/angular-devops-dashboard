import { Component, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs';
import { AsyncPipe } from '@angular/common'; // ✅ ADD THIS

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [AsyncPipe], // ✅ ADD THIS
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
  private router = inject(Router);

  title$ = this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(() => {
      let route = this.router.routerState.root;
      while (route.firstChild) {
        route = route.firstChild;
      }
      return route.snapshot.data['title'] ?? '';
    })
  );
}

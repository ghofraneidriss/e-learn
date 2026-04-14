import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  isAdminRoute = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter((event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.isAdminRoute = event.urlAfterRedirects.startsWith('/admin/');
    });
  }

  ngOnInit(): void {
    const redirectPaths = ['/', '/frontoffice/index'];
    const currentPath = window.location.pathname;
    if (redirectPaths.includes(currentPath)) {
      window.location.href = '/frontoffice/eduact-html/index.html';
    }
  }
}

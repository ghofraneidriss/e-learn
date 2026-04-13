import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App implements OnInit {
  ngOnInit(): void {
    const redirectPaths = ['/', '/frontoffice/index'];
    const currentPath = window.location.pathname;
    if (redirectPaths.includes(currentPath)) {
      window.location.href = '/frontoffice/eduact-html/index.html';
    }
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { Navbar } from './shared/navbar/navbar';
import { Footer } from './shared/footer/footer';
import { initFlowbite } from 'flowbite';
import { filter } from 'rxjs';
import {AuthService} from './service/auth-service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private router = inject(Router);
  private authService = inject(AuthService);
  isPanel = false;

  ngOnInit(): void {
    initFlowbite();
    this.authService.checkAuthStatus();
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: NavigationEnd) => {
        this.isPanel = e.urlAfterRedirects.startsWith('/panel');
      });
  }
}

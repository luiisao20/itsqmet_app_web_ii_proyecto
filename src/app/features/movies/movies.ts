import { Component } from '@angular/core';
import { Button } from '../../shared/button/button';
import { RouterOutlet, RouterLinkWithHref } from '@angular/router';

@Component({
  selector: 'app-movies',
  imports: [RouterOutlet, Button, RouterLinkWithHref],
  templateUrl: './movies.html',
  styleUrl: './movies.css',
})
export class Movies {}

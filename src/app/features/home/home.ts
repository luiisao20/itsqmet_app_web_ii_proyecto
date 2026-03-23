import { Component } from '@angular/core';
import { Hero } from '../../shared/hero/hero';
import { MoviesGrid } from '../../shared/movies-grid/movies-grid';
import { Experience } from '../../shared/experience/experience';
import { EstablishmentFilter } from "../../shared/establishment-filter/establishment-filter";
import { DateFilter } from '../../shared/date-filter/date-filter';
import { BillboardTabs } from '../../shared/billboard-tabs/billboard-tabs';
import { Categories } from "../../shared/categories/categories";

@Component({
  selector: 'app-home',
  imports: [Hero, MoviesGrid, Experience, EstablishmentFilter, DateFilter, BillboardTabs, Categories],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}

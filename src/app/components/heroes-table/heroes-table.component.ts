import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';

@Component({
  selector: 'my-heroes',
  templateUrl: './heroes-table.component.html',
  styleUrls: ['./heroes-table.component.css']
})


export class HeroesTableComponent implements OnInit {
  heroes: Hero[];
  error: any;
  dataSource = [];
  displayedColumns = ['id', 'name'];

  constructor(private router: Router, private heroService: HeroService) { }

  getHeroes(): void {
    this.heroService
      .fetchHeroes()
      .subscribe(
        heroes => (this.heroes = heroes),
        error => (this.error = error)
      )
  }

  ngOnInit(): void {
    this.getHeroes();
  }

}

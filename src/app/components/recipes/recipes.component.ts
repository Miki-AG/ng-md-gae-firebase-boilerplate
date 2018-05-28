import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';
import { DummieService } from '../../services/dummie.service';

@Component({
    selector: 'recipes',
    templateUrl: './recipes.component.html',
    styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
    heroes: Hero[] = [];
    public recipes = {};

    constructor(
        private router: Router,
        private heroService: HeroService,
        private _dummieService: DummieService) {
    }

    ngOnInit(): void {
        // this.heroService.getHeroes()
        //     .subscribe(heroes => this.heroes = heroes.slice(1, 5));
        this.getRecipes();

    }

    gotoDetail(hero: Hero): void {
        const link = ['/detail', hero.id];
        this.router.navigate(link);
    }

    getRecipes() {
        this._dummieService.getRecipes().subscribe(
            data => {
                this.recipes = data
            },
            err => console.error(err),
            () => console.log('done loading recipes')
        );
    }
}

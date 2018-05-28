import { Component } from '@angular/core';
import { DummieService } from '../../services/dummie.service';
import { HeroService } from '../../services/hero.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Tour of heroes';
    public recipes = {};

    constructor(private _dummieService: DummieService, private _heroService: HeroService) {

    }

    ngOnInit() {
        this._heroService.fetchHeroes().subscribe(
            data => {
                this.recipes = data
            },
            err => console.error(err),
            () => console.log('done loading heroes')
        );
        this.getRecipes();
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

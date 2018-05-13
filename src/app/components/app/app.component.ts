import { Component } from '@angular/core';
import { DummieService } from '../../services/dummie.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Tour of heroes';
    public recipes = {};

    constructor(private _dummieService: DummieService) {

    }
    ngOnInit() {
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

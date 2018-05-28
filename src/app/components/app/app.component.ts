import { Component } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Tour of heroes';

    constructor(private _heroService: HeroService) {

    }

    ngOnInit() {
        this._heroService.fetchHeroes().subscribe();
    }
}

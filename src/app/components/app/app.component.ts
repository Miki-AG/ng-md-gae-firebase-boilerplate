import { Component } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Observable } from 'rxjs';
import { NavigationStart, Router } from '@angular/router';
import { googleAnalytics } from '../../../assets/ga-scripts';
import { filter } from 'rxjs/operators';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'Tour of heroes';

    constructor(private _heroService: HeroService, private router: Router) {
        this.router.events.pipe(
            filter(event => event instanceof NavigationStart))
            .subscribe(event => {
                const url = event['url'];
                if (url !== null && url !== undefined && url !== '' && url.indexOf('null') < 0) {
                    googleAnalytics(url);
                }
            });
    }

    ngOnInit() {
        this._heroService.fetchHeroes().subscribe();
    }
}

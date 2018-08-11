import { catchError, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { Hero } from '../types';
import { HeroSearchService } from '../../services/hero-search.service';
import { Observable, Subject, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
    selector: 'my-hero-search',
    templateUrl: './hero-search.component.html',
    styleUrls: ['./hero-search.component.css'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit {

    heroes: Observable<Hero[]>;

    private searchTerms = new Subject<string>();

    constructor(
        private heroSearchService: HeroSearchService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.heroes = this.searchTerms.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            switchMap(
                term => term ? this.heroSearchService.search(term) : of<Hero[]>([])
            ),
            catchError(error => {
                // TODO: real error handling
                console.log(`Error in component ... ${error}`);
                return of<Hero[]>([]);
            })
        );
    }
    search(term: string): void {
        this.searchTerms.next(term);
    }
    gotoDetail(hero: Hero): void {
        const link = ['/detail', hero.id];
        this.heroes = of<Hero[]>([]);
        this.router.navigate(link);
    }
}

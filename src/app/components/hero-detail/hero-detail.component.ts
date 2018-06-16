import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from '../types';
import { HeroService } from '../../services/hero.service';

@Component({
    selector: 'my-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                let id: string = params['id'];
                this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
            } else {
                this.hero = new Hero();
            }
        });
    }
    save(): void {
        this.heroService.save(this.hero).subscribe((hero: Hero) => {
            this.hero = hero;
            window.history.back();
        }, error => (this.error = error));
    }
}

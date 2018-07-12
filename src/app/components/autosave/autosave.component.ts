import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatSpinner } from '@angular/material';
import { HeroService } from '../../services/hero.service';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
    selector: 'autosave',
    templateUrl: './autosave.component.html',
    styleUrls: ['./autosave.component.css']
})
export class AutosaveComponent implements OnInit {
    status: string;

    constructor(
        public heroService: HeroService
    ) { }

    ngOnInit(): void {
        this.heroService.subjectStatusObservable.subscribe(
            status => {
                this.status = status;
                let countdown1 = interval(200).subscribe(() => {
                    this.status = 'SAVING_CHECK';
                    countdown1.unsubscribe();
                    let countdown2 = interval(1000).subscribe(() => {
                        this.status = '';
                        countdown2.unsubscribe();
                    });
                });
            },
            error => {
                console.log('error!')
            });
    }
}

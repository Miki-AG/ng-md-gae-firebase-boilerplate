import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';
import { DialogAddHero } from '../dialog-add-hero/dialog-add-hero.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
    selector: 'my-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})


export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    error: any;
    dataSource = [];
    displayedColumns = ['id', 'name'];

    constructor(private router: Router,
        private heroService: HeroService,
        public dialog: MatDialog) {

        // this.heroService.data.subscribe(heroes => {
        //     console.log('data - Data updated!', heroes)
        //     if (heroes) {
        //         this.heroes = heroes.items;
        //     }
        // });
    }
    ngOnInit(): void {
        // this.heroService
        //     .fetchHeroes()
        //     .subscribe(
        //         heroes => (this.heroes = heroes),
        //         error => (this.error = error)
        //     )
        this.heroService.subject.subscribe(heroes => {
            console.log(heroes)
            if (heroes) {
                this.heroes = heroes.items;
            }
        });

    }

    openDialog(): void {
        let dialogRef = this.dialog.open(DialogAddHero, {
            width: '400px',
            data: {
                title: 'New hero',
                description: 'Add a new hero using this dialog'
            }
        });
        //dialogRef.afterClosed().subscribe(result => { });
    }
    addHero(): void {
        this.openDialog();
    }

    close(savedHero: Hero): void {
        if (savedHero) {
        }
    }

    deleteHero(hero: Hero, event: any): void {
        event.stopPropagation();
        this.heroService.delete(hero).subscribe(res => {
            this.heroes = this.heroes.filter(h => h !== hero);
            if (this.selectedHero === hero) {
                this.selectedHero = null;
            }
        }, error => (this.error = error));
    }

    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}

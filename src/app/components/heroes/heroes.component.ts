import * as firebase from 'firebase/app';
import { AuthService } from '../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { DialogAddHero } from '../dialog-add-hero/dialog-add-hero.component';
import { Hero } from '../types';
import { HeroService } from '../../services/hero.service';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { AppConsts } from '../consts';

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
    public currentUser: firebase.User;

    constructor(private router: Router,
        public heroService: HeroService,
        public authService: AuthService,
        public snackBar: MatSnackBar,
        public dialog: MatDialog,
        public C: AppConsts) {
    }

    ngOnInit(): void {
        this.heroService.subject.subscribe(
            heroes => {
                if (heroes && heroes.items) {
                    this.heroes = heroes.items;
                }
            },
            error => {
                this.error = error;
            });
        this.authService.getCurrentUser().subscribe(user => {
            this.currentUser = user
        });
    }
    openDialog(): void {
        let dialogRef = this.dialog.open(DialogAddHero, {
            width: '400px',
            data: {
                title: 'New hero',
                description: this.C.MESSAGES.ADD_HERO
            }
        });
        dialogRef.afterClosed().subscribe(result => { });
    }
    addHero(): void {
        this.openDialog();
    }
    close(savedHero: Hero): void {
        if (savedHero) { }
    }
    deleteHero(hero: Hero, event: any): void {
        event.stopPropagation();
        if (this.currentUser) {
            this.heroService.delete(hero).subscribe(res => {
                this.heroes = this.heroes.filter(h => h !== hero);
                if (this.selectedHero === hero) {
                    this.selectedHero = null;
                }
            }, response => {
                this.error = response.error;
                this.snackBar.open(response.error.message, 'OK', {
                    duration: 2000,
                });
            });
        }
        else {
            this.snackBar.open(this.C.MESSAGES.LOGGED_IN_SUCCESS, 'OK', {
                duration: 2000,
            });
        }
    }
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }
}

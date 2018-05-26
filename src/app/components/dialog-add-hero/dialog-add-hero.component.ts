import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Hero } from '../hero';
import { HeroService } from '../../services/hero.service';

/**
 * @title Dialog Overview
 */
@Component({
  selector: 'dialog-add-hero',
  templateUrl: './dialog-add-hero.component.html',
  styleUrls: ['./dialog-add-hero.component.css'],
})

export class DialogAddHero {
  private hero: Hero;
  private error: any;

  constructor(
    public dialogRef: MatDialogRef<DialogAddHero>,
    private heroService: HeroService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any, ) {
    this.hero = new Hero();
  }

  save(): void {
    this.heroService.save(this.hero).subscribe(hero => {
      // this.hero = hero;
      this.dialogRef.close();
      return hero;
    }, error => {
      this.error = error;
      this.snackBar.open(error, 'OK', {
        duration: 2000,
      });
    });
  }
}
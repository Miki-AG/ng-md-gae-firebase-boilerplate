import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
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
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.hero = new Hero();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  save(): void {
    this.heroService.save(this.hero).subscribe(hero => {
      console.log(hero)
      this.dialogRef.close();
      return hero;
    }, error => {
      console.log(error)
      this.error = error;
      return error;
    }); // TODO: Display error message
  }
}
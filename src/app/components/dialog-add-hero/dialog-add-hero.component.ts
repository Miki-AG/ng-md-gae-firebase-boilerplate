import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'dialog-add-hero',
    templateUrl: './dialog-add-hero.component.html',
    styleUrls: ['./dialog-add-hero.component.css'],
})


export class DialogAddHero {

    constructor(
        public dialogRef: MatDialogRef<DialogAddHero>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

    onNoClick(): void {
        this.dialogRef.close();
    }

}

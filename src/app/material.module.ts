import { NgModule } from '@angular/core';
import { DialogAddHero } from './components/dialog-add-hero/dialog-add-hero.component';

import {
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatTableModule,
    MatInputModule,
    MatDialogModule,
    MatSnackBarModule
} from '@angular/material';

@NgModule({
    imports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatTableModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule
    ],
    entryComponents: [DialogAddHero],
    exports: [
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatListModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatTableModule,
        MatInputModule,
        MatDialogModule,
        MatSnackBarModule
    ]
})
export class MaterialModule { }
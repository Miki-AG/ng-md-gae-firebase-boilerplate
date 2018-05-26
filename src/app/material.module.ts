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
    MatDialogModule
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
        MatDialogModule
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
        MatDialogModule
    ]
})
export class MaterialModule { }
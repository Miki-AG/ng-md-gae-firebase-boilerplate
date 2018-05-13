import { NgModule } from '@angular/core';

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
    MatInputModule
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
        MatInputModule
    ],
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
        MatInputModule
    ]
})
export class MaterialModule { }
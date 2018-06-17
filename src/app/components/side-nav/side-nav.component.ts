import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DialogAuth } from '../dialog-auth/dialog-auth.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';

@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;
    private currentUser: firebase.User;

    constructor(
        private authService: AuthService,
        private changeDetectorRef: ChangeDetectorRef,
        private media: MediaMatcher,
        public dialog: MatDialog) {
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnInit() {
        this.authService.getCurrentUser().subscribe(user => this.currentUser = user);
    }

    openDialog(): void {
        let dialogRef = this.dialog.open(DialogAuth, {
            width: '400px',
            data: {
                title: 'New hero',
                description: 'Add a new hero using this dialog'
            }
        });
        dialogRef.afterClosed().subscribe(result => { });
    }

    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}

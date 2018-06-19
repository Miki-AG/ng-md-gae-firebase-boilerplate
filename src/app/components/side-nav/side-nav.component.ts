import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { DialogAuth } from '../dialog-auth/dialog-auth.component';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '../../services/auth.service';
import * as firebase from 'firebase/app';
import { MatSidenav } from '@angular/material/sidenav';
import { LOGIN_OR_REG } from '../enums';


@Component({
    selector: 'app-side-nav',
    templateUrl: './side-nav.component.html',
    styleUrls: ['./side-nav.component.css']
})

export class SideNavComponent implements OnInit {
    @ViewChild('snav') sidenav: MatSidenav;

    mobileQuery: MediaQueryList;

    private _mobileQueryListener: () => void;
    private currentUser: firebase.User;

    private lor: typeof LOGIN_OR_REG = LOGIN_OR_REG;

    constructor(
        private authService: AuthService,
        public snackBar: MatSnackBar,
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
    openDialog(type: LOGIN_OR_REG): void {
        this.sidenav.close();
        let dialogRef = this.dialog.open(DialogAuth, {
            width: '400px',
            data: {
                type: type
            }
        });
    }
    logoff(): void {
        this.sidenav.close();
        this.authService.logoff().then((value: any) => {
            this.snackBar.open('You have been logged off', 'OK', {
                duration: 2000,
            });
        }).catch((reason: any) => {
            this.snackBar.open(reason, 'OK', {
                duration: 2000,
            });
        })
    }
    ngOnDestroy(): void {
        this.mobileQuery.removeListener(this._mobileQueryListener);
    }
}

import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { User } from '../types';
import { AuthService } from '../../services/auth.service';
import { LOGIN_OR_REG } from '../enums';

const EMAIL_REGEXP = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;

/**
 * @title Dialog Overview
 */
@Component({
    selector: 'dialog-auth',
    templateUrl: './dialog-auth.component.html',
    styleUrls: ['./dialog-auth.component.css'],
})

export class DialogAuth {
    private error: any;
    public user: User;
    public lor: typeof LOGIN_OR_REG = LOGIN_OR_REG;

    constructor(
        public dialogRef: MatDialogRef<DialogAuth>,
        public snackBar: MatSnackBar,
        public afAuth: AngularFireAuth,
        public authService: AuthService,
        @Inject(MAT_DIALOG_DATA) public data: any) {
        this.user = new User();
    }

    login(): void {
        if ((this.user.email.length === 0) && (!EMAIL_REGEXP.test(this.user.email))) {
            this.snackBar.open('Please provide a valid email!', 'OK', {
                duration: 2000,
            });
        }
        else {
            this.authService.loginWithEmail(
                this.user.email,
                this.user.password)
                .then((response: any) => {
                    console.log(response)
                    this.snackBar.open('Welcome back ' + response.user.displayName + '!', 'OK', {
                        duration: 2000,
                    });
                    this.dialogRef.close();
                })
                .catch((reason: any) => {
                    console.log(reason)
                    this.snackBar.open(reason, 'OK', {
                        duration: 2000,
                    });
                })
        }
    }
    loginWithFacebook(): void {
        this.authService.facebookLogin()
            .then((response: any) => {
                console.log(response)
                this.snackBar.open('Welcome back ' + response.user.displayName + '!', 'OK', {
                    duration: 2000,
                });
                this.dialogRef.close();
            })
            .catch((reason: any) => {
                console.log(reason)
                this.snackBar.open(reason, 'OK', {
                    duration: 2000,
                });
            })
    }
    loginWithGoogle(): void {
        this.authService.googleLogin()
            .then((response: any) => {
                console.log(response)
                this.snackBar.open('Welcome back ' + response.user.displayName + '!', 'OK', {
                    duration: 2000,
                });
                this.dialogRef.close();
            })
            .catch((reason: any) => {
                console.log(reason)
                this.snackBar.open(reason, 'OK', {
                    duration: 2000,
                });
            })
    }
    register(): void {
        this.authService.registerWithEmail(
            this.user.email,
            this.user.username,
            this.user.password)
            .then((value: any) => {
                this.snackBar.open('Thanks for registering', 'OK', {
                    duration: 2000,
                });
                this.dialogRef.close();
            }).catch((reason: any) => {
                this.snackBar.open(reason, 'OK', {
                    duration: 2000,
                });
            })
    }
}
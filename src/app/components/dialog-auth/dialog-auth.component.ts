import { AngularFireAuth } from 'angularfire2/auth';
import { auth } from 'firebase/app';
import { AuthService } from '../../services/auth.service';
import { Component, Inject } from '@angular/core';
import { LOGIN_OR_REG } from '../enums';
import { MatDialog, MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { User } from '../types';

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
        if (this.isEmailValid()) {
            this.authService.loginWithEmail(
                this.user.email,
                this.user.password)
                .then((response: any) => {
                    this.snackBar.open('Welcome back ' + response.user.displayName + '!', 'OK', {
                        duration: 2000,
                    });
                    this.dialogRef.close();
                })
                .catch((reason: any) => {
                    this.snackBar.open(reason, 'OK', {
                        duration: 2000,
                    });
                })
        }
    }
    loginWithFacebook(): void {
        this.authService.facebookLogin()
            .then((response: any) => {
                this.snackBar.open('Welcome back ' + response.user.displayName + '!', 'OK', {
                    duration: 2000,
                });
                this.dialogRef.close();
            })
            .catch((reason: any) => {
                this.snackBar.open(reason, 'OK', {
                    duration: 2000,
                });
            })
    }
    loginWithGoogle(): void {
        this.authService.googleLogin()
            .then((response: any) => {
                this.snackBar.open('Welcome back ' + response.user.displayName + '!', 'OK', {
                    duration: 2000,
                });
                this.dialogRef.close();
            })
            .catch((reason: any) => {
                this.snackBar.open(reason, 'OK', {
                    duration: 2000,
                });
            })
    }
    resetPassword(): void {
        if (this.isEmailValid()) {
            this.authService.passwordReset(this.user.email)
                .then((response: any) => {
                    this.snackBar.open('Email sent to ' + this.user.email + '!', 'OK', {
                        duration: 2000,
                    });
                    this.dialogRef.close();
                })
                .catch((reason: any) => {
                    this.snackBar.open(reason, 'OK', {
                        duration: 2000,
                    });
                })
        }
        else {
            this.snackBar.open('Please provide a valid email!', 'OK', {
                duration: 2000,
            });
        }
    }
    isEmailValid(): boolean {
        let isValid = !((this.user.email.length === 0) && (!EMAIL_REGEXP.test(this.user.email)));
        if (!isValid) {
            this.snackBar.open('Please provide a valid email!', 'OK', {
                duration: 2000,
            });
        }
        return isValid;
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
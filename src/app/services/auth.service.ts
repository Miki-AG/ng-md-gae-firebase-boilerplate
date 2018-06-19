import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {

    private currentUser: firebase.User = null;

    constructor(
        public afAuth: AngularFireAuth
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.currentUser = user;
            } else {
                this.currentUser = null;
            }
        });
    }
    getCurrentUser() {
        return this.afAuth.authState;
    }
    loginWithEmail(email: string, pssw: string): Promise<any> {
        let promise = this.afAuth.auth.signInWithEmailAndPassword(email, pssw);
        promise
            .then((response) => {
                console.log(response)
            })
            .catch((reason) => {
            })
        return promise;
    }
    registerWithEmail(email: string, username: string, pssw: string): Promise<any> {
        let promise = this.afAuth.auth.createUserWithEmailAndPassword(email, pssw)
            .then((response) => {
                this.currentUser = response.user;
                if (username) {
                    this.currentUser.updateProfile({ displayName: username, photoURL: '' })
                        .then(() => {
                            //Success
                        }, (error) => {
                            //Error
                            console.log(error);
                        });
                }
            })
            .catch((reason: any) => {
            })
        return promise;
    }
    logoff(): Promise<any> {
        let promise = this.afAuth.auth.signOut()
            .then((response) => {
            })
            .catch((reason) => {
            })
        return promise;
    }
}
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { auth } from 'firebase/app';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';



@Injectable()
export class AuthService {

    private currentUser: firebase.User = null;
    public tokenId: string;

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
    storeTokenId() {
        firebase.auth().currentUser.getIdToken().then(token => {
            this.tokenId = token;
        });
    }
    loginWithEmail(email: string, pssw: string): Promise<any> {
        let promise = this.afAuth.auth.signInWithEmailAndPassword(email, pssw);
        promise
            .then((response) => {
                console.log(response)
                console.log('------------------')
                console.log(firebase.auth().currentUser.getIdToken())
                console.log('------------------')
                this.storeTokenId();
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
                this.tokenId = null;
                console.log('logged off!');
            })
            .catch((reason) => {
                this.tokenId = null;
                console.log('logged off (error)!');
            })
        return promise;
    }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        public authService: AuthService
    ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const authReq = request.clone({
        //     headers: request.headers.set('Authorization', this.authService.tokenId)
        // });
        // return next.handle(authReq);


        request = request.clone({
            setHeaders: {
                Authorization: `Bearer ${this.authService.tokenId}`
            }
        });
        return next.handle(request);

        // request.headers.set('Authorization', this.authService.tokenId)
        // return next.handle(request);
    }
}
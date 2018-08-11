import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from '../types';
import { HeroService } from '../../services/hero.service';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import * as firebase from 'firebase/app';

@Component({
    selector: 'my-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    @Output() autosaveStart: EventEmitter<any> = new EventEmitter();
    @Output() autosaveEnd: EventEmitter<any> = new EventEmitter();
    @Output() autosaveError: EventEmitter<any> = new EventEmitter();

    error: any;
    imgUrl: string;
    valueChangeObserver;
    public currentUser: firebase.User;

    constructor(
        private heroService: HeroService,
        public authService: AuthService,
        private route: ActivatedRoute,
        public snackBar: MatSnackBar,
        private httpCient: HttpClient
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                let id: string = params['id'];
                this.heroService.getHero(id).subscribe(hero => {
                    this.hero = hero;
                    this.imgUrl = '/view_photo/' + this.hero.blob_key;
                });
            } else {
                this.hero = new Hero();
            }
        });
        this.authService.getCurrentUser().subscribe(user => {
            this.currentUser = user
        });
    }
    onValueChange(newValue: string) {
        if (!this.valueChangeObserver) {
            Observable.create(observer => {
                this.valueChangeObserver = observer;
            }).pipe(debounceTime(1000))
                .pipe(distinctUntilChanged())
                .subscribe(() => {
                    this.save();
                });
        }
        this.valueChangeObserver.next(newValue);
    }
    save(): void {
        if (this.currentUser) {
            this.autosaveStart.emit();
            this.heroService.save(this.hero).subscribe((hero: Hero) => {
                this.autosaveEnd.emit();
                this.hero = hero;
                // this.goBack();
            }, errorResponse => {
                this.autosaveError.emit();
                this.snackBar.open(errorResponse.error.message, 'OK', {
                    duration: 2000,
                });
                this.error = errorResponse.error;
            });
        }
        else {
            this.snackBar.open('Can\'t save! You are not logged in!', 'OK', {
                duration: 2000,
            });
        }
    }
    fileSelected(files: any): void {
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Disposition': 'attachment',
                'filename': 'your-file.docx'
            })
        };
        this.httpCient.get('/get_upload_url', httpOptions)
            .subscribe(
                result => {
                    console.log(result);
                    this.uploadFile(files, result[0].upload_url);
                },
                error => {
                    console.log('There was an error: ')
                    console.log(error)
                });
    }
    uploadFile(files: any, upload_url: string): void {
        let file = files[0];
        var data = new FormData();
        data.append('file', file);
        data.append('name', file.name);
        data.append('hero-id', this.hero.id);
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Disposition': 'attachment',
                'filename': 'your-file.docx'
            })
        };

        this.httpCient.post(upload_url, data, httpOptions)
            .subscribe(
                result => {
                    this.hero.blob_key = result['blob_key'];
                    this.imgUrl = result['url'];
                    console.log(result);
                },
                error => {
                    console.log('There was an error: ')
                    console.log(error)
                });
    }
    handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error.message);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong,
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`);
        }
        // return an observable with a user-facing error message
        return throwError(
            'Something bad happened; please try again later.');
    };
    goBack(): void {
        window.history.back();
    }
}

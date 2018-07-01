import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Hero } from '../types';
import { HeroService } from '../../services/hero.service';
import { MatSnackBar } from '@angular/material';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Component({
    selector: 'my-hero-detail',
    templateUrl: './hero-detail.component.html',
    styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
    @Input() hero: Hero;
    @Output() close = new EventEmitter();
    error: any;

    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        public snackBar: MatSnackBar,
        private httpCient: HttpClient
    ) { }

    ngOnInit(): void {
        this.route.params.forEach((params: Params) => {
            if (params['id'] !== undefined) {
                let id: string = params['id'];
                this.heroService.getHero(id).subscribe(hero => (this.hero = hero));
            } else {
                this.hero = new Hero();
            }
        });
    }
    save(): void {
        this.heroService.save(this.hero).subscribe((hero: Hero) => {
            this.hero = hero;
            this.goBack();
        }, errorResponse => {
            this.snackBar.open(errorResponse.error.message, 'OK', {
                duration: 2000,
            });
            this.error = errorResponse.error;
        });
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
        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Disposition': 'attachment',
                'filename': 'your-file.docx'
            })
        };

        this.httpCient.post(upload_url, data, httpOptions)
            .subscribe(
                result => {
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

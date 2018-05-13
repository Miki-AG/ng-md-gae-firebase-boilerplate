import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class DummieService {
    constructor(private http: HttpClient) { }

    // Uses http.get() to load data from a single API endpoint
    getRecipes() {
        return this.http.get('/_ah/api/recipes_api/v1/recipes');
    }
}

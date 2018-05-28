import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError as observableThrowError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';

import { Hero } from '../components/hero';

class HeroData {
  items: Hero[];
}

@Injectable()
export class HeroService {

  // private  = new BehaviorSubject<HeroData>(null);
  // public readonly data: Observable<HeroData> = this._heroes.asObservable();

  subject: BehaviorSubject<HeroData> = new BehaviorSubject<HeroData>(null);
  _heroes: HeroData = { items: [] };

  // http://localhost:8081/_ah/api/heroes_api/v1/heroes
  // private heroesUrl = 'app/heroes'; // URL to web api
  private heroesUrl = '_ah/api/heroes_api/v1/heroes';

  constructor(private http: HttpClient) {
  }

  getHeroes() {
    return this.subject.asObservable();
  }

  fetchHeroes() {
    return this.http
      .get<HeroData>(this.heroesUrl)
      .pipe(map(data => {
        this._heroes = data;
        this.subject.next(this._heroes);
        return data.items || [];
      }), catchError(this.handleError));
  }

  getHero(id: string): Observable<Hero> {
    return this.getHeroes().pipe(
      map(heroes => heroes.items.find(hero => hero.id === id))
    );
  }

  save(hero: Hero) {
    console.log('HeroService.save (2)')
    if (!hero.name) {
      return new Observable(subscriber => {
        subscriber.error('You have to provide a name!');
      });
    }
    else {
      if (hero.id) {
        return this.put(hero);
      } else {
        return this.post(hero);
      }
    }
  }

  delete(hero: Hero) {
    const url = `${this.heroesUrl}/${hero.id}`;
    return this.http.delete<Hero>(url).pipe(catchError(this.handleError));
  }

  private post(hero: Hero) {
    let obs = this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(
        map(data => data),
        catchError(this.handleError),
        share());

    obs.subscribe(hero => {
      this.updateData(hero)
    })
    return obs;
  }

  private put(hero: Hero) {
    const url = `${this.heroesUrl}/${hero.id}`;
    let obs = this.http
      .put<Hero>(url, hero)
      .pipe(
        map(data => data),
        catchError(this.handleError),
        share());

    obs.subscribe(hero => {
      this.updateData(hero)
    })
    return obs;
  }

  private updateData(hero: Hero) {
    let index = this._heroes.items.findIndex(item => item.id === hero.id);
    if (this._heroes.items[index]) {
      this._heroes.items[index] = hero;
    } else {
      this._heroes.items.push(hero);
    };
    this.subject.next(this._heroes);
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}

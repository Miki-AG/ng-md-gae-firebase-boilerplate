import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Hero } from '../components/hero';

class HeroData {
  items: Hero[];
}

@Injectable()
export class HeroService {

  private _data = new BehaviorSubject<HeroData>(null);
  public readonly data: Observable<HeroData> = this._data.asObservable();

  // http://localhost:8081/_ah/api/heroes_api/v1/heroes
  // private heroesUrl = 'app/heroes'; // URL to web api
  private heroesUrl = '_ah/api/heroes_api/v1/heroes';

  constructor(private http: HttpClient) {
  }

  getHeroes() {
    return this.http
      .get<HeroData>(this.heroesUrl)
      .pipe(map(data => {
        let currentList = this._data.getValue();
        this._data.next(data);
        return data.items
      }), catchError(this.handleError));
  }

  getHero(id: string): Observable<Hero> {
    return this.getHeroes().pipe(
      map(heroes => heroes.find(hero => hero.id === id))
    );
  }

  save(hero: Hero) {
    console.log('HeroService.save (2)')
    if (!hero.name) {
      return new Observable(subscriber => {
        subscriber.error('You have to provide a name!');
      })
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
    console.log('HeroService.post (3)')
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    let obs = this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(catchError(this.handleError));

    obs.subscribe(hero => {
      this.updateData(hero)
    })
    return obs;
  }

  private put(hero: Hero) {
    console.log('HeroService.put (3)')
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    const url = `${this.heroesUrl}/${hero.id}`;
    let obs = this.http
      .put<Hero>(url, hero)
      .pipe(catchError(this.handleError));

    obs.subscribe(hero => {
      this.updateData(hero)
    })
    return obs;
  }

  private updateData(hero: Hero) {
    let list = this._data.getValue();
    let index = list.items.findIndex(item => item.id === hero.id);
    if (list.items[index]) {
      list.items[index] = hero;
    } else {
      list.items.push(hero);
    };
    this._data.next(list);
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}

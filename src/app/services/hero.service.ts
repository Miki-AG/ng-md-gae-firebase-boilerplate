import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject, throwError as observableThrowError } from 'rxjs';
import { catchError, map, share } from 'rxjs/operators';

import { Hero } from '../components/hero';
import { HeroData } from '../components/hero';



@Injectable()
export class HeroService {
  // https://stackoverflow.com/questions/35219713/how-to-create-an-observable-from-static-data-similar-to-http-one-in-angular
  // https://medium.com/@OlegVaraksin/set-up-a-http-service-for-backendless-development-in-angular-2-83172970949b

  // private  = new BehaviorSubject<HeroData>(null);
  // public readonly data: Observable<HeroData> = this._heroes.asObservable();

  subject: BehaviorSubject<HeroData> = new BehaviorSubject<HeroData>(null);


  _castHeroes: Observable<any> = this.subject.asObservable();
  _heroes: HeroData = { items: [] };

  // http://localhost:8081/_ah/api/heroes_api/v1/heroes
  // private heroesUrl = 'app/heroes'; // URL to web api
  private rootUrl = '_ah/api/heroes_api/v1';
  private heroesUrl = `${this.rootUrl}/heroes`;
  private heroUrl = `${this.rootUrl}/hero`;

  private test: HeroData = {
    items: [
      { id: '1111', name: 'sadasd' },
      { id: '2222', name: 'sadasd' },
      { id: '3333', name: 'sadasd' },
      { id: '4444', name: 'sadasd' },
    ]
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.fetchHeroes();
  }

  fetchHeroes() {
    return this.http
      .get<HeroData>(this.heroesUrl)
      .pipe(
        map(data => {
          this._heroes = data || { items: [] };
          this.subject.next(this._heroes);
          return this._heroes.items || [];
        }),
        catchError(this.handleError),
        share());
  }

  getHero(id: string): Observable<Hero> {
    return this._castHeroes.pipe(
      map(heroes => heroes.items.find(hero => hero.id === id))
    );
  }

  save(hero: Hero) {
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
    const url = this.heroUrl + '/' + hero.id;
    return this.http.delete<Hero>(url).pipe(catchError(this.handleError));
  }

  private post(hero: Hero) {
    console.log('HeroService.post (2)')

    return this.http
      .post<Hero>(this.heroesUrl, hero)
      .pipe(
        map(data => {
          this.updateHeroInList(data);
          console.log(data)
          return data;
        }),
        catchError(this.handleError),
        share());
  }

  private put(hero: Hero) {
    console.log('HeroService.put (2)')

    const url = this.heroUrl + '/' + hero.id;
    let obs = this.http
      .put<Hero>(url, hero)
      .pipe(
        map(data => {
          this.updateHeroInList(data);
          return data;
        }),
        catchError(this.handleError),
        share());
    return obs;
  }

  private updateHeroInList(hero: Hero) {
    let index = this._heroes.items.findIndex(item => item.id === hero.id);
    if (this._heroes.items[index]) {
      console.log('HeroService.save (3 update)')
      this._heroes.items[index] = hero;
    } else {
      console.log('HeroService.save (3) create')
      this._heroes.items.push(hero);
    };
    this.subject.next(this._heroes);
  }

  private handleError(res: HttpErrorResponse | any) {
    return observableThrowError(res.error || res.body.error || 'Server error');
  }
}

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { HeroData } from '../components/types';

const mask = 10000000000000000;

@Injectable()
export class DevBackendInterceptor implements HttpInterceptor {

    private heroData: HeroData = {
        items: [
            { id: mask.toString(), name: 'Hero one' },
            { id: (mask + 1).toString(), name: 'Hero two' },
            { id: (mask + 2).toString(), name: 'Hero three' },
            { id: (mask + 3).toString(), name: 'Hero four' },
        ]
    };

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const heroesUrl = '_ah/api/heroes_api/v1/heroes';
        const heroUrlRe = /_ah\/api\/heroes_api\/v1\/hero\/\d+/;

        return of(null).pipe(mergeMap(() => {
            if (request.url.endsWith(heroesUrl) && request.method === 'GET') {
                return of(new HttpResponse({ status: 200, body: this.heroData }));
            }
            if (request.url.endsWith(heroesUrl) && request.method === 'POST') {
                let newHero = request.body;
                newHero.id = (mask + (Math.random() * mask)).toString();
                this.heroData.items.push(newHero);
                return of(new HttpResponse({ status: 200, body: newHero }));
            }
            if (request.url.match(heroUrlRe) && request.method === 'PUT') {
                let tokens = request.url.split('/');
                let id = tokens[tokens.length - 1];
                let updatedHero = request.body;
                this.heroData.items.forEach(hero => {
                    if (hero.id === id) {
                        hero = updatedHero;
                    }
                })
                return of(new HttpResponse({ status: 200, body: updatedHero }));
            }
            if (request.url.match(heroUrlRe) && request.method === 'DELETE') {
                let tokens = request.url.split('/');
                let id = tokens[tokens.length - 1];
                this.heroData.items.forEach((hero, index) => {
                    if (hero.id === id) {
                        this.heroData.items.splice(index, 1);
                    }
                })
                return of(new HttpResponse({ status: 200 }));
            }
            return next.handle(request);
        }));
    }
}

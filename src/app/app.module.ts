import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from "@angular/flex-layout";
import { NgModule } from '@angular/core';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule, InMemoryDbService } from 'angular-in-memory-web-api';

import { AppComponent } from './components/app/app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DialogAddHero } from './components/dialog-add-hero/dialog-add-hero.component';
import { DialogAuth } from './components/dialog-auth/dialog-auth.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { AutosaveComponent } from './components/autosave/autosave.component';
import { DevBackendInterceptor } from './services/hero-dev-backend';
import { AuthInterceptor } from './services/auth.service';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { HeroService } from './services/hero.service';
import { AuthService } from './services/auth.service';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppConsts } from './components/consts'

let apiInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: DevBackendInterceptor,
    multi: true
};
let authInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};
@NgModule({
    imports: [
        BrowserModule,
        FlexLayoutModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroSearchComponent,
        HeroesComponent,
        AutosaveComponent,
        HeroDetailComponent,
        SideNavComponent,
        DialogAddHero,
        DialogAuth
    ],
    providers: [
        HeroService,
        AuthService,
        AppConsts,
        // use dev backend in place of Http service for development
        // use auth interceptor in prod for server side auth
        environment.gae ? authInterceptor : apiInterceptor
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
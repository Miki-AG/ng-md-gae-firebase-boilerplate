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
import { HeroService } from './services/hero.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeroesComponent } from './components/heroes/heroes.component';
import { HeroesTableComponent } from './components/heroes-table/heroes-table.component';
import { HeroDetailComponent } from './components/hero-detail/hero-detail.component';
import { HeroSearchComponent } from './components/hero-search/hero-search.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { DialogAddHero } from './components/dialog-add-hero/dialog-add-hero.component';

@NgModule({
    imports: [
        BrowserModule,
        FlexLayoutModule,
        MaterialModule,
        BrowserAnimationsModule,
        FormsModule,
        AppRoutingModule,
        HttpClientModule
    ],
    declarations: [
        AppComponent,
        DashboardComponent,
        HeroSearchComponent,
        HeroesComponent,
        HeroesTableComponent,
        HeroDetailComponent,
        SideNavComponent,
        DialogAddHero
    ],
    providers: [HeroService],
    bootstrap: [AppComponent]
})
export class AppModule { }
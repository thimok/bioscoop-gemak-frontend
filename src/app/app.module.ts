//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MoviesComponent} from './movies/movies.component';
import {TheatersComponent} from './theaters/theaters.component';
import {ScreeningsComponent} from './screenings/screenings.component';
import {MovieService} from "./movies/movie.service";
import {TheaterService} from "./theaters/theater.service";
import {ScreeningService} from "./screenings/screening.service";
import {DataStorageService} from "./shared/data-storage.service";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {AppRoutingModule} from "./app-routing.module";
import {MovieStartComponent} from './movies/movie-start/movie-start.component';
import {MovieListComponent} from './movies/movie-list/movie-list.component';
import {MovieDetailComponent} from './movies/movie-detail/movie-detail.component';
import {MovieEditComponent} from './movies/movie-edit/movie-edit.component';
import {ScreeningStartComponent} from './screenings/screening-start/screening-start.component';
import {ScreeningDetailComponent} from './screenings/screening-detail/screening-detail.component';
import {ScreeningEditComponent} from './screenings/screening-edit/screening-edit.component';
import {ScreeningListComponent} from './screenings/screening-list/screening-list.component';
import {TheaterStartComponent} from './theaters/theater-start/theater-start.component';
import {TheaterDetailComponent} from './theaters/theater-detail/theater-detail.component';
import {TheaterEditComponent} from './theaters/theater-edit/theater-edit.component';
import {TheaterListComponent} from './theaters/theater-list/theater-list.component';
import {MovieItemComponent} from './movies/movie-list/movie-item/movie-item.component';
import {ScreeningItemComponent} from './screenings/screening-list/screening-item/screening-item.component';
import {TheaterItemComponent} from './theaters/theater-list/theater-item/theater-item.component';
import {ScrollToModule} from "@nicky-lenaers/ngx-scroll-to";
import {ScreeningColorDirective} from "./shared/directives/screening-color.directive";

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		MoviesComponent,
		TheatersComponent,
		ScreeningsComponent,
		MovieStartComponent,
		MovieListComponent,
		MovieDetailComponent,
		MovieEditComponent,
		ScreeningStartComponent,
		ScreeningDetailComponent,
		ScreeningEditComponent,
		ScreeningListComponent,
		TheaterStartComponent,
		TheaterDetailComponent,
		TheaterEditComponent,
		TheaterListComponent,
		MovieItemComponent,
		ScreeningItemComponent,
		TheaterItemComponent,
		ScreeningColorDirective
	],
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		HttpModule,
		AppRoutingModule,
		ScrollToModule.forRoot()
	],
	providers: [
		MovieService,
		TheaterService,
		ScreeningService,
		DataStorageService
	],
	bootstrap: [AppComponent]
})
export class AppModule {
}

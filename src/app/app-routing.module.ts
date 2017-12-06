import {RouterModule, Routes} from "@angular/router";
import {NgModule} from "@angular/core";
import {MoviesComponent} from "./movies/movies.component";
import {TheatersComponent} from "./theaters/theaters.component";
import {ScreeningsComponent} from "./screenings/screenings.component";
import {MovieStartComponent} from "./movies/movie-start/movie-start.component";
import {MovieEditComponent} from "./movies/movie-edit/movie-edit.component";
import {MovieDetailComponent} from "./movies/movie-detail/movie-detail.component";
import {ScreeningStartComponent} from "./screenings/screening-start/screening-start.component";
import {ScreeningEditComponent} from "./screenings/screening-edit/screening-edit.component";
import {ScreeningDetailComponent} from "./screenings/screening-detail/screening-detail.component";
import {TheaterStartComponent} from "./theaters/theater-start/theater-start.component";
import {TheaterEditComponent} from "./theaters/theater-edit/theater-edit.component";
import {TheaterDetailComponent} from "./theaters/theater-detail/theater-detail.component";

const appRoutes: Routes = [
	{
		path: '',
		redirectTo: '/screenings',
		pathMatch: 'full'
	},
	{
		path: 'movies',
		component: MoviesComponent,
		children: [
			{
				path: '',
				component: MovieStartComponent
			},
			{
				path: 'new',
				component: MovieEditComponent
			},
			{
				path: ':id',
				component: MovieDetailComponent
			},
			{
				path: ':id/edit',
				component: MovieEditComponent
			}
		]
	},
	{
		path: 'theaters',
		component: TheatersComponent,
		children: [
			{
				path: '',
				component: TheaterStartComponent
			},
			{
				path: 'new',
				component: TheaterEditComponent
			},
			{
				path: ':id',
				component: TheaterDetailComponent
			},
			{
				path: ':id/edit',
				component: TheaterEditComponent
			}
		]
	},
	{
		path: 'screenings',
		component: ScreeningsComponent,
		children: [
			{
				path: '',
				component: ScreeningStartComponent
			},
			{
				path: 'new',
				component: ScreeningEditComponent
			},
			{
				path: ':id',
				component: ScreeningDetailComponent
			},
			{
				path: ':id/edit',
				component: ScreeningEditComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(appRoutes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
	
}
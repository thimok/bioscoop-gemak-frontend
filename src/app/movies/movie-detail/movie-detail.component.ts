//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {Component, OnInit} from '@angular/core';
import {Movie} from "../movie.model";
import {MovieService} from "../movie.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {Screening} from "../../screenings/screening.model";
import {TheaterService} from "../../theaters/theater.service";


import {Subscription} from "rxjs/Subscription";

@Component({
	selector: 'app-movie-detail',
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
	private movie: Movie = new Movie('Default Placeholder', 'Default placeholder',
		'1900-01-01', 'Default', 'http://via.placeholder.com/350x150', []);
	private id: string;
	private subscription: Subscription;
	
	constructor(private movieService: MovieService,
	            private route: ActivatedRoute,
	            private router: Router,
	            private storageService: DataStorageService,
	            private theaterService: TheaterService) {
	}
	
	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.storageService.getMovies();
					this.storageService.getTheaters();
					this.id = params['id'];
					
					this.movieService.moviesChanged
						.subscribe((movies: Movie[]) => {
							this.movie = this.movieService.getMovie(this.id);
						});
				}
			);
	}
	
	getMovie() {
		return this.movie;
	}
	
	getScreenings() {
		if (this.movie.name == 'Default Placeholder') {
			return [
				new Screening('1990-01-01', '12:00', '14:00', '111', '222')
			];
		}
		
		return this.movie.screenings;
	}
	
	getTheaterOfScreening(id: string) {
		var theater = this.theaterService.getTheater(id);
		
		return theater;
	}
	
	onEditMovie() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}
	
	onDeleteMovie() {
		this.storageService.deleteMovie(this.id);
		this.router.navigate(['/movies']);
	}
}

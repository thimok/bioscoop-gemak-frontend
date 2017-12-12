import {Component, OnInit} from '@angular/core';
import {Movie} from "../movie.model";
import {MovieService} from "../movie.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {Theater} from "../../theaters/theater.model";
import {TheaterService} from "../../theaters/theater.service";

@Component({
	selector: 'app-movie-detail',
	templateUrl: './movie-detail.component.html',
	styleUrls: ['./movie-detail.component.css']
})
export class MovieDetailComponent implements OnInit {
	private movie: Movie;
	private id: string;
	
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
					this.id = params['id'];
					this.movie = this.movieService.getMovie(this.id);
				}
			);
		
		this.storageService.getTheaters();
	}
	
	getMovie() {
		return this.movie;
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

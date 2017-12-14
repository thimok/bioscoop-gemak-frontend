//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {Component, OnInit} from '@angular/core';
import {Theater} from "../theater.model";
import {TheaterService} from "../theater.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {MovieService} from "../../movies/movie.service";

@Component({
	selector: 'app-theater-detail',
	templateUrl: './theater-detail.component.html',
	styleUrls: ['./theater-detail.component.css']
})
export class TheaterDetailComponent implements OnInit {
	private theater: Theater;
	private id: string;
	
	constructor(private theaterService: TheaterService,
	            private route: ActivatedRoute,
	            private router: Router,
	            private storageService: DataStorageService,
	            private movieService: MovieService) {
	}
	
	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					// this.id = params['id'];
					// this.theater = this.theaterService.getTheater(this.id);
					
					this.storageService.getMovies();
					this.storageService.getTheaters();
					this.id = params['id'];
					
					this.theaterService.theatersChanged
						.subscribe((theaters: Theater[]) => {
							this.theater = this.theaterService.getTheater(this.id);
						});
				}
			);
		
		this.storageService.getMovies();
	}
	
	getTheater() {
		return this.theater;
	}
	
	getMovieOfScreening(id: string) {
		var movie = this.movieService.getMovie(id);
		
		return movie;
	}
	
	onEditTheater() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}
	
	onDeleteTheater() {
		this.storageService.deleteTheater(this.id);
		this.router.navigate(['/theaters']);
	}
}

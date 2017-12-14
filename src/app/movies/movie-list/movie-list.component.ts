//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from "../movie.model";
import {Subscription} from "rxjs/Subscription";
import {MovieService} from "../movie.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
	selector: 'app-movie-list',
	templateUrl: './movie-list.component.html',
	styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
	private movies: Movie[];
	private subscription: Subscription;
	
	constructor(private movieService: MovieService,
	            private router: Router,
	            private route: ActivatedRoute,
	            private dataStorageService: DataStorageService) {
	}
	
	ngOnInit() {
		this.subscription = this.movieService.moviesChanged
			.subscribe(
				(movies: Movie[]) => {
					this.movies = movies;
				}
			);
		
		this.dataStorageService.getMovies();
	}
	
	getMovies() {
		return this.movies;
	}
	
	onNewMovie() {
		this.router.navigate(['new'], {relativeTo: this.route});
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

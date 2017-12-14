//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";
import {Http} from "@angular/http";
import {MovieService} from "../movies/movie.service";
import {TheaterService} from "../theaters/theater.service";
import {ScreeningService} from "../screenings/screening.service";
import 'rxjs/add/operator/map'
import {Movie} from "../movies/movie.model";
import {Theater} from "../theaters/theater.model";
import {Screening} from "../screenings/screening.model";

@Injectable()
export class DataStorageService {
	
	private headers = new Headers({'Content-Type': 'application/json'});
	private movieServerUrl = environment.serverUrl + '/movies/';
	private theaterServerUrl = environment.serverUrl + '/theaters/';
	private screeningServerUrl = environment.serverUrl + '/screenings/';
	
	constructor(private http: Http,
	            private movieService: MovieService,
	            private theaterService: TheaterService,
	            private screeningService: ScreeningService) {
	}
	
	//////////////////
	// GET requests //
	//////////////////
	
	getMovies() {
		this.http.get(this.movieServerUrl)
			.map(
				(response) => {
					const movies: Movie[] = response.json();
					
					return movies;
				}
			)
			.subscribe(
				(movies: Movie[]) => {
					this.movieService.setMovies(movies);
				}
			);
	}
	
	getMovieById(id: string) {
		this.http.get(this.movieServerUrl + '/' + id)
			.map(
				(response) => {
					const movie: Movie = response.json();
					
					return movie;
				}
			)
			.subscribe(
				(movie: Movie) => {
					this.movieService.movieChanged.next(movie);
				}
			)
	}
	
	getTheaters() {
		this.http.get(this.theaterServerUrl)
			.map(
				(response) => {
					const theaters: Theater[] = response.json();
					
					return theaters;
				}
			)
			.subscribe(
				(theaters: Theater[]) => {
					this.theaterService.setTheaters(theaters);
				}
			);
	}
	
	getScreenings() {
		this.http.get(this.screeningServerUrl)
			.map(
				(response) => {
					const screenings: Screening[] = response.json();
					
					return screenings;
				}
			)
			.subscribe(
				(screenings: Screening[]) => {
					this.screeningService.setScreenings(screenings);
				}
			);
	}
	
	///////////////////
	// POST requests //
	///////////////////
	
	addMovie(movie: Movie) {
		this.http.post(this.movieServerUrl, movie)
			.map(
				(response) => {
					return response.json();
				}
			)
			.subscribe(
				(movie: Movie) => {
					this.movieService.addMovie(movie);
				}
			);
	}
	
	addTheater(theater: Theater) {
		this.http.post(this.theaterServerUrl, theater)
			.map(
				(response) => {
					return response.json();
				}
			)
			.subscribe(
				(theater: Theater) => {
					this.theaterService.addTheater(theater);
				}
			);
	}
	
	addScreening(screening: Screening) {
		this.http.post(this.screeningServerUrl, screening)
			.map(
				(response) => {
					return response.json();
				}
			)
			.subscribe(
				(screening: Screening) => {
					this.screeningService.addScreening(screening);
				}
			);
	}
	
	//////////////////
	// PUT requests //
	//////////////////
	
	updateMovie(movie: Movie) {
		this.http.put(this.movieServerUrl + movie._id, movie)
			.map(
				(response) => {
					return response.json();
				}
			)
			.subscribe(
				(movie: Movie) => {
					this.movieService.updateMovie(movie);
				}
			);
	}
	
	updateTheater(theater: Theater) {
		this.http.put(this.theaterServerUrl + theater._id, theater)
			.map(
				(response) => {
					return response.json();
				}
			)
			.subscribe(
				(theater: Theater) => {
					this.theaterService.updateTheater(theater);
				}
			);
	}
	
	updateScreening(screening: Screening) {
		this.http.put(this.screeningServerUrl + screening._id, screening)
			.map(
				(response) => {
					return response.json();
				}
			)
			.subscribe(
				(screening: Screening) => {
					this.screeningService.updateScreening(screening);
				}
			);
	}
	
	/////////////////////
	// DELETE requests //
	/////////////////////
	
	deleteMovie(id: string) {
		this.http.delete(this.movieServerUrl + id)
			.map(
				(response) => {
					return response.json();
				}
			)
			.subscribe(
				(movie: Movie) => {
					this.movieService.deleteMovie(movie._id);
				}
			);
	}
	
	deleteTheater(id: string) {
		this.http.delete(this.theaterServerUrl + id)
			.map(
				(response) => {
					return response.json();
				}
			)
			.subscribe(
				(theater: Theater) => {
					this.theaterService.deleteTheater(theater._id);
				}
			);
	}
	
	deleteScreening(id: string) {
		this.http.delete(this.screeningServerUrl + id)
			.map(
				(response) => {
					return response.json();
				}
			)
			.subscribe(
				(screening: Screening) => {
					this.screeningService.deleteScreening(screening._id);
				}
			);
	}
}

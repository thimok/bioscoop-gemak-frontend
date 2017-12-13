import {Injectable} from "@angular/core";
import {Movie} from "./movie.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MovieService {
	
	moviesChanged = new Subject<Movie[]>();
	movieChanged = new Subject<Movie>();
	private movies: Movie[] = [];
	
	getMovies() {
		return this.movies.slice();
	}
	
	getMovie(id: string) {
		const index = this.movies.findIndex(x => x._id == id);
		return this.movies[index];
	}
	
	setMovies(movies: Movie[]) {
		this.movies = movies;
		this.moviesChanged.next(this.movies.slice());
	}
	
	addMovie(movie: Movie) {
		this.movies.push(movie);
		this.moviesChanged.next(this.movies.slice());
	}
	
	updateMovie(movie: Movie) {
		const index = this.movies.findIndex(x => x._id == movie._id);
		this.movies[index] = movie;
		this.moviesChanged.next(this.movies.slice());
	}
	
	deleteMovie(id: string) {
		const index = this.movies.findIndex(x => x._id == id);
		this.movies.splice(index, 1);
		this.moviesChanged.next(this.movies.slice());
	}
}
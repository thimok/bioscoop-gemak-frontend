import {Injectable} from "@angular/core";
import {Movie} from "./movie.model";
import {Subject} from "rxjs/Subject";

@Injectable()
export class MovieService {
	
	moviesChanged = new Subject<Movie[]>();
	private movies: Movie[] = [
		new Movie(
			'De Enge Informatici',
			'2017-12-01',
			'horror',
			'0987'
		),
		new Movie(
			'De Bug',
			'2017-12-03',
			'horror',
			'0098'
		)
	];
	
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
import {Component, OnInit} from '@angular/core';
import {TheaterService} from "../theaters/theater.service";
import {MovieService} from "../movies/movie.service";
import {DataStorageService} from "../shared/data-storage.service";

@Component({
	selector: 'app-screenings',
	templateUrl: './screenings.component.html',
	styleUrls: ['./screenings.component.css']
})
export class ScreeningsComponent implements OnInit {
	
	constructor(private theaterService: TheaterService,
	            private movieService: MovieService,
	            private storageService: DataStorageService) {
	}
	
	ngOnInit() {
		this.storageService.getMovies();
		this.storageService.getTheaters();
	}
	
}

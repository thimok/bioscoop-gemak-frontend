import {Component, OnInit} from '@angular/core';
import {Screening} from "../screening.model";
import {ScreeningService} from "../screening.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {MovieService} from "../../movies/movie.service";
import {TheaterService} from "../../theaters/theater.service";
import {Movie} from "../../movies/movie.model";
import {Theater} from "../../theaters/theater.model";

@Component({
	selector: 'app-screening-detail',
	templateUrl: './screening-detail.component.html',
	styleUrls: ['./screening-detail.component.css']
})
export class ScreeningDetailComponent implements OnInit {
	
	private screening: Screening;
	private id: string;
	
	constructor(private screeningService: ScreeningService,
	            private movieService: MovieService,
	            private theaterService: TheaterService,
	            private route: ActivatedRoute,
	            private router: Router,
	            private storageService: DataStorageService) {
	}
	
	ngOnInit() {
		this.storageService.getMovies();
		this.storageService.getTheaters();
		
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];
					this.screening = this.screeningService.getScreening(this.id);
				}
			);
	}
	
	getScreening() {
		return this.screening;
	}
	
	getScheduledMovie(): Movie {
		return this.movieService.getMovie(this.screening.movieId);
	}
	
	getScheduledTheater(): Theater {
		return this.theaterService.getTheater(this.screening.theaterId);
	}
	
	onEditScreening() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}
	
	onDeleteScreening() {
		this.storageService.deleteScreening(this.id);
		this.router.navigate(['/screenings']);
	}
}

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ScreeningService} from "../screening.service";
import {DataStorageService} from "../../shared/data-storage.service";
import {Movie} from "../../movies/movie.model";
import {MovieService} from "../../movies/movie.service";
import {Theater} from "../../theaters/theater.model";
import {TheaterService} from "../../theaters/theater.service";
import {Screening} from "../screening.model";

@Component({
	selector: 'app-screening-edit',
	templateUrl: './screening-edit.component.html',
	styleUrls: ['./screening-edit.component.css']
})
export class ScreeningEditComponent implements OnInit {
	
	private id: string;
	private editMode = false;
	private screeningForm: FormGroup;
	private movies: Movie[];
	private theaters: Theater[];
	private screening: Screening;
	
	private newMovieId: string;
	private newTheaterId: string;
	
	constructor(private route: ActivatedRoute,
	            private screeningService: ScreeningService,
	            private router: Router,
	            private dataStorageService: DataStorageService,
	            private movieService: MovieService,
	            private theaterService: TheaterService) {
	}
	
	ngOnInit() {
		// this.route.params
		// 	.subscribe(
		// 		(params: Params) => {
		// 			this.id = params['id'];
		// 			this.editMode = params['id'] != null;
		// 			this.initForm();
		// 		}
		// 	);
		//
		// this.dataStorageService.getMovies();
		// this.movies = this.movieService.getMovies();
		// this.theaters = this.theaterService.getTheaters();
		
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];
					this.screening = this.screeningService.getScreening(this.id);
					
					this.dataStorageService.getMovies();
					this.dataStorageService.getTheaters();
					this.dataStorageService.getScreenings();
					
					this.editMode = params['id'] != null;
					
					this.screeningService.screeningsChanged
						.subscribe((screenings: Screening[]) => {
							this.screening = this.screeningService.getScreening(this.id);
							this.initForm();
						});
					
					this.movieService.moviesChanged
						.subscribe((movies: Movie[]) => {
							this.movies = movies;
							this.initForm();
						});
					
					this.theaterService.theatersChanged
						.subscribe((theaters: Theater[]) => {
							this.theaters = theaters;
							this.initForm();
						});
					
					this.initForm();
				}
			)
	}
	
	getId() {
		return this.id;
	}
	
	getEditMode() {
		return this.editMode;
	}
	
	getMovies() {
		return this.movies;
	}
	
	isEqualMovie(id: string) {
		return this.newMovieId == id;
	}
	
	getTheaters() {
		return this.theaters;
	}
	
	isEqualTheater(id: string) {
		return this.newTheaterId == id;
	}
	
	getScreeningForm() {
		return this.screeningForm;
	}
	
	onSubmit() {
		if (this.newMovieId) {
			this.screeningForm.value.movieId = this.newMovieId;
		}
		
		if (this.newTheaterId) {
			this.screeningForm.value.theaterId = this.newTheaterId;
		}
		console.log(this.screeningForm.value);
		if (this.editMode) {
			this.dataStorageService.updateScreening(this.screeningForm.value);
		} else {
			this.dataStorageService.addScreening(this.screeningForm.value);
		}
		
		this.onCancel();
	}
	
	onCancel() {
		this.router.navigate(['screenings']);
	}
	
	onChangeMovie(eventData) {
		this.newMovieId = eventData.srcElement.selectedOptions[0].attributes[1].nodeValue;
	}
	
	onChangeTheater(eventData) {
		this.newTheaterId = eventData.srcElement.selectedOptions[0].attributes[1].nodeValue;
	}
	
	private initForm() {
		let screeningId = '';
		let screeningDate = '';
		let screeningStartTime = '';
		let screeningEndTime = '';
		let screeningMovieId = '';
		let screeningTheaterId = '';
		
		if (this.editMode) {
			const screening = this.screeningService.getScreening(this.id);
			screeningId = screening._id;
			screeningDate = screening.date;
			screeningStartTime = screening.starttime;
			screeningEndTime = screening.endtime;
			screeningMovieId = screening.movieId;
			screeningTheaterId = screening.theaterId;
			
			this.newMovieId = screening.movieId;
			this.newTheaterId = screening.theaterId;
		} else {
			if (this.movieService.getMovies().length > 0) {
				this.newMovieId = this.movieService.getMovies()[0]._id;
			}
			
			if (this.theaterService.getTheaters().length > 0) {
				this.newTheaterId = this.theaterService.getTheaters()[0]._id;
			}
		}
		
		this.screeningForm = new FormGroup({
			'_id': new FormControl(screeningId),
			'date': new FormControl(screeningDate),
			'starttime': new FormControl(screeningStartTime),
			'endtime': new FormControl(screeningEndTime),
			'movieId': new FormControl(screeningMovieId),
			'theaterId': new FormControl(screeningTheaterId)
		});
	}
}

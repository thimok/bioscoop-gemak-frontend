import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MovieService} from "../movie.service";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
	selector: 'app-movie-edit',
	templateUrl: './movie-edit.component.html',
	styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {
	private id: string;
	private editMode = false;
	private movieForm: FormGroup;
	
	constructor(private route: ActivatedRoute,
	            private movieService: MovieService,
	            private router: Router,
	            private dataStorageService: DataStorageService) {
	}
	
	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];
					this.editMode = params['id'] != null;
					this.initForm();
				}
			);
	}
	
	getId() {
		return this.id;
	}
	
	getEditMode() {
		return this.editMode;
	}
	
	getMovieForm() {
		return this.movieForm;
	}
	
	onSubmit() {
		if (this.editMode) {
			this.dataStorageService.updateMovie(this.movieForm.value);
		} else {
			this.dataStorageService.addMovie(this.movieForm.value);
		}
		
		this.onCancel();
	}
	
	onCancel() {
		this.router.navigate(['movies']);
	}
	
	private initForm() {
		let movieId = '';
		let movieName = '';
		let movieDescription = '';
		let movieRelease = '';
		let movieGenre = '';
		let movieImageUrl = '';
		
		if (this.editMode) {
			const movie = this.movieService.getMovie(this.id);
			movieId = movie._id;
			movieName = movie.name;
			movieDescription = movie.description;
			movieRelease = movie.release;
			movieGenre = movie.genre;
			movieImageUrl = movie.imageUrl;
		}
		
		this.movieForm = new FormGroup({
			'_id': new FormControl(movieId),
			'name': new FormControl(movieName),
			'description': new FormControl(movieDescription),
			'release': new FormControl(movieRelease),
			'genre': new FormControl(movieGenre),
			'imageUrl': new FormControl(movieImageUrl)
		});
	}
}

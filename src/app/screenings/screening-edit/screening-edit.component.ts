import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {ScreeningService} from "../screening.service";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
	selector: 'app-screening-edit',
	templateUrl: './screening-edit.component.html',
	styleUrls: ['./screening-edit.component.css']
})
export class ScreeningEditComponent implements OnInit {
	
	id: string;
	editMode = false;
	screeningForm: FormGroup;
	
	constructor(private route: ActivatedRoute,
	            private screeningService: ScreeningService,
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
	
	onSubmit() {
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

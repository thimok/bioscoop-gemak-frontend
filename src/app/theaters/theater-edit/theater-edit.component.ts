//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TheaterService} from "../theater.service";
import {DataStorageService} from "../../shared/data-storage.service";
import {Theater} from "../theater.model";

@Component({
	selector: 'app-theater-edit',
	templateUrl: './theater-edit.component.html',
	styleUrls: ['./theater-edit.component.css']
})
export class TheaterEditComponent implements OnInit {
	private id: string;
	private editMode = false;
	private theaterForm: FormGroup;
	private theater: Theater;
	
	constructor(private route: ActivatedRoute,
	            private theaterService: TheaterService,
	            private router: Router,
	            private dataStorageService: DataStorageService) {
	}
	
	ngOnInit() {
		
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];
					this.theater = this.theaterService.getTheater(this.id);
					
					this.dataStorageService.getMovies();
					this.dataStorageService.getTheaters();
					//this.id = params['id'];
					this.editMode = params['id'] != null;
					
					this.theaterService.theatersChanged
						.subscribe((theaters: Theater[]) => {
							this.theater = this.theaterService.getTheater(this.id);
							this.initForm();
						});
					
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
	
	getTheaterForm() {
		return this.theaterForm;
	}
	
	onSubmit() {
		if (this.editMode) {
			this.dataStorageService.updateTheater(this.theaterForm.value);
		} else {
			this.dataStorageService.addTheater(this.theaterForm.value);
		}
		
		this.onCancel();
	}
	
	onCancel() {
		this.router.navigate(['theaters']);
	}
	
	private initForm() {
		let theaterId = '';
		let theaterName = '';
		let theaterCapacity = 0;
		
		if (this.editMode) {
			this.theater = this.theaterService.getTheater(this.id);
			theaterId = this.theater._id;
			theaterName = this.theater.name;
			theaterCapacity = this.theater.capacity;
		}
		
		this.theaterForm = new FormGroup({
			'_id': new FormControl(theaterId),
			'name': new FormControl(theaterName),
			'capacity': new FormControl(theaterCapacity)
		});
	}
}

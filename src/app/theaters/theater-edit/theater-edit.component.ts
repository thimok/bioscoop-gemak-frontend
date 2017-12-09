import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {TheaterService} from "../theater.service";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
	selector: 'app-theater-edit',
	templateUrl: './theater-edit.component.html',
	styleUrls: ['./theater-edit.component.css']
})
export class TheaterEditComponent implements OnInit {
	id: string;
	editMode = false;
	theaterForm: FormGroup;
	
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
					this.editMode = params['id'] != null;
					this.initForm();
				}
			);
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
			const theater = this.theaterService.getTheater(this.id);
			theaterId = theater._id;
			theaterName = theater.name;
			theaterCapacity = theater.capacity;
		}
		
		this.theaterForm = new FormGroup({
			'_id': new FormControl(theaterId),
			'name': new FormControl(theaterName),
			'capacity': new FormControl(theaterCapacity)
		});
	}
}

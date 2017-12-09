import {Component, OnInit} from '@angular/core';
import {Theater} from "../theater.model";
import {TheaterService} from "../theater.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
	selector: 'app-theater-detail',
	templateUrl: './theater-detail.component.html',
	styleUrls: ['./theater-detail.component.css']
})
export class TheaterDetailComponent implements OnInit {
	private theater: Theater;
	private id: string;
	
	constructor(private theaterService: TheaterService,
	            private route: ActivatedRoute,
	            private router: Router,
	            private storageService: DataStorageService) {
	}
	
	ngOnInit() {
		this.route.params
			.subscribe(
				(params: Params) => {
					this.id = params['id'];
					this.theater = this.theaterService.getTheater(this.id);
				}
			);
	}
	
	getTheater() {
		return this.theater;
	}
	
	onEditTheater() {
		this.router.navigate(['edit'], {relativeTo: this.route});
	}
	
	onDeleteTheater() {
		this.storageService.deleteTheater(this.id);
		this.router.navigate(['/theaters']);
	}
}

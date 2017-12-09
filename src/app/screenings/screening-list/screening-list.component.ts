import {Component, OnDestroy, OnInit} from '@angular/core';
import {Screening} from "../screening.model";
import {Subscription} from "rxjs/Subscription";
import {TheaterService} from "../../theaters/theater.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";
import {ScreeningService} from "../screening.service";

@Component({
	selector: 'app-screening-list',
	templateUrl: './screening-list.component.html',
	styleUrls: ['./screening-list.component.css']
})
export class ScreeningListComponent implements OnInit, OnDestroy {
	
	private screenings: Screening[];
	private subscription: Subscription;
	
	constructor(private screeningService: ScreeningService,
	            private router: Router,
	            private route: ActivatedRoute,
	            private dataStorageService: DataStorageService) {
	}
	
	ngOnInit() {
		this.subscription = this.screeningService.screeningsChanged
			.subscribe(
				(screenings: Screening[]) => {
					this.screenings = screenings;
				}
			);
		
		this.dataStorageService.getScreenings();
	}
	
	getScreenings() {
		return this.screenings;
	}
	
	onNewScreening() {
		this.router.navigate(['new'], {relativeTo: this.route});
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
	
}

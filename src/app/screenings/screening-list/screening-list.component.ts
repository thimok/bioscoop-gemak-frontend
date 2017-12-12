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
	private screeningsAll: Screening[];
	private subscription: Subscription;
	private filterStatus = 1; //1: all 0: future
	
	constructor(private screeningService: ScreeningService,
	            private router: Router,
	            private route: ActivatedRoute,
	            private dataStorageService: DataStorageService) {
	}
	
	ngOnInit() {
		this.subscription = this.screeningService.screeningsChanged
			.subscribe(
				(screenings: Screening[]) => {
					this.screeningsAll = screenings;
					this.screenings = [];
					
					var currentDate = new Date();
					
					for (let entry of screenings) {
						var entryDate = new Date(entry.date);
						
						if (currentDate <= entryDate) {
							this.screenings.push(entry);
						}
					}
				}
			);
		
		this.dataStorageService.getScreenings();
	}
	
	getScreenings() {
		if (this.filterStatus === 1) {
			return this.screeningsAll; //Return all screenings
		} else {
			return this.screenings; //Return only future screenings
		}
	}
	
	getAllScreenings() {
		return this.screeningsAll;
	}
	
	onNewScreening() {
		this.router.navigate(['new'], {relativeTo: this.route});
	}
	
	filterAll() {
		this.filterStatus = 1;
		this.screeningService.screeningsChanged.next(this.screeningsAll.slice());
	}
	
	filterFuture() {
		this.filterStatus = 0;
		this.screeningService.screeningsChanged.next(this.screeningsAll.slice());
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

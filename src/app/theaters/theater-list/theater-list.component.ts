import {Component, OnDestroy, OnInit} from '@angular/core';
import {Theater} from "../theater.model";
import {Subscription} from "rxjs/Subscription";
import {TheaterService} from "../theater.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DataStorageService} from "../../shared/data-storage.service";

@Component({
	selector: 'app-theater-list',
	templateUrl: './theater-list.component.html',
	styleUrls: ['./theater-list.component.css']
})
export class TheaterListComponent implements OnInit, OnDestroy {
	private theaters: Theater[];
	private subscription: Subscription;
	
	constructor(private theaterService: TheaterService,
	            private router: Router,
	            private route: ActivatedRoute,
	            private dataStorageService: DataStorageService) {
	}
	
	ngOnInit() {
		this.subscription = this.theaterService.theatersChanged
			.subscribe(
				(theaters: Theater[]) => {
					this.theaters = theaters;
				}
			);
		
		this.dataStorageService.getTheaters();
	}
	
	getTheaters() {
		return this.theaters;
	}
	
	onNewTheater() {
		this.router.navigate(['new'], {relativeTo: this.route});
	}
	
	ngOnDestroy() {
		this.subscription.unsubscribe();
	}
}

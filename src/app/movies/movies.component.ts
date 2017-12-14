//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
	selector: 'app-movies',
	templateUrl: './movies.component.html',
	styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
	
	constructor(private storageService: DataStorageService) {
	}
	
	ngOnInit() {
		this.storageService.getMovies();
		this.storageService.getTheaters();
		this.storageService.getScreenings();
	}
	
}

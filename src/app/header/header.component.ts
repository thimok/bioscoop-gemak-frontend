import {Component, OnInit} from '@angular/core';
import {DataStorageService} from "../shared/data-storage.service";

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	
	private collapsed: boolean = true;
	
	constructor(private dataStorageService: DataStorageService) {
	}
	
	onFetchData() {
		this.dataStorageService.getMovies();
		this.dataStorageService.getTheaters();
		this.dataStorageService.getScreenings();
	}
	
	toggleCollapsed() {
		this.collapsed = !this.collapsed;
		console.log(this.collapsed);
	}
	
	isCollapsed() {
		return this.collapsed;
	}
	
	ngOnInit() {
	}
	
}

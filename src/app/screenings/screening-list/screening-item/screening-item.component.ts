//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {Component, Input, OnInit} from '@angular/core';
import {Screening} from "../../screening.model";

@Component({
	selector: 'app-screening-item',
	templateUrl: './screening-item.component.html',
	styleUrls: ['./screening-item.component.css']
})
export class ScreeningItemComponent implements OnInit {
	@Input() screening: Screening;
	@Input() index: number;
	
	constructor() {
	}
	
	ngOnInit() {
	}
	
}

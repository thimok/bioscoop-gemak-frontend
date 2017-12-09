import {Component, Input, OnInit} from '@angular/core';
import {Theater} from "../../theater.model";

@Component({
	selector: 'app-theater-item',
	templateUrl: './theater-item.component.html',
	styleUrls: ['./theater-item.component.css']
})
export class TheaterItemComponent implements OnInit {
	@Input() theater: Theater;
	@Input() index: number;
	
	constructor() {
	}
	
	ngOnInit() {
	}
	
}

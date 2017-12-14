//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {Directive, ElementRef, Input, OnInit, Renderer2} from "@angular/core";
import {DatePipe} from "@angular/common";

@Directive({
	selector: '[appScreeningColor]'
})
export class ScreeningColorDirective implements OnInit {
	@Input() futureColor: string = 'green';
	@Input() pastColor: string = 'red';
	@Input() date: string = '2000-01-01';
	
	constructor(private element: ElementRef, private renderer: Renderer2) {
	}
	
	ngOnInit() {
		var currentDate = new Date();
		var oldDate = new Date(this.date);
		
		if (currentDate <= oldDate) {
			this.renderer.setStyle(this.element.nativeElement, 'color', this.futureColor);
		} else {
			this.renderer.setStyle(this.element.nativeElement, 'color', this.pastColor);
		}
	}
}
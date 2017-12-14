//////////////////////////
// Made by Thimo Koolen //
//////////////////////////

import {Screening} from "../screenings/screening.model";
export class Theater {
	
	public _id: string;
	public name: string;
	public capacity: number;
	public screenings: Screening[];
	
	constructor(name: string, capacity: number, screenings: Screening[], id?: string) {
		this._id = id || '';
		this.name = name;
		this.capacity = capacity;
		this.screenings = screenings;
	}
}
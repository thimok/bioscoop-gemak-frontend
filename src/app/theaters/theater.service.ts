import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Theater} from "./theater.model";

@Injectable()
export class TheaterService {
	
	theatersChanged = new Subject<Theater[]>();
	private theaters: Theater[] = [];
	
	getTheaters() {
		return this.theaters.slice();
	}
	
	getTheater(id: string) {
		const index = this.theaters.findIndex(x => x._id == id);
		return this.theaters[index];
	}
	
	setTheaters(theaters: Theater[]) {
		this.theaters = theaters;
		this.theatersChanged.next(this.theaters.slice());
	}
	
	addTheater(theater: Theater) {
		this.theaters.push(theater);
		this.theatersChanged.next(this.theaters.slice());
	}
	
	updateTheater(theater: Theater) {
		const index = this.theaters.findIndex(x => x._id == theater._id);
		this.theaters[index] == theater;
		this.theatersChanged.next(this.theaters.slice());
	}
	
	deleteTheater(id: string) {
		const index = this.theaters.findIndex(x => x._id == id);
		this.theaters.splice(index, 1);
		this.theatersChanged.next(this.theaters.slice());
	}
}
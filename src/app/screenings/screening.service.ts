import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Screening} from "./screening.model";

@Injectable()
export class ScreeningService {
	
	screeningsChanged = new Subject<Screening[]>();
	private screenings: Screening[] = [
		new Screening(
			'2017-12-05',
			'1200',
			'1400',
			'1234',
			'0987'
		),
		new Screening(
			'2017-12-05',
			'1230',
			'1430',
			'2234',
			'0987'
		),
		new Screening(
			'2017-12-05',
			'1430',
			'1630',
			'1234',
			'0098'
		)
	];
	
	getScreenings() {
		return this.screenings.slice();
	}
	
	getScreening(id: string) {
		const index = this.screenings.findIndex(x => x._id == id);
		return this.screenings[index];
	}
	
	setScreenings(screenings: Screening[]) {
		this.screenings = screenings;
		this.screeningsChanged.next(this.screenings.slice());
	}
	
	addScreening(screening: Screening) {
		this.screenings.push(screening);
		this.screeningsChanged.next(this.screenings.slice());
	}
	
	updateScreening(screening: Screening) {
		const index = this.screenings.findIndex(x => x._id == screening._id);
		this.screenings[index] = screening;
		this.screeningsChanged.next(this.screenings.slice());
	}
	
	deleteScreening(id: string) {
		const index = this.screenings.findIndex(x => x._id == id);
		this.screenings.splice(index, 1);
		this.screeningsChanged.next(this.screenings.slice());
	}
}
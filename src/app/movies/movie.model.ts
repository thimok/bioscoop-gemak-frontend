import {Screening} from "../screenings/screening.model";
export class Movie {
	public _id: string;
	public name: string;
	public description: string;
	public release: string;
	public genre: string;
	public imageUrl: string;
	public screenings: Screening[];
	
	constructor(name: string, description:string, release: string, genre: string, imageUrl: string, screenings: Screening[], id?: string) {
		this._id = id || '';
		this.name = name;
		this.description = description;
		this.release = release;
		this.genre = genre;
		this.imageUrl = imageUrl;
		this.screenings = screenings;
	}
}

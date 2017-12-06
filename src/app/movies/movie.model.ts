export class Movie {
	public _id: string;
	public name: string;
	public release: string;
	public genre: string;
	
	constructor(name: string, release: string, genre: string, id?: string) {
		this._id = id || '';
		this.name = name;
		this.release = release;
		this.genre = genre;
	}
}

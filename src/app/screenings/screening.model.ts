export class Screening {
	
	public _id: string;
	public date: string;
	public starttime: string;
	public endtime: string;
	public theaterId: string;
	public movieId: string;
	
	constructor(date: string, starttime: string, endtime: string, theaterId: string, movieId: string, id?: string) {
		this._id = id || '';
		this.date = date;
		this.starttime = starttime;
		this.endtime = endtime;
		this.theaterId = theaterId;
		this.movieId = movieId;
	}
}
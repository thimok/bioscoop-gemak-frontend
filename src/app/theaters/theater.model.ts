export class Theater {
	
	public _id: string;
	public name: string;
	public capacity:number;
	
	constructor(name: string, capacity:number, id?: string) {
		this._id = id || '';
		this.name = name;
		this.capacity = capacity;
	}
}
import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable()
export class DataStorageService {
  
  private headers = new Headers({'Content-Type': 'application/json'});
  private serverUrl = environment.serverUrl + '';
}

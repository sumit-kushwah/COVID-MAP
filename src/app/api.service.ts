import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

const baseurl = "https://corona-virus-world-and-india-data.p.rapidapi.com/"
const apikey1 = "687dbfe6b7msh0e5814a43c930b7p11d7cdjsn493dc356cfb6"
const apikey2 = "1b1a542b7emshf5971004d6dd15ap1e0fcfjsnead306a29451"

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  options1 = {
    headers: { "x-rapidapi-key" : apikey1 }
  }

  options2 = {
    headers: { "x-rapidapi-key" : apikey2 }
  }

  world_data = null;
  india_data = null;
  india_timeline_data = null;

  constructor(private http: HttpClient) { }

  worldData():Observable<any> {
    if (this.world_data) {
      return of(this.world_data);
    }
    return this.http.get(baseurl + "api", this.options1);
  }

  indiaTimeline():Observable<any> {
    if (this.india_timeline_data) {
      return of(this.india_timeline_data);
    }
    return this.http.get(baseurl + "api_india_timeline", this.options2);
  }

  indiaData():Observable<any> {
    if (this.india_data) {
      return of(this.india_data);
    }
    return this.http.get(baseurl + "api_india", this.options2);
  }

}

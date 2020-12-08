import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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


  constructor(private http: HttpClient) { }

  wordData() {
    return this.http.get(baseurl + "api", this.options1);
  }

  indiaTimeline() {
    return this.http.get(baseurl + "api_india_timeline", this.options2);
  }

  indiaData() {
    return this.http.get(baseurl + "api_india", this.options2);
  }

}

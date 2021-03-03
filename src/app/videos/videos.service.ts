import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable, of } from "rxjs";
import { map } from "rxjs/operators";

const baseUrl = "https://www.googleapis.com/youtube/v3/search";
const keys = [
  "AIzaSyBZ68m0ic1DPDuHGqvFX556vt28wlpmxBo",
  "AIzaSyB3Ef9f7qZ-gpMVFRxcz-t0ZVllsyayGkI",
]

@Injectable({
  providedIn: 'root',
})
export class VideosService {

  constructor(private http: HttpClient) {}

  querySet: string[] = ["covid", "coronavirus", "covid19"];

  index: number = 0;

  paramsDict: { [key: string]: any} = {
    "part": ["id"],
    "key" : keys[this.index],
    "type" : "video",
    "maxResults": 6,
    "q": this.querySet,
    "pageToken": "",
    "safeSearch": "none",
  };

  response : any = undefined;

  getVideosUrls(additionalQuerySet: {[key: string]: string} = {}): Observable<any> {
    if (additionalQuerySet["q"]) {
      this.paramsDict["q"] = additionalQuerySet["q"];
    }
    if (additionalQuerySet["pageToken"]) {
      this.paramsDict["pageToken"] = additionalQuerySet["pageToken"];
    }
    this.paramsDict["key"] = keys[this.index];
    if (!additionalQuerySet["refreshResult"] && this.response) {
      return of(this.response);
    } else {
      return this.http.get(baseUrl, {
        params: this.paramsDict,
      }).pipe(map((res: any) => {
        this.response = res;
        return res;
      }));
    }

  }

}

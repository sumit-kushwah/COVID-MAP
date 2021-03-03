import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { getVideoUrls } from './helper';
import { VideosService } from './videos.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideosComponent implements OnInit {

  constructor(
    private videosService: VideosService,
    private changeDetectorRef: ChangeDetectorRef) { }
  urls: string[] = [];
  rows: number[] = Array(2).fill(0).map((x,i)=>i);
  cols: number[] = Array(3).fill(0).map((x,i)=>i);

  ngOnInit(): void {
    this.additionalQuerySet = {};
    this.queryFire();
  }

  prevToken = "";
  nextToken = "";
  searchText: string = "";
  additionalQuerySet: {[key: string]: any} = {
    "prevToken": "",
    "refreshResult": true,
    "q": this.searchText,
  };
  onCustomSearch() {
    if (this.searchText != "") {
      this.additionalQuerySet["q"] = this.searchText;
      this.additionalQuerySet["refreshResult"] = true;
      this.queryFire();
    }
  }

  onDetectChanges() {
    this.changeDetectorRef.detectChanges();
  }

  onNext() {
    if (this.nextToken == "") return;
    this.additionalQuerySet["pageToken"] = this.nextToken;
    this.additionalQuerySet["refreshResult"] = true;
    this.queryFire();
  }

  onPrev() {
    if (this.prevToken == "") return;
    this.additionalQuerySet["pageToken"] = this.prevToken;
    this.additionalQuerySet["refreshResult"] = true;
    this.queryFire();
  }

  error: any = undefined;

  queryFire() {
    this.videosService.getVideosUrls(this.additionalQuerySet).subscribe((res) => {
      this.urls = getVideoUrls(res);
      this.error = undefined;
      if(res["nextPageToken"]) {
        this.nextToken = res["nextPageToken"];
      } else {
        this.prevToken = "";
      }
      if(res["prevPageToken"]) {
        this.prevToken = res["prevPageToken"];
      } else {
        this.prevToken = "";
      }
      this.onDetectChanges();
    }, error => {
      this.videosService.index++;
      this.error = error["error"]["error"]["errors"][0]["reason"];
      this.onDetectChanges();
    });
  }

  onRetry() {
    this.queryFire();
  }
}

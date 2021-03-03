import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.css']
})
export class VideoItemComponent implements OnInit {

  @Input()
  url: string = "";
  constructor() { }

  ngOnInit(): void {
    if (!this.url) {
      this.url = 'about:blank';
    }
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TweetsComponent implements OnInit {

  constructor(
    private spinner: NgxSpinnerService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    // this.spinner.show();
  }

  ngAfterViewInit(): void {
    (<any>window).twttr.widgets.load();
    this.spinner.hide();
    this.onDetectChanges();
  }

  onDetectChanges() {
    this.changeDetectorRef.detectChanges();
  }
}

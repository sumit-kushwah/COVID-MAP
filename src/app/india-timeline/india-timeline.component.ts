import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { tap } from 'rxjs/internal/operators/tap';
import { Subscription } from 'rxjs/internal/Subscription';
import { ApiService } from '../api.service';
import { plotter } from './helper';

@Component({
  selector: 'app-india-timeline',
  templateUrl: './india-timeline.component.html',
  styleUrls: ['./india-timeline.component.css']
})
export class IndiaTimelineComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private spinner: NgxSpinnerService) { }

  subscriptions: Subscription[] = [];

  chartRefDict:any = [];

  plotdata:{ date: string; value: number }[] = [];

  @ViewChild('timeline', { static: true })
  timeline!: ElementRef;

  ngOnInit(): void {
    this.spinner.show();
    this.subscriptions.push(this.apiService.indiaTimeline().pipe(
      tap((data) => { this.apiService.india_timeline_data = data; }),
      tap(() => this.setPlotForKey('dailyconfirmed')),
      tap(() => this.spinner.hide()),
    ).subscribe(() => {}, error => console.log(error)));
  }

  setPlotForKey(key: string) {
    this.spinner.show();
    let list:any = this.apiService.india_timeline_data;
    // data for chart
    this.plotdata = [];
    list.forEach((item: any) => {
      this.plotdata.push({
        date: item.dateymd,
        value: item[key]
      })
    })
    this.chartDestroy();
    this.chartRefDict.push(plotter(this.timeline.nativeElement, this.plotdata));
    this.spinner.hide();
  }

  onSelect(event: any) {
    let key = event.target.value;
    console.log(key);
    this.setPlotForKey(key);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.chartDestroy();
  }

  chartDestroy() {
    this.chartRefDict.forEach((chart:any) => { if (chart) { chart.dispose(); } });
    this.chartRefDict = [];
  }
}

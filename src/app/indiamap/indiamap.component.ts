import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs/internal/Subscription';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { mapPlotter, barPlotter } from './helper';

@Component({
  selector: 'app-indiamap',
  templateUrl: './indiamap.component.html',
  styleUrls: ['./indiamap.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndiamapComponent implements OnInit {
  @ViewChild('indiachart', { static: true })
  indiachart!: ElementRef;
  @ViewChild('barchart', { static: true })
  barchart!: ElementRef;

  subscriptions: Subscription[] = [];

  chartRefDict:any = [];

  plotdata: { id: string; value: number }[] = [];
  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.onDetectChanges();
    this.subscriptions.push(this.apiService
      .indiaData()
      .pipe(
        tap((data) => this.apiService.india_data = data),
        tap(() => this.setPlotForKey('active')),
        tap(() => this.spinner.hide()),
        tap(() => this.onDetectChanges()),
      )
      .subscribe(
        () => {},
        (error) => console.log(error)
      ));
  }

  setPlotForKey(key: string): void {
    this.spinner.show();
    this.plotdata = [];
    let data: any = this.apiService.india_data;
    let states = data['state_wise'];
    Object.values(states).forEach((state: any) => {
      this.plotdata.push({
        id: 'IN-' + state.statecode,
        value: +state[key],
      });
    });
    this.chartDestroy();
    this.chartRefDict.push(mapPlotter(this.indiachart.nativeElement, this.plotdata));
    this.chartRefDict.push(barPlotter(this.barchart.nativeElement, this.plotdata));
    this.spinner.hide();
  }

  onSelect(event: any) {
    let key = event.target.value;
    this.setPlotForKey(key);
  }

  onDetectChanges() {
    this.changeDetectorRef.detectChanges();
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

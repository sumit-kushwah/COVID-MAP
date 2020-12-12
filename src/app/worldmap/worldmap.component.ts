import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { flatMapPlotter, barPlotter, globePlotter, neglectComma } from './helper';
import { countriesCode } from './countries';

@Component({
  selector: 'app-worldmap',
  templateUrl: './worldmap.component.html',
  styleUrls: ['./worldmap.component.css']
})
export class WorldmapComponent implements OnInit {

  @ViewChild('worldchart', { static: true })
  worldchart!: ElementRef;
  @ViewChild('barchart', { static: true })
  barchart!: ElementRef;

  subscriptions: Subscription[] = [];

  chartRefDict:any = [];

  maptype: "globe" | "flat" = "flat"; // default is flat map

  casetype:string = "active_cases";

  flatMapdata: { id: string; value: number }[] = [];
  globedata: any = {}
  barchartdata: { country: string; value : number}[] = [];

  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    this.onDetectChanges();
    this.subscriptions.push(this.apiService
      .worldData()
      .pipe(
        tap((data) => this.apiService.world_data = data),
        tap(() => this.setPlotForKey()),
        tap(() => this.spinner.hide()),
        tap(() => this.onDetectChanges()),
      )
      .subscribe(
        () => {},
        (error) => console.log(error)
      ));
  }

  setPlotForKey(): void {
    this.spinner.show();
    this.resetChartData();
    let data: any = this.apiService.world_data;
    let countries = data['countries_stat'];
    countries.forEach((country: any) => {
      let value = neglectComma(country[this.casetype]);
      if (countriesCode[country.country_name]) {
        let id = countriesCode[country.country_name];
        this.flatMapdata.push({
          id: id,
          value: value,
        })
        this.globedata[id] = value;
      }
      this.barchartdata.push({
        country: country.country_name,
        value: value,
      })
    })
    console.log(countries);
    this.chartDestroy();
    this.plotMap();
    this.chartRefDict.push(barPlotter(this.barchart.nativeElement, this.barchartdata));
    this.spinner.hide();
  }

  onCaseSelect(event: any) {
    this.casetype = event.target.value;
    this.setPlotForKey();
  }

  onMapSelect(event: any) {
    this.maptype = event.target.value;
    this.plotMap();
  }

  plotMap() {
    if (this.maptype == "globe") {
      this.chartRefDict.push(globePlotter(this.worldchart.nativeElement, this.globedata));
    }
    if (this.maptype == "flat") {
      this.chartRefDict.push(flatMapPlotter(this.worldchart.nativeElement, this.flatMapdata));
    }
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

  resetChartData() {
    this.flatMapdata = [];
    this.globedata = {};
    this.barchartdata = [];
  }

}

import { number } from '@amcharts/amcharts4/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
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

  plotdata: { id: string, value: number }[] = [];
  constructor(
    private apiService: ApiService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.apiService.indiaData().pipe(
      tap((data) => this.setPlotData(data, "active")),
      tap(() => mapPlotter(this.indiachart.nativeElement, this.plotdata)),
      tap(() => barPlotter(this.barchart.nativeElement, this.plotdata))
    ).subscribe(() => {}, error => console.log(error));

    this.selectControl.valueChanges.subscribe((value: any) => {
      console.log('Selected value:', value);
    })
  }

  setPlotData(data: any, key: string): void {
    this.apiService.india_data = data;
    let states = data["state_wise"];
    Object.values(states).forEach((state:any) => {
      this.plotdata.push({
        id: "IN-" + state.statecode,
        value: +state[key],
      })
    })
  }

  selectedkey! : string;

  selectControl = new FormControl('dropdown');

  onSelect(key: string) {
    console.log(this.selectedkey)
  }

  onDetectChanges() {
    this.changeDetectorRef.detectChanges();
  }

}

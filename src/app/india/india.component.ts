import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ApiService } from '../api.service';
import { numberWithCommas } from '../helper'

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {

  overviewData = {
    "last_updated" : {
      key: "lastupdatedtime",
      value: "",
    },
    "tableData" : [
      {
        "description" : "Total Cases",
        "key" : "confirmed",
        "value" : 0
      },
      {
        "description" : "New Cases",
        "key" : "deltaconfirmed",
        "value" : 0
      },
      {
        "description" : "Total Deaths",
        "key": "deaths",
        "value" : 0
      },
      {
        "description" : "New Deaths",
        "key": "deltadeaths",
        "value" : 0
      },
      {
        "description" : "Active Cases",
        "key" : "active",
        "value" : 0
      },
      {
        "description" : "Total Recovered",
        "key" : "recovered",
        "value" : 0
      },
      {
        "description" : "New Recovered",
        "key" : "deltarecovered",
        "value" : 0
      },
      {
        "description" : "Migrated To Other",
        "key" : "migratedother",
        "value" : 0
      },
    ],
    "recovery_rate" : 0,
  }

  constructor(
    private apiService: ApiService,
    private ref: ChangeDetectorRef,
    private router: Router) { }

  ngOnInit(): void {
    this.apiService.indiaData()
    .pipe(
      tap((data: any) => this.setOverviewData(data)),
      tap(() => this.onDetectChanges()),
    )
    .subscribe((data) => {
    }, error => console.log(error))
  }

  onDetectChanges() {
    this.ref.detectChanges();
  }

  setOverviewData(data: any) {
    this.apiService.india_data = data;
    let india_total = data.total_values;
    this.overviewData.last_updated.value = india_total["lastupdatedtime"];
    // table data
    this.overviewData.tableData.forEach(data => {
      data.value = numberWithCommas(+india_total[data.key]);
    });

    let recovered = india_total["recovered"];
    let cases = india_total["confirmed"];
    this.overviewData.recovery_rate = +((+recovered * 100) / (+cases)).toFixed(2);
  }

  tomap() {
    this.router.navigate(['/indiamap']);
  }

}

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-world',
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorldComponent implements OnInit {

  overviewData = {
    "last_updated" : {
      key: "statistic_taken_at",
      value: "",
    },
    "tableData" : [
      {
        "description" : "Total Cases",
        "key" : "total_cases",
        "value" : 0
      },
      {
        "description" : "New Cases",
        "key" : "new_cases",
        "value" : 0
      },
      {
        "description" : "Total Deaths",
        "key": "total_deaths",
        "value" : 0
      },
      {
        "description" : "New Deaths",
        "key": "new_deaths",
        "value" : 0
      },
      {
        "description" : "Active Cases",
        "key" : "active_cases",
        "value" : 0
      },
      {
        "description" : "Total Recovered",
        "key" : "total_recovered",
        "value" : 0
      },
      {
        "description" : "Serious Critical",
        "key" : "serious_critical",
        "value" : 0
      },
      {
        "description" : "Total Cases per 1M population",
        "key" : "total_cases_per_1m_population",
        "value" : 0
      },
      {
        "description" : "Deaths per 1M population",
        "key" : "deaths_per_1m_population",
        "value" : 0
      },
    ],
    "recovery_rate": 0,
  }

  constructor(
    private apiService: ApiService,
    private ref: ChangeDetectorRef,
    private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.apiService.wordData()
    .pipe(
      tap((data: any) => this.setOverviewData(data)),
      tap(() => this.spinner.hide()),
      tap(() => this.onDetectChanges()),
    )
    .subscribe((data) => {
    }, error => console.log(error))
  }

  onDetectChanges() {
    this.ref.detectChanges();
  }

  setOverviewData(data: any) {
    this.apiService.world_data = data;
    let world_total = data.world_total;
    this.overviewData.last_updated.value = world_total["statistic_taken_at"];
    // table data
    this.overviewData.tableData.forEach(data => {
      data.value = world_total[data.key]
    });
    let re = /\,/gi;
    let recovered = world_total["total_recovered"].replace(re, "");
    let cases = world_total["total_cases"].replace(re, "");
    this.overviewData.recovery_rate = +((+recovered * 100) / (+cases)).toFixed(2);
  }

  tomap() {
    this.router.navigate(['/worldmap']);
  }

}

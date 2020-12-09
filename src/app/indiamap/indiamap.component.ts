import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-indiamap',
  templateUrl: './indiamap.component.html',
  styleUrls: ['./indiamap.component.css']
})
export class IndiamapComponent implements OnInit {

  @ViewChild('indiachart', { static: true })
  indiachart!: ElementRef;

  constructor() { }

  ngOnInit(): void {

  }

}

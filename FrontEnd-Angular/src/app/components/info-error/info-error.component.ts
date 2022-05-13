import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-error',
  templateUrl: './info-error.component.html',
  styleUrls: ['./info-error.component.css']
})
export class InfoErrorComponent implements OnInit {

  @Input() mensaje:string="";

  constructor() { }

  ngOnInit(): void {
  }

}

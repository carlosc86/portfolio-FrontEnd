import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-elemento-separador',
  templateUrl: './elemento-separador.component.html',
  styleUrls: ['./elemento-separador.component.css']
})
export class ElementoSeparadorComponent implements OnInit {

  constructor() { }

  @Input() color:string="";

  ngOnInit(): void {
  }

}

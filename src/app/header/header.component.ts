import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pz-header',
  templateUrl: './header.component.html',
  styles: [`
    h1 {
      font-size: 45px;
      margin-top: 25px;
    }
  `]

})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

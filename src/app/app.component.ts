import { Component, ViewChild } from '@angular/core';
import { MatToolbar, MatCard } from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'angularMaterial';

  opened: boolean;

  constructor() {
  }

  recieveValueFromSon(event: boolean) {
    this.opened = event;
  }



}

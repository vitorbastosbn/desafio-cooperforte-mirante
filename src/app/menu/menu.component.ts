import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  @Output() sendToFather = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  
  sendAnwserToFather() {
    this.sendToFather.emit('false');
  }

}

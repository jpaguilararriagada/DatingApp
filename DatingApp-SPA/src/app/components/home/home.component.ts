import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   registerMode = false;
  constructor() { }

  ngOnInit() {
  }

  registroToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelarToggle( modo: boolean ) {
    this.registerMode = modo;
  }

}

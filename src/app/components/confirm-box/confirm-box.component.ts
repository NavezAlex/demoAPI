import { Component, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-confirm-box',
  templateUrl: './confirm-box.component.html',
  styleUrls: ['./confirm-box.component.scss']
})
export class ConfirmBoxComponent implements OnInit {

  // @Output()
  // clickHandler : EventEmitter<any>;

  constructor() { 
    //this.clickHandler = new EventEmitter<number>;
  }

  ngOnInit(): void {
  }

}

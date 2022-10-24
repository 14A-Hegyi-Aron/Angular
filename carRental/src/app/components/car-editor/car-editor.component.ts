import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { EventManager } from '@angular/platform-browser';
import { CarModel } from 'src/app/models';

@Component({
  selector: 'app-car-editor',
  templateUrl: './car-editor.component.html',
  styleUrls: ['./car-editor.component.css']
})
export class CarEditorComponent implements OnInit {

  @Input() model: CarModel | null = null;
  @Input() isnew: boolean = false;
  @Output() closed = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  cancel() {
    this.closed.emit(null);
  }

  save() {
    this.closed.emit(this.model);
  }
}

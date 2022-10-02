import { Component, OnInit, Output, EventEmitter } from '@angular/core';

enum colors {
  BLACK = '#000000',
  GREEN = '#BBCB50',
  BLUE = '#678CEC',
  VIOLET = '#3B5BA5',
  MUSTARD = '#EDC400',
  PINK = '#D49BAE',
}

@Component({
  selector: 'app-color-panel',
  templateUrl: './color-panel.component.html',
  styleUrls: ['./color-panel.component.scss'],
})
export class ColorPanelComponent implements OnInit {
  @Output() emitColor: EventEmitter<string> = new EventEmitter();

  colorsData = Object.values(colors);

  constructor() {}

  ngOnInit(): void {}

  onColorEmit(color: string) {
    this.emitColor.emit(color);
  }
}

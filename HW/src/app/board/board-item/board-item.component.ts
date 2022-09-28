import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() item: any;
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onCardDelete(id: number) {
    this.emitDeleteCard.emit(id);
  }
}

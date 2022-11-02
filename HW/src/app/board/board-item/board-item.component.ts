import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss'],
})
export class BoardItemComponent implements OnInit {
  @Input() item;
  @Output() emitText: EventEmitter<{ id: number; text: string }> =
    new EventEmitter();
  @Output() emitCardItem: EventEmitter<{ card: any; increase: boolean }> =
    new EventEmitter();
  @Output() emitAddCard: EventEmitter<number> = new EventEmitter();
  @Output() emitDeleteCard: EventEmitter<number> = new EventEmitter();
  @Output() emitEditCard: EventEmitter<number> = new EventEmitter();
  @Output() emitCheckCard: EventEmitter<number> = new EventEmitter();

  commentInput = '';
  open = false;
  constructor() {}

  ngOnInit(): void {}

  onCardItemEmit(card: any, increase: boolean) {
    this.emitCardItem.emit({ card, increase });
  }

  onCardEdit(id: number) {
    this.emitEditCard.emit(id);
  }

  onCardAdd(id: number) {
    this.emitAddCard.emit(id);
  }

  onCardDelete(id: number) {
    this.emitDeleteCard.emit(id);
  }

  onCardCheck(id: number) {
    this.emitCheckCard.emit(id);
  }
}

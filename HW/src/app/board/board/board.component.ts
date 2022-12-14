import { Component, OnInit } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  public board = [];
  display = false;
  selectedColumnId: number | undefined;

  constructor(public boardService: BoardService) {}

  ngOnInit(): void {
    this.boardService.getBoard$().subscribe((data) => {
      console.log('data', data);
    });
  }

  closeInput(id: number) {
    this.display = !this.display;
    if (id) {
      this.selectedColumnId = id;
    } else {
      this.selectedColumnId = undefined;
    }
  }

  onColorChange(color: string, columnId: number) {
    this.boardService.changeColumnColor(color, columnId);
  }

  onAddCard(text: string, columnId: number) {
    if (text) {
      this.boardService.addCard(text, columnId);
    }
  }

  onEditColumn(columnId: number) {
    this.boardService.editColumn(columnId);
  }

  onDeleteColumn(columnId: number) {
    this.boardService.deleteColumn(columnId);
  }

  onEditCard(cardId: number, columnId: number) {
    this.boardService.editCard(cardId, columnId);
  }

  onDeleteCard(cardId: number, columnId: number) {
    this.boardService.deleteCard(cardId, columnId);
  }

  onCheckCard(cardId: number, columnId: number) {
    this.boardService.checkCard(cardId, columnId);
  }

  drop(event: CdkDragDrop<any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

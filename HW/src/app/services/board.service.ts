import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private initBoard = [
    {
      id: 1,
      title: 'Todo',
      color: '#e92c62',
      list: [
        {
          id: 1,
          text: '123',
        },
        {
          id: 2,
          text: '1213423',
        },
        {
          id: 3,
          text: '1',
        },
      ],
    },
    {
      id: 2,
      title: 'In Progress',
      color: 'green',
      list: [
        {
          id: 1,
          text: '222',
        },
        {
          id: 2,
          text: '222222222',
        },
      ],
    },
  ];
  private board: any[] = this.initBoard;
  private board$ = new BehaviorSubject<any[]>(this.initBoard);

  getBoard$() {
    return this.board$.asObservable();
  }

  deleteCard(cardId: number, columnId: number) {
    this.board = this.board.map((column: any) => {
      if (column.id === columnId) {
        column.list = column.list.filter((card: any) => card.id !== cardId);
      }
      return column;
    });

    this.board$.next([...this.board]);
  }
}

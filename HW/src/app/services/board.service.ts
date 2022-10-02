import { ListKeyManager } from '@angular/cdk/a11y';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Card, Column } from '../models/column.model';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  private initBoard = [];
  constructor(private http: HttpClient) {}

  public loadData() {
    let result = this.http
      .get<any>('http://localhost:3000/boards')
      .subscribe((response) => {
        this.initBoard = response;
        // console.log(this.initBoard);
        this.board$.next(this.initBoard);
      });
    return result;
  }

  // private initBoard = [
  //   {
  //     id: 1,
  //     title: 'To Do',
  //     description: '111',
  //     creationDate: `${String(new Date().getDate()).padStart(2, '0')}/${String(
  //       new Date().getMonth() + 1
  //     ).padStart(2, '0')}/${new Date().getFullYear()}`,
  //     color: '#009886',
  //     list: [
  //       {
  //         id: 1,
  //         text: 'Example card item',
  //         like: 1,
  //         comments: [
  //           {
  //             id: 1,
  //             text: 'Some comment',
  //           },
  //         ],
  //       },
  //     ],
  //   },
  // ];

  private board: Column[] = this.initBoard;
  private board$ = new BehaviorSubject<Column[]>(this.initBoard);

  getBoard$() {
    return this.board$.asObservable();
  }

  changeColumnColor(color: string, columnId: number) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.color = color;
      }
      return column;
    });
    this.board$.next([...this.board]);
  }

  addColumn(title: string, description: string) {
    const newColumn: Column = {
      id: Date.now(),
      title: title,
      description: description,
      creationDate: `${String(new Date().getDate()).padStart(2, '0')}/${String(
        new Date().getMonth() + 1
      ).padStart(2, '0')}/${new Date().getFullYear()}`,
      color: '#009886',
      list: [],
    };
    this.http
      .post<{ id: number }>('http://localhost:3000/boards', newColumn)
      .subscribe((res) => {
        this.board$.next([...this.board$.value, newColumn]);
      });
    // this.board = [...this.board, newColumn];
  }

  addCard(text: string, columnId: number) {
    const newCard: Card = {
      id: Date.now(),
      text,
      like: 0,
      comments: [],
    };

    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = [newCard, ...column.list];
      }
      return column;
    });

    this.board$.next([...this.board]);
  }

  editColumn(columnId) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const newTitle = prompt('Enter new title');
        if (newTitle) {
          column.title = newTitle;
        }
      }
      return column;
    });

    this.board$.next([...this.board]);
  }

  deleteColumn(columnId) {
    this.board = this.board.filter((column: Column) => column.id !== columnId);
    this.board$.next([...this.board]);
  }

  editCard(cardId: number, columnId: number) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const newText = prompt('Enter new card text');
        if (newText) {
          const card = column.list.find((el) => el.id === cardId);
          if (card?.id) {
            card.text = newText;
          }
        }
      }
      return column;
    });

    this.board$.next([...this.board]);
  }

  deleteCard(cardId: number, columnId: number) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = column.list.filter((card: Card) => card.id !== cardId);
      }
      return column;
    });

    this.board$.next([...this.board]);
  }
}

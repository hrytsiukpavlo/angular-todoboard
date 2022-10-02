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
        this.board$.next(this.initBoard);
      });
    return result;
  }

  private board: Column[] = this.initBoard;
  private board$ = new BehaviorSubject<Column[]>(this.initBoard);

  getBoard$() {
    return this.board$.asObservable();
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
  }

  deleteColumn(columnId: number) {
    this.http
      .delete<{ id: number }>(`http://localhost:3000/boards/${columnId}`)
      .subscribe((res) => {
        this.board = this.initBoard.filter(
          (column: Column) => column.id !== columnId
        );
        this.board$.next([...this.board]);
      });

    this.board$.next([...this.board]);
  }

  editColumn(columnId: number) {
    this.board = this.initBoard.map((column: Column) => {
      if (column.id === columnId) {
        const newTitle = prompt('Enter new title');
        if (newTitle) {
          column.title = newTitle;
        }
      }
      this.http
        .put<any>(`http://localhost:3000/boards/${columnId}`, column)
        .subscribe((res) => {
          this.board$.next([...this.board]);
        });
      return column;
    });

    this.board$.next([...this.board]);
  }

  addCard(text: string, columnId: number) {
    const newCard: Card = {
      id: Date.now(),
      text,
    };

    this.board = this.initBoard.map((column: Column) => {
      if (column.id === columnId) {
        column.list = [newCard, ...column.list];
      }
      this.http
        .put<any>(`http://localhost:3000/boards/${column.id}`, column)
        .subscribe((res) => {
          this.board$.next([...this.board]);
        });
      return column;
    });

    this.board$.next([...this.board]);
  }

  deleteCard(cardId: number, columnId: number) {
    this.board = this.initBoard.map((column: Column) => {
      if (column.id === columnId) {
        column.list = column.list.filter((card: Card) => card.id !== cardId);
      }
      this.http
        .put<any>(`http://localhost:3000/boards/${column.id}`, column)
        .subscribe((res) => {
          this.board$.next([...this.board]);
        });
      return column;
    });

    // this.board$.next([...this.board]);
  }

  editCard(cardId: number, columnId: number) {
    this.board = this.initBoard.map((column: Column) => {
      if (column.id === columnId) {
        const newText = prompt('Enter new card text');
        if (newText) {
          const card = column.list.find((el) => el.id === cardId);
          if (card?.id) {
            card.text = newText;
          }
        }
      }
      this.http
        .put<any>(`http://localhost:3000/boards/${column.id}`, column)
        .subscribe((res) => {
          this.board$.next([...this.board]);
        });
      return column;
    });

    this.board$.next([...this.board]);
  }

  changeColumnColor(color: string, columnId: number) {
    this.board = this.initBoard.map((column: Column) => {
      if (column.id === columnId) {
        column.color = color;
      }
      this.http
        .put<any>(`http://localhost:3000/boards/${column.id}`, column)
        .subscribe((res) => {
          this.board$.next([...this.board]);
        });
      return column;
    });

    this.board$.next([...this.board]);
  }
}

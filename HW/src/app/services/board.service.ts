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
        this.board$.next([
          ...this.board$.value.filter(
            (column: Column) => column.id !== columnId
          ),
        ]);
      });
  }

  editColumn(columnId: number) {
    const newTitle = prompt('Enter new title');
    let currentColumn = this.board$.value.find((el) => {
      return el.id === columnId;
    });

    if (currentColumn?.title) {
      currentColumn.title = newTitle;

      this.http
        .put<any>(`http://localhost:3000/boards/${columnId}`, currentColumn)
        .subscribe((res) => {
          this.board$.next([...this.board$.value]);
        });
    }
  }

  addCard(text: string, columnId: number) {
    const newCard: Card = {
      id: Date.now(),
      text,
    };

    let currentColumn = this.board$.value.find((el) => {
      return el.id === columnId;
    });

    if (currentColumn?.title) {
      currentColumn.list = [...currentColumn.list, newCard];

      this.http
        .put<any>(`http://localhost:3000/boards/${columnId}`, currentColumn)
        .subscribe((res) => {
          this.board$.next([...this.board$.value]);
        });
    }
  }

  deleteCard(cardId: number, columnId: number) {
    let currentColumn = this.board$.value.find((el) => {
      return el.id === columnId;
    });

    if (currentColumn?.list) {
      currentColumn.list = currentColumn.list.filter(
        (card: Card) => card.id !== cardId
      );

      this.http
        .put<any>(`http://localhost:3000/boards/${columnId}`, currentColumn)
        .subscribe((res) => {
          this.board$.next([...this.board$.value]);
        });
    }
  }

  editCard(cardId: number, columnId: number) {
    let currentColumn = this.board$.value.find((el) => {
      return el.id === columnId;
    });

    if (currentColumn?.list) {
      const newText = prompt('Enter new card text');
      const card = currentColumn.list.find((el) => el.id === cardId);
      if (card) {
        card.text = newText;
      }

      this.http
        .put<any>(`http://localhost:3000/boards/${columnId}`, currentColumn)
        .subscribe((res) => {
          this.board$.next([...this.board$.value]);
        });
    }
  }

  changeColumnColor(color: string, columnId: number) {
    let currentColumn = this.board$.value.find((el) => {
      return el.id === columnId;
    });

    if (currentColumn?.color) {
      currentColumn.color = color;

      this.http
        .put<any>(`http://localhost:3000/boards/${columnId}`, currentColumn)
        .subscribe((res) => {
          this.board$.next([...this.board$.value]);
        });
    }
  }
}

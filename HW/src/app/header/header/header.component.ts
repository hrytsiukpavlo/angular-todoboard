import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(public boardService: BoardService) {}

  ngOnInit(): void {
    console.log(this.boardService.loadData());
    console.log('inited');
  }

  askColumn() {
    const colName = prompt('Enter column name');
    if (colName) {
      const description = prompt('Enter description');
      if (description) {
        this.addColumn(colName, description);
      }
    }
  }

  addColumn(title: string, description: string) {
    if (title && description) {
      this.boardService.addColumn(title, description);
    }
  }
}

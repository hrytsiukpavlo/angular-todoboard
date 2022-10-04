import { Component, OnInit } from '@angular/core';
import { BoardService } from 'src/app/services/board.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  constructor(public boardService: BoardService) {}

  ngOnInit(): void {}

  change(event) {
    this.boardService.searchFilter(event.target.value);
  }

  cancelClick() {
    this.boardService.cancelFilter();
  }

  sortBoard(value) {
    console.log(value);
  }

  selectedDay: string = '';

  selectChangeHandler(event: any) {
    this.selectedDay = event.target.value;
    this.boardService.sortBoard(this.selectedDay);
  }
}

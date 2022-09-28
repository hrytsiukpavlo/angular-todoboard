import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardItemComponent } from './board-item/board-item.component';

@NgModule({
  declarations: [BoardComponent, BoardItemComponent],
  imports: [CommonModule, DragDropModule],
  exports: [BoardComponent],
})
export class BoardModule {}

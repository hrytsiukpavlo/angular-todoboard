import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardItemComponent } from './board-item/board-item.component';

import { DialogModule } from '../components/dialog/dialog.module';
import { ColorPanelComponent } from './color-panel/color-panel.component';
import { ReversePipe } from '../pipes/reverse.pipe';
@NgModule({
  declarations: [
    BoardComponent,
    BoardItemComponent,
    ColorPanelComponent,
    ReversePipe,
  ],
  imports: [CommonModule, DragDropModule, FormsModule, DialogModule],
  exports: [BoardComponent],
})
export class BoardModule {}

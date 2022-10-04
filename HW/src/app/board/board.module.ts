import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { BoardItemComponent } from './board-item/board-item.component';

import { DialogModule } from '../components/dialog/dialog.module';
import { ColorPanelComponent } from './color-panel/color-panel.component';
import { ReversePipe } from '../pipes/reverse.pipe';
import { InputComponent } from './board/input/input.component';
import { SearchComponent } from './board/search/search.component';
@NgModule({
  declarations: [
    BoardComponent,
    BoardItemComponent,
    ColorPanelComponent,
    ReversePipe,
    InputComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    DragDropModule,
    FormsModule,
    DialogModule,
    ReactiveFormsModule,
  ],
  exports: [BoardComponent],
})
export class BoardModule {}

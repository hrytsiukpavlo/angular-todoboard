import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogComponent } from './dialog/dialog.component';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogComponent, DialogBodyComponent],
  imports: [CommonModule, FormsModule],
  exports: [DialogComponent],
})
export class DialogModule {}

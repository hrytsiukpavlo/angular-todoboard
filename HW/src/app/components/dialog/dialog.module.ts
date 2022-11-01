import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { DialogComponent } from './dialog/dialog.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [DialogComponent, DialogBodyComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [DialogComponent],
})
export class DialogModule {}

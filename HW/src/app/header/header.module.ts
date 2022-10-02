import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { DialogModule } from '../components/dialog/dialog.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './header/input/input.component';
@NgModule({
  declarations: [HeaderComponent, InputComponent],
  imports: [CommonModule, DialogModule, ReactiveFormsModule],
  exports: [HeaderComponent],
})
export class HeaderModule {}

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardModule } from './board/board.module';
import { HeaderModule } from './header/header.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HeaderModule, BoardModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { PuzzleService} from './services/puzzle.service';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [PuzzleService],
  bootstrap: [AppComponent]
})
export class AppModule { }

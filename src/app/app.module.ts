import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { 
  AppComponent,
  CarListComponent,
  HomeComponent 
} from './components';
import { First10CharWithPointPipe } from './pipes/first10-char-with-point.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    HomeComponent,
    First10CharWithPointPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

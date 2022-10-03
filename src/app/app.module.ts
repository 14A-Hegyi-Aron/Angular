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
import { ConfirmComponent } from './components/confirm/confirm.component';
import { CarList2Component } from './components/car-list2/car-list2.component';

@NgModule({
  declarations: [
    AppComponent,
    CarListComponent,
    HomeComponent,
    First10CharWithPointPipe,
    ConfirmComponent,
    CarList2Component
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

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { 
  CarListComponent,
  CarList2Component, 
  HomeComponent 
} from './components';

const routes: Routes = [
  {path: '', component: HomeComponent },
  {path: 'car-list', component: CarListComponent },
  {path: 'car-list2', component: CarList2Component },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

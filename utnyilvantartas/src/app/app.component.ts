import { Component, OnInit } from '@angular/core';
import { RouteModel } from './models/route.model';
import { CarModel } from './models/car.model';
import { HttpService } from './services/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  model: RouteModel = {
    carId: 0,
    date: '',
    from: '',
    to: '',
    km: 0,
    driverName: '',
  };

  cars: CarModel[] = [];
  errorMessage = '';

  constructor(private httpservice: HttpService) {}

  ngOnInit(): void {
    this.httpservice.carList().subscribe({
      next: (result) => (this.cars = result),
      error(err) {
        console.log(err);
      },
    });
  }

  save() {
    if (this.model.carId && this.model.date && this.model.from && this.model.to && this.model.km && this.model.driverName) {
      this.errorMessage = '';
      this.model.carId = Number(this.model.carId);
      this.httpservice.newRoute(this.model).subscribe({
        next: (result) => {
          alert('Sikeres mentés!');
          this.model = this.emptyRoute();
        },
        error(err) {
          console.log(err);
        },
      });
    } else {
      this.errorMessage = 'Kérem töltse ki az összes mezőt!';
    }
  }

  emptyRoute(): RouteModel {
    return {
      carId: 0,
      date: '',
      from: '',
      to: '',
      km: 0,
      driverName: '',
    };
  }
}

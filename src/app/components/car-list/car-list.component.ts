import { Component, OnInit } from '@angular/core';
import { CarModel } from '../../models';
import { CarService } from '../../services';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: CarModel[] = [];
  newCarData: CarModel | null = null;

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (result) => {
        this.cars = result;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  newCar() {
    this.newCarData = {
      licensePlate: 'AA-AA-000',
      model: '',
      pricePerDay: 0,
      date: new Date().toISOString().split('T')[0],
    };
  }
  newCarSave() {
    if (!this.newCarData) {
      return;
    }

    this.carService.newCar(this.newCarData).subscribe({
      next: (result) => {
        this.newCarData = null;
        this.cars.push(result);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

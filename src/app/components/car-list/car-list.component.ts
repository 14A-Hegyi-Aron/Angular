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
  errors = {
    licensePlate: false,
    model: false,
    pricePerDay: false,
    date: false,
  };

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

    this.errors = {
      licensePlate: false,
      model: false,
      pricePerDay: false,
      date: false,
    };
  }
  newCarSave() {
    if (!this.newCarData) {
      return;
    }

    this.errors.licensePlate = !this.newCarData.licensePlate;
    this.errors.model = !this.newCarData.model;
    this.errors.pricePerDay = !this.newCarData.pricePerDay || this.newCarData.pricePerDay <= 0;
    this.errors.date = !this.newCarData.date;

    if (
      !this.errors.licensePlate ||
      this.errors.model ||
      this.errors.pricePerDay ||
      this.errors.date
    ) {
      return;
    }

    this.carService.newCar(this.newCarData).subscribe({
      next: (result) => {
        if (this.newCarData) {
          this.cars.push(this.newCarData);
        }
        this.newCarData = null;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}

import { DomElementSchemaRegistry } from '@angular/compiler';
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
  carToDelete: CarModel | null = null;
  carToEdit: CarModel | null = null;
  errors = {
    licensePlate: false,
    model: false,
    pricePerDay: false,
    date: false,
  };
  errorText = '';

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (result) => {
        this.cars = result;
        // this.cars.push({
        //   licensePlate: 'AA-AA-000',
        //   model: 'DEFAULT',
        //   pricePerDay: 0,
        //   date: new Date().toISOString().split('T')[0],
        // });
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
  changeLicensePlate(event: any) {
    if (this.newCarData) {
      this.newCarData.licensePlate = event.target.value;
    }
  }
  newCarSave() {
    if (!this.newCarData) {
      return;
    }

    this.errors.licensePlate = !this.newCarData.licensePlate;
    this.errors.model = !this.newCarData.model;
    this.errors.pricePerDay =
      !this.newCarData.pricePerDay || this.newCarData.pricePerDay <= 0;
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
  deleteCarRequest(car: CarModel) {
    this.carToDelete = car;
  }

  deleteCar() {
    if (!this.carToDelete) {
      return;
    }

    this.carService.deleteCar(this.carToDelete).subscribe({
      next: (result) => {
        if (this.carToDelete) {
          const index = this.cars.indexOf(this.carToDelete);
          this.cars.splice(index, 1);
          this.carToDelete = null;
        }
      },
      error: (err) => {
        this.carToDelete = null;
        this.errorText =
          err.error && err.error.errorText ? err.error.errorText : err.message;
        setTimeout(() => {
          this.errorText = '';
        }, 5000);
      },
    });
  }

  editCarRequest(car: CarModel) {
    this.carToEdit = car;
  }

  editCarSave() {
    if (!this.carToEdit) {
      return;
    }

    this.errors.licensePlate = !this.carToEdit.licensePlate;
    this.errors.model = !this.carToEdit.model;
    this.errors.pricePerDay =
      !this.carToEdit.pricePerDay || this.carToEdit.pricePerDay <= 0;
    this.errors.date = !this.carToEdit.date;

    if (
      !this.errors.licensePlate ||
      this.errors.model ||
      this.errors.pricePerDay ||
      this.errors.date
    ) {
      return;
    }

    this.carService.editCar(this.carToEdit).subscribe({
      next: (result) => {
        this.carToEdit = null;
      },
      error: (err) => {
        this.carToDelete = null;
        this.errorText =
          err.error && err.error.errorText ? err.error.errorText : err.message;
        setTimeout(() => {
          this.errorText = '';
        }, 5000);
      },
    });
  }
}

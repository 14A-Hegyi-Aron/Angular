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
  carToModify: CarModel | null = null;

  errors = {
    licensePlate: false,
    model: false,
    price: false,
    date: false,
  };
  errorText = '';

  constructor(private carService: CarService) {}

  ngOnInit(): void {
    this.carService.getCars().subscribe({
      next: (result) => {
        this.cars = result;
        // this.cars.push({
        //   licensePlate: 'NincsIlyen',
        //   model: 'ues',
        //   pricePerDay: 100,
        //   date: '2000-01-01'
        // })
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  newCar() {
    this.newCarData = {
      licensePlate: '',
      model: '',
      pricePerDay: 0,
      date: new Date().toISOString().substring(0, 10),
    };

    this.errors = {
      licensePlate: false,
      model: false,
      price: false,
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
    this.errors.price = this.newCarData.pricePerDay <= 0;
    this.errors.date = !this.newCarData.date;

    if (
      this.errors.licensePlate ||
      this.errors.model ||
      this.errors.price ||
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
        console.log(err);
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
        console.log(err);
        this.carToDelete = null;
        this.errorText =
          err.error && err.error.errorText ? err.error.errorText : err.message;
        setTimeout(() => (this.errorText = ''), 10000);
      },
    });
  }

  modifyCarRequest(car: CarModel) {
    // // this.carToModify = car;

    // this.carToModify = {
    //   licensePlate: car.licensePlate,
    //   model: car.model,
    //   pricePerDay: car.pricePerDay,
    //   date: car.date.split('T')[0]
    // };

    this.carToModify = JSON.parse(JSON.stringify(car)); // deep copy
    // this.carToModify = {...car}; // shallow copy
    if (this.carToModify) {
      this.carToModify.date = this.carToModify.date.split('T')[0];
    }
  }

  modifyCar(car: CarModel) {
    if (!this.carToModify) {
      return;
    }

    this.errors.licensePlate = !this.carToModify.licensePlate;
    this.errors.model = !this.carToModify.model;
    this.errors.price = this.carToModify.pricePerDay <= 0;
    this.errors.date = !this.carToModify.date;

    if (
      this.errors.licensePlate ||
      this.errors.model ||
      this.errors.price ||
      this.errors.date
    ) {
      return;
    }

    this.carService.modifyCar(this.carToModify).subscribe({
      next: (result) => {
        const index = this.cars.indexOf(
          this.cars.filter(
            (c) => c.licensePlate === this.carToModify?.licensePlate
          )[0]
        );

        this.cars[index] = JSON.parse(JSON.stringify(this.carToModify));
        this.carToModify = null;
      },
      error: (err) => {
        console.log(err);
        this.carToDelete = null;
        this.errorText =
          err.error && err.error.errorText ? err.error.errorText : err.message;
        setTimeout(() => (this.errorText = ''), 10000);
      },
    });
  }
}

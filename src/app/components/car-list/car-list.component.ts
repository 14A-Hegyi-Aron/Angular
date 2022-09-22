import { Component, OnInit } from '@angular/core';
import { CarModel } from '../../models/';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.css'],
})
export class CarListComponent implements OnInit {
  cars: CarModel[] = [
    {
      licensePlate: 'AA-AA-001',
      model: 'Ford Focus',
      pricePerDay: 39900,
      date: '2022-06-10',
    },
    {
      licensePlate: 'AA-AA-002',
      model: 'Ford Mondeo',
      pricePerDay: 49900,
      date: '2022-06-10',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}

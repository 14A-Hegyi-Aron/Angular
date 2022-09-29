import { Injectable } from '@angular/core';
import { CarModel } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>('http://c103-20/api/car');
  }

  newCar(car: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>('http://c103-20/api/car', car);
  }

  deleteCar(car: CarModel): Observable<any> {
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: car,
    };
    return this.http.delete<any>('http://c103-20/api/car/', options);
  }

  editCar(car: CarModel): Observable<CarModel> {
    return this.http.put<CarModel>('http://c103-20/api/car', car);
  }

  // getCars(): CarModel[] {
    // return [
    //   {
    //     licensePlate: 'AA-AA-001',
    //     model: 'Ford Focus',
    //     pricePerDay: 39900,
    //     date: '2022.06.10'
    //   },
    //   {
    //     licensePlate: 'AA-AA-002',
    //     model: 'Tesla Model 3',
    //     pricePerDay: 49900,
    //     date: '2022.06.10'
    //   },
    //   {
    //     licensePlate: 'AA-AA-003',
    //     model: 'VW Golf',
    //     pricePerDay: 29900,
    //     date: '2022.06.11'
    //   },
    //   {
    //     licensePlate: 'AA-AA-004',
    //     model: 'Mercedes Class C',
    //     pricePerDay: 59900,
    //     date: '2022.06.12'
    //   },
    //   {
    //     licensePlate: 'AA-AA-005',
    //     model: 'BMW 3 Series',
    //     pricePerDay: 69900,
    //     date: '2022.06.13'
    //   },
    //   {
    //     licensePlate: 'AA-AA-006',
    //     model: 'Tesla Cybertruck',
    //     pricePerDay: 99900,
    //     date: '2022.06.14'
    //   },
    // ]
  // }
}
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarModel } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private http: HttpClient) { }

  getCars(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>('http://C103-20/api/car');
  }

  newCar(model: CarModel): Observable<CarModel> {
    return this.http.post<CarModel>('http://C103-20/api/car', model);
  }

  deleteCar(model: CarModel): Observable<any> {
    var options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: model
    }
    return this.http.delete<any>('http://C103-20/api/car', options);
  }

  modifyCar(model: CarModel): Observable<CarModel> {
    return this.http.put<CarModel>('http://C103-20/api/car', model);
  }

  // getCars(): CarModel[] {
  //   return [
  //     {
  //       licensePlate: 'AA-AA-001',
  //       model: 'Ford Focus',
  //       pricePerDay: 39900,
  //       date: '2022.06.10'
  //     },
  //     {
  //       licensePlate: 'AA-AA-002',
  //       model: 'Ford Modeo',
  //       pricePerDay: 49900,
  //       date: '2022.06.10'
  //     },
  //     {
  //       licensePlate: 'AA-AA-003',
  //       model: 'VW Golf',
  //       pricePerDay: 39900,
  //       date: '2022.06.11'
  //     }
  //   ];
  // }
}

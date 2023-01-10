import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CarModel } from '../models/car.model';
import { Observable } from 'rxjs';
import { RouteModel } from '../models/route.model';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  carList(): Observable<CarModel[]> {
    return this.http.get<CarModel[]>('http://c103-21/api/cars');
  }

  newRoute(model: RouteModel): Observable<any> {
    return this.http.post('http://c103-21/api/routes', model);
  }
}

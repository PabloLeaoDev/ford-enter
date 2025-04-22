import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getVehicle(vehicleModel: string): Observable<any[]> {
    if (!vehicleModel) return this.http.get<any[]>(`${this.apiUrl}/vehicle`);

    return this.http.get<any[]>(`${this.apiUrl}/vehicle?vehicleModel=${vehicleModel}`);
  }

  getVehicleData(code: string | undefined): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/vehicleData?vin=${code}`);
  }
}

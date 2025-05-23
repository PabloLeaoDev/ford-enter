import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  private apiUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  getVehicle(vehicleModel: string): Observable<any> {
    const params: any = {};
    if (vehicleModel) params.vehicleModel = vehicleModel;

    return this.http.get<any>(`${this.apiUrl}/vehicle`, { params });
  }

  getVehicleData(code: string | undefined): Observable<any> | null {
    if (!code) return null;
    return this.http.get<any>(`${this.apiUrl}/vehicleData`, { params: { vin: code } });
  }
}

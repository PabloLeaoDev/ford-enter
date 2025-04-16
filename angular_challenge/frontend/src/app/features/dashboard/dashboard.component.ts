import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VehicleService } from './services/vehicle.service';
import { CommonModule, NgFor } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgFor, CommonModule, FormsModule]
})
export class DashboardComponent implements OnInit {
  searchForm: FormGroup; // Declare aqui
  vehicles: any[] = [];
  vehicleData: any[] = [];
  selectedVehicle: any;

  constructor(
    private fb: FormBuilder, // Injetado corretamente
    private vehicleService: VehicleService
  ) {
    // Inicialize o form no construtor
    this.searchForm = this.fb.group({
      searchCode: ['']
    });
  }

  ngOnInit(): void {
    this.setupSearch();
    this.loadVehicles();
  }

  private setupSearch(): void {
    this.searchForm.get('searchCode')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(value => {
        if (value) this.searchByCode(value);
      });
  }

  private loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe(data => {
      this.vehicles = data;
    });
  }

  searchByCode(code: string): void {
    this.vehicleService.getVehicleData(code).subscribe(data => {
      this.vehicleData = data ? [data] : [];
    });
  }

  onVehicleSelect(vehicle: any): void {
    this.selectedVehicle = vehicle;
  }
}
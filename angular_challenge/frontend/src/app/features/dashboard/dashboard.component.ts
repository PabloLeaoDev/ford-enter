import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { VehicleService } from './services/vehicle.service';
import { CommonModule, NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [NgFor, CommonModule, FormsModule, RouterLink]
})
export class DashboardComponent implements OnInit, AfterViewInit {
  searchForm: FormGroup;
  vehicleData: any[] = [];
  selectedVehicle: any;

  @ViewChild('vmodelInput', { static: false }) vmodelInput: ElementRef | undefined;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private elementRef: ElementRef
  ) {
    this.searchForm = this.fb.group({
      searchCode: ['']
    });
  }

  ngOnInit(): void {
    this.setupSearch();
  }

  ngAfterViewInit(): void {
    this.loadVehicle();
  }

  private setupSearch(): void {
    this.searchForm.get('searchCode')?.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((value) => {
        if (value) this.searchByCode(value);
      });
  }

  loadVehicle(): void {
    const vehicleModel = this.vmodelInput?.nativeElement?.value;

    if (vehicleModel) {
      this.vehicleService.getVehicle(vehicleModel).subscribe((data) => {
        this.onVehicleSelect(data);
      });
    }
  }

  searchByCode(code: string): void {
    this.vehicleService.getVehicleData(code).subscribe((data) => {
      this.vehicleData = data ? [data] : [];
    });
  }

  onVehicleSelect(vehicle: any): void {
    this.selectedVehicle = vehicle;
    console.log(vehicle);
  }
}

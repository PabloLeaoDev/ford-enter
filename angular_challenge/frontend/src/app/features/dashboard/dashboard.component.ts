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
  selectedVehicle: any[] | null | undefined = [];
  vehicleModels: any[] = [];
  selectedModel: string = '';

  @ViewChild('vmodelInput', { static: false }) vmodelInput: ElementRef | undefined;
  @ViewChild('vdetailInput', { static: false }) vdetailInput: ElementRef | undefined;

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
    this.loadVehicleModels();
    this.selectedVehicle = [];
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

  private loadVehicleModels(): void {
    this.vehicleService.getVehicle('').subscribe((models) => {
      this.vehicleModels = models;
    });
  }

  loadVehicle(model?: string): void {
    let vehicleModel = model;

    if (!model && this.selectedModel) {
      const selected = this.vehicleModels.find((v) => v.id == this.selectedModel);
      vehicleModel = selected?.model;
    }

    if (vehicleModel) {
      this.vehicleService.getVehicle(vehicleModel).subscribe((data) => {
        this.selectedVehicle = data;
      });
    }
  }

  searchByCode(code?: string): void {
    if (!code) code = this.vdetailInput?.nativeElement?.value;

    if (code) {
      this.vehicleService.getVehicleData(code)?.subscribe((data) => {
        this.vehicleData = data ? [{
          code: code,
          model: this.selectedVehicle?.[0]?.model || 'N/A',
          status: data.status,
          lastUpdated: new Date()
        }] : [];
      });
    }
  }

  onVehicleSelect(vehicle: any): void {
    this.selectedVehicle = Array.isArray(vehicle) ? vehicle : [vehicle];
  }
}

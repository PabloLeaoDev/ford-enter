import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DashboardData } from './dashboard.component.types'

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  veiculos: string[] = ['Ranger', 'Mustang', 'Territory', 'Bronco Sport'];
  veiculoSelecionado: string = 'Territory';

  dashboardData: DashboardData[] = [{
    name: 'Mustang',
    totalVendas: 4560,
    conectados: 500,
    updateSoftware: 3050,
    imagem: `assets/img/${this.veiculoSelecionado.toLowerCase()}.png`,
    vin: '29HAA97J4BL4HU34875',
    odometro: '10000 Km',
    combustivel: '25%',
    status: 'off',
    latitude: '-12.2222',
    longitude: '-35.2214'
  }];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.carregarDados();
  }

  onVeiculoChange(): void {
    this.carregarDados();
  }

  carregarDados(): void {
    const url = `https://api.exemplo.com/veiculos/${this.veiculoSelecionado}`;
    this.http.get<Array<DashboardData>>(url).subscribe((dados: DashboardData[]): void => {
      this.dashboardData = dados;
    }, (erro) => {
      console.error('Erro ao buscar dados:', erro);
      this.dashboardData = [{
        name: 'Mustang',
        totalVendas: 4560,
        conectados: 500,
        updateSoftware: 3050,
        imagem: `assets/img/${this.veiculoSelecionado.toLowerCase()}.png`,
        vin: '29HAA97J4BL4HU34875',
        odometro: '10000 Km',
        combustivel: '25%',
        status: 'off',
        latitude: '-12.2222',
        longitude: '-35.2214'
      }];
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data/data.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Post } from '../../../shared/models/data/data.model';

import { TableModule } from 'primeng/table';
import { MenuComponent } from '../../../shared/components/menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { Observable } from 'rxjs';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    MenuComponent,
    ButtonModule,
    PaginatorModule,
    TooltipModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data!: Post[]; // Almacena todos los datos
  paginatedData!: Post[]; // Almacena los datos paginados
  totalRecords: number = 0; // Total de registros
  rows: number = 10; // Número de registros por página
  currentPage: number = 1; // Página actual
  searchTerm: string = ''; // Término de búsqueda
  userData$!: Observable<any | null>;
  username: string = 'Usuario';
  userId!: string | null;

  constructor(
    private _dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    console.log('hola desde home');
    this._dataService.getData().subscribe((data) => {
      console.log(data);
      this.data = data;
      this.totalRecords = this.data.length; // Total de registros
      this.updatePaginatedData(); // Actualiza los datos paginados
      console.log(this.paginatedData);
    });

    const userId = localStorage.getItem('userId');
    console.log(userId);
    if (userId) {
      this.userData$ = this.authService.getUserDataById(userId);
      console.log(this.userData$);
    }
  }

  // Método para actualizar los datos paginados
  updatePaginatedData(): void {
    const filteredData = this.data.filter(post => 
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.rows;
    this.paginatedData = filteredData.slice(startIndex, startIndex + this.rows);
    this.totalRecords = filteredData.length; // Actualiza el total de registros filtrados
  }

  // Método que se llama cuando se cambia de página
  onPageChange(event: any): void {
    this.currentPage = event.page + 1; // PrimeNG usa 0-indexed
    this.updatePaginatedData(); // Actualiza los datos paginados
  }

  // Método para restaurar la lista completa
  restoreData(): void {
    this.searchTerm = ''; // Limpia el término de búsqueda
    this.updatePaginatedData(); // Actualiza los datos paginados
  }

  logout() {
    console.log('chau');
  }

  crearNuevoPost() {
    console.log('crear');
  }

  editar(post: any) {
    console.log('editar');
  }

  ver(post: any) {
    console.log('ver');
  }
}

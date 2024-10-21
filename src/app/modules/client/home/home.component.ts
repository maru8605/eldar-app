import { Component, inject, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data/data.service';
import { AuthService } from '../../../shared/services/auth/auth.service';
import { Post, UserData } from '../../../shared/models/data/data.model';


import { TableModule } from 'primeng/table';
import { MenuComponent } from '../../../shared/components/menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TableModule,
    MenuComponent,
    ButtonModule,
    PaginatorModule,
    TooltipModule,
    CommonModule,
    InputTextModule,
    DialogModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  data!: Post[];
  paginatedData!: Post[];
  totalRecords: number = 0;
  rows: number = 10;
  currentPage: number = 1;
  searchTerm: string = '';
  username: string = '';
  userId!: string | null;
  userData!: UserData;
  rol!: string;
  visible: boolean = false;

  constructor(
    private _dataService: DataService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this._dataService.getData().subscribe((data) => {
      this.data = data;
      this.totalRecords = this.data.length;
      this.updatePaginatedData();
    });

    const userData = localStorage.getItem('userData');
    const parseUserData = JSON.parse(userData!);

    this.username = parseUserData.name;
    console.log(this.username);
    this.rol = parseUserData.rol;
    console.log(this.rol);
  }

  updatePaginatedData(): void {
    const filteredData = this.data.filter((post) =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.rows;
    this.paginatedData = filteredData.slice(startIndex, startIndex + this.rows);
    this.totalRecords = filteredData.length;
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

  createNewPost() {
    console.log('crear');
    this.visible = true;
    console.log('this.vis', this.visible)
  }

  editar(post: any) {
    console.log('editar');
  }

  ver(post: any) {
    console.log('ver');
  }
}

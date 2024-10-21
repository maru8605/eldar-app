import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data/data.service';
import { Post } from '../../../shared/models/data/data.model';

import { TableModule } from 'primeng/table';
import { MenuComponent } from '../../../shared/components/menu/menu.component';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TableModule, MenuComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  data!: Post[];
  username: string = 'Usuario';
  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    console.log('hola desde home');
    this._dataService.getData().subscribe((data) => {
      console.log(data);
      this.data = data;
      console.log(this.data);
    });
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

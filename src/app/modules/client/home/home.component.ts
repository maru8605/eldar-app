import { Component,  OnInit } from '@angular/core';
import { DataService } from '../../../shared/services/data/data.service';
import { Post, PostData, UserData } from '../../../shared/models/data/data.model';


import { TableModule } from 'primeng/table';
import { MenuComponent } from '../../../shared/components/menu/menu.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { TooltipModule } from 'primeng/tooltip';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ReactiveFormsModule } from '@angular/forms'; 
import { InputTextareaModule } from 'primeng/inputtextarea';

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
    ReactiveFormsModule,
    InputTextareaModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [MessageService],
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
  postData!: PostData;
  rol!: string;
  visible: boolean = false;
  formTitle: string = '';
  saveButton:string = ''

  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    id: new FormControl(''),
  });

  constructor(
    private _dataService: DataService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this._dataService.getData().subscribe((data) => {
      this.data = data;
      this.totalRecords = this.data.length;
      this.updatePaginatedData();
    });

    const userData = localStorage.getItem('userData');
    const parseUserData = JSON.parse(userData!);
    this.rol = parseUserData.rol;
  }

  updatePaginatedData(): void {
    const filteredData = this.data.filter((post) =>
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    const startIndex = (this.currentPage - 1) * this.rows;
    this.paginatedData = filteredData.slice(startIndex, startIndex + this.rows);
    this.totalRecords = filteredData.length;
  }

 
  onPageChange(event: any): void {
    this.currentPage = event.page + 1; 
    this.updatePaginatedData(); 
  }

 
  restoreData(): void {
    this.searchTerm = ''; 
    this.updatePaginatedData(); 
  }

  createNewPost() {
    this.visible = true;
    this.formTitle = 'Nuevo post';
    this.saveButton = 'Guardar';
  
  }

  editPost(post: any) {
    this.postForm.patchValue({
      title: post.title,
      description: post.body,
      id: post.id,
    });
    this.saveButton = 'Guardar';
    this.formTitle = 'Editar post';
    this.visible = true;
  }

  getPost(post: any) {

    this.postForm.patchValue({
      title: post.title,
      description: post.body,
      id: post.id,
    });
    this.saveButton= 'Ok'
    this.formTitle = 'Ver post';
    this.visible = true;
  }

  savePost() {
    if (this.postForm.valid) {
      const postData = {
        title: this.postForm.value.title || '',
        body: this.postForm.value.description || '',
        userId: parseInt(this.postForm.value.id || '0', 10), 
      };

      if (this.postForm.value.id) {
  
        this._dataService
          .updatePost(this.postForm.value.id, postData)
          .subscribe((resp: any) => {
            this.visible = false;
            this.postForm.reset();
            this.messageService.add({
              severity: 'success',
              summary: 'Éxito',
              detail: 'Post actualizado exitosamente!',
            });
          });
      } else {
        this._dataService.createPost(postData).subscribe((resp) => {
          this.visible = false;
          this.data.push(resp)
          this.postForm.reset();
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Post creado exitosamente!',
          });
        });
      }
    }
  }
}

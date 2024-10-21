import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = environment.url;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  postData(endpoint: string, data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }

  createPost(data: { title: string; body: string; userId: number }): Observable<any> {
    return this.http.post('https://jsonplaceholder.typicode.com/posts', data, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }

  updatePost(id: string, data: any): Observable<any> {
    return this.http.put(`https://jsonplaceholder.typicode.com/posts/${id}`, data, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
  }
}

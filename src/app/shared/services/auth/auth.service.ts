import { Injectable, OnInit } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

import { BehaviorSubject, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
interface UserData {
  id: string;
  name: string;
  rol: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  [x: string]: any;
  private userSubject = new BehaviorSubject<any>(null);
  public user$: Observable<any> = this.userSubject.asObservable();
  private jsonUrl = 'assets/mock-data/user-data.json';
  private userDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  public userData$: Observable<any | null> =
    this.userDataSubject.asObservable();
  private mockData: any[] = [];

  constructor(private auth: Auth, private http: HttpClient) {}

  ngOnInit(): void {
    const storedUserId = JSON.parse(localStorage.getItem('userId')!);
  }

  private loadUserData(id: string): void {
    this.http
      .get<any[]>(this.jsonUrl)
      .pipe(
        catchError((error) => {
          console.error('Error al cargar los datos del usuario:', error);
          return [];
        })
      )
      .subscribe((data) => {
        this.mockData = data;
        const userId = id.toString();
        const userData = this.mockData.find((user) => {
          return user.id == userId;
        });
        localStorage.setItem('userData', JSON.stringify(userData));
      });
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      if (userCredential) {
        localStorage.setItem('userId', userCredential.user.uid);
        this.userSubject.next(userCredential.user);
        this.loadUserData(userCredential.user.uid);
        this.isLoggedIn()
        return userCredential.user;
      } else {
        throw new Error('No se pudo iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.userSubject.next(null);
      this.userDataSubject.next(null);
      localStorage.clear();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  getUserDataById(userId: string): any | null {
    const user = this.mockData.find((user) => user.id === userId);
    return user ? user : null;
  }
}

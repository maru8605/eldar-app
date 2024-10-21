import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from '@angular/fire/auth';

import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  user$: Observable<User | null> = this.userSubject.asObservable();
  private jsonUrl = 'assets/mock-data/user-data.json'; 
  private userDataSubject: BehaviorSubject<any | null> = new BehaviorSubject<
    any | null
  >(null);
  public userData$: Observable<any | null> =
    this.userDataSubject.asObservable();
  private mockData: any[] = []; 

  constructor(private auth: Auth, private http: HttpClient) {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
      if (user) {
        this.userDataSubject.next(user);
        localStorage.setItem('userId', JSON.stringify(user.uid)); // Guardar el userId en localStorage
      } else {
        this.userDataSubject.next(null);
        localStorage.removeItem('userId'); // Eliminar el userId de localStorage si no hay usuario
      }
    });
    this.loadUserData(); 
  }

  private loadUserData(): void {
    this.http.get<any[]>(this.jsonUrl).pipe(
      catchError((error) => {
        console.error('Error al cargar los datos del usuario:', error);
        return []; 
      })
    ).subscribe((data) => {
      console.log(data)
      this.mockData = data; 
      console.log(this.mockData)
    });
  }

  async login(email: string, password: string) {
    try {
      const userCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      console.log(userCredential);
      if (userCredential) {
        console.log(
          'user credential',
          userCredential.user,
          userCredential.user.uid
        );
        localStorage.setItem('userId', JSON.stringify(userCredential.user.uid)); // Guardar el userId en localStorage
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
      localStorage.removeItem('userId'); // Eliminar el userId de localStorage al cerrar sesión
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(
      map(user => !!user) // Devuelve true si hay un usuario autenticado
    );
  }

  getUserDataById(userId: string): any | null {
    console.log(userId)
    console.log(this.mockData)
    const user = this.mockData.find(user => user.id === userId);
    return user ? user : null; 
  }
}

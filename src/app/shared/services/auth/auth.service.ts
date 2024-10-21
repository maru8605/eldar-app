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
  private users!: UserData[];

  constructor(private auth: Auth, private http: HttpClient) {
    // onAuthStateChanged(this.auth, (user) => {
    //   this.userSubject.next(user);
    //   if (user) {
    //     this.userDataSubject.next(user);
    //     localStorage.setItem('userId', JSON.stringify(user.uid));
    //     this.userDataSubject.next(null);
    //     localStorage.removeItem('userId');
    //   }
    // });
    // const storedUserId = localStorage.getItem('userId');
    // if (storedUserId) {
    //   console.log('estoy aca', storedUserId.replace(/["']/g, ""));
    //   this.loadUserData(storedUserId);
    // }
  }

  ngOnInit(): void {
    const storedUserId = JSON.parse(localStorage.getItem('userId')!);
    console.log('inittttt', storedUserId);
  }

  private loadUserData(id: string): void {
    console.log('id', id);
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
        console.log(this.mockData);

        const userId = id.toString();
        console.log('Tipo de userId:', userId);

        const userData = this.mockData.find((user) => {
          console.log('comparo:', user.id, 'con:', userId);
          return user.id == userId;
        });

        console.log('Usuario encontrado:', userData);
        localStorage.setItem('userData', JSON.stringify(userData));
      });
  }

  async login(email: string, password: string) {
    console.log('desde auth')
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
          userCredential.user.uid,
          

        );
        localStorage.setItem('userId', userCredential.user.uid);
        //localStorage.setItem('userToken', userCredential.user.acc)
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
      console.log(this.isLoggedIn);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }

  isLoggedIn(): Observable<boolean> {
    return this.user$.pipe(map((user) => !!user));
  }

  getUserDataById(userId: string): any | null {
    console.log(userId);
    console.log(this.mockData);
    const user = this.mockData.find((user) => user.id === userId);
    return user ? user : null;
  }
}

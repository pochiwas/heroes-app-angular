import { User } from './../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environment/envinronment';
import { Observable, catchError, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(private http: HttpClient) { }

  private baseUrl = environments.baseUrl;
  private user?: User;

  get currentUser(): User | undefined {
    if (!this.user) return undefined
    return this.user
  }

  login(email: string, password: string): Observable<User> {

    return this.http.get<User>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        tap(user => localStorage.setItem('token', user.id.toString()))
      )
  }

  checkAuthentication(): Observable<Boolean> | boolean {
    //validacion de la existencia del token en el localstorage
    if (!localStorage.getItem('token')) return false;
    //obtener token desde localstorage
    const token = localStorage.getItem('token');
    //llamada del servicio de usuario
    return this.http.get<User>(`${this.baseUrl}/users/1`)
    //validacion de operadores de rxjs
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      )

  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}

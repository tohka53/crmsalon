import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Role, User } from '../models/models';
import { StorageService } from './storage.service';
import { UserService } from './user.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly _user$ = new BehaviorSubject<User | null>(null);
  readonly user$: Observable<User | null> = this._user$.asObservable();

  constructor(
    private storage: StorageService,
    private users: UserService,
    private router: Router,
  ) {
    const id = this.storage.get<string | null>('currentUserId', null);
    if (id) {
      this._user$.next(this.users.byId(id) ?? null);
    }
  }

  get currentUser(): User | null {
    return this._user$.value;
  }

  isLoggedIn(): boolean {
    return this._user$.value !== null;
  }

  hasRole(role: Role): boolean {
    return this._user$.value?.role === role;
  }

  login(email: string, password: string): User | null {
    const user = this.users.byEmail(email);
    if (user && user.password === password) {
      this.storage.set('currentUserId', user.id);
      this._user$.next(user);
      return user;
    }
    return null;
  }

  logout(): void {
    this.storage.remove('currentUserId');
    this._user$.next(null);
    this.router.navigate(['/login']);
  }

  /** Ruta inicial según el rol del usuario actual. */
  homeRoute(): string {
    const role = this.currentUser?.role;
    return role ? `/${role}` : '/login';
  }
}

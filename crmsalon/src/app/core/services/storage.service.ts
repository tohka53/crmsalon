import { Injectable } from '@angular/core';

/** Acceso de bajo nivel a localStorage con prefijo y JSON. */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly prefix = 'crmsalon.';

  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(this.prefix + key);
      return raw === null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  remove(key: string): void {
    localStorage.removeItem(this.prefix + key);
  }
}

import { Injectable } from '@angular/core';

/**
 * Acceso de bajo nivel a localStorage con prefijo y JSON.
 * Si localStorage no está disponible (Brave/Safari en modo privado,
 * almacenamiento bloqueado, etc.) usa un fallback en memoria para que
 * la app nunca falle al arrancar.
 */
@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly prefix = 'crmsalon.';
  private readonly mem = new Map<string, string>();
  private readonly hasLocalStorage = this.detectLocalStorage();

  private detectLocalStorage(): boolean {
    try {
      const k = this.prefix + '__test__';
      localStorage.setItem(k, '1');
      localStorage.removeItem(k);
      return true;
    } catch {
      return false;
    }
  }

  get<T>(key: string, fallback: T): T {
    try {
      const k = this.prefix + key;
      const raw = this.hasLocalStorage ? localStorage.getItem(k) : (this.mem.get(k) ?? null);
      return raw == null ? fallback : (JSON.parse(raw) as T);
    } catch {
      return fallback;
    }
  }

  set<T>(key: string, value: T): void {
    const k = this.prefix + key;
    const raw = JSON.stringify(value);
    try {
      if (this.hasLocalStorage) localStorage.setItem(k, raw);
      else this.mem.set(k, raw);
    } catch {
      this.mem.set(k, raw);
    }
  }

  remove(key: string): void {
    const k = this.prefix + key;
    try {
      if (this.hasLocalStorage) localStorage.removeItem(k);
      else this.mem.delete(k);
    } catch {
      this.mem.delete(k);
    }
  }
}

import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { CITAS_SEED, USERS_SEED } from '../data/seed';

/** Carga datos demo en localStorage la primera vez. */
@Injectable({ providedIn: 'root' })
export class SeedService {
  constructor(private storage: StorageService) {}

  ensureSeed(): void {
    if (this.storage.get('seeded', false)) return;
    this.reset();
  }

  /** Reinicia toda la data a los valores demo. */
  reset(): void {
    this.storage.set('users', USERS_SEED);
    this.storage.set('citas', CITAS_SEED);
    this.storage.set('seeded', true);
    this.storage.remove('currentUserId');
  }
}

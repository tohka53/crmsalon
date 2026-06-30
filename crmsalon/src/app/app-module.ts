import {
  NgModule,
  provideBrowserGlobalErrorListeners,
  provideAppInitializer,
  inject,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { SharedModule } from './shared/shared-module';
import { LayoutComponent } from './shared/layout/layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { SeedService } from './core/services/seed.service';

@NgModule({
  declarations: [App, LayoutComponent, LoginComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, SharedModule],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideAppInitializer(() => {
      try {
        inject(SeedService).ensureSeed();
      } catch {
        // el arranque nunca debe fallar por el seeding
      }
    }),
  ],
  bootstrap: [App],
})
export class AppModule {}

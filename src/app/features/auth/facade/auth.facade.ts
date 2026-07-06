import { inject, Injectable, signal, resource, computed } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '@supabase/supabase-js';

export type AuthError = 'unknown';
export type AuthState = { user?: User; loading: boolean; initializing: boolean };

@Injectable({ providedIn: 'root' })
export class AuthFacade {
  private authService = inject(AuthService);
  private onInit?: Promise<void>;
  readonly state = signal<AuthState>({ loading: false, initializing: true });

  readonly isAuthenticated = computed(() => this.state().user !== undefined);

  async initialize() {
    if (this.onInit) {
      return this.onInit;
    }
    this.onInit = (async () => {
      const { data } = await this.authService.getUser();

      this.state.update((s) => ({
        ...s,
        user: data.user ?? undefined,
      }));

      this.authService.onAuthStateChange((_event, session) => {
        this.state.update((s) => ({
          ...s,
          user: session?.user,
        }));
      });
    })();
    return this.onInit;
  }

  async login(email: string, pwd: string) {
    this.state.update((s) => ({
      ...s,
      loading: true,
    }));
    try {
      const { error } = await this.authService.login(email, pwd);
      if (error) throw error;
    } finally {
      this.state.update((s) => ({
        ...s,
        loading: false,
      }));
    }
  }
}

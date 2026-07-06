import { Component, inject } from '@angular/core';
import { AuthFacade } from './facade/auth.facade';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonDirective } from 'primeng/button';
import { Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'auth-component',
  imports: [InputTextModule, ButtonDirective, ReactiveFormsModule, PasswordModule, Toast],
  templateUrl: 'auth.component.html',
})
export class AuthComponent {
  readonly authFacade = inject(AuthFacade);
  private messageService = inject(MessageService);

  private fb = inject(FormBuilder);
  private router = inject(Router);

  readonly form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    pwd: ['', Validators.required],
  });

  async login() {
    if (this.form.invalid) {
      return;
    }

    try {
      await this.authFacade.login(this.form.value.email!, this.form.value.pwd!);
      await this.router.navigateByUrl('/');
    } catch (error) {
      this.messageService.add({
        key: 'login-error',
        severity: 'error',
        summary: 'Email ou mot de passe incorrect',
      });
    }
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../cliente/service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

onSubmit() {
  if (this.loginForm.valid) {
    this.authService.login(this.loginForm.value).subscribe({
      next: (token: string) => {
        this.authService.saveToken(token);
        console.log('token guardado', token)
        const roles = this.authService.getUserRoles();
        console.log('rol del usuario', roles)
        // Redirección según rol
        if (roles.includes('ROLE_A')) {
          this.router.navigate(['/admin/dashboard']);
        } else if (roles.includes('ROLE_C')) {
          this.router.navigate(['/cliente/index']);
        } else if (roles.includes('ROLE_R')) {
          this.router.navigate(['/repartidor/inicio']); 
        }else if (roles.includes('ROLE_V')) {
          this.router.navigate(['/vendedor']); 
        }else {
          this.router.navigate(['/login']);
        }
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas';
        console.error(err);
      }
    });
  }
}


}

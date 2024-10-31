import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider'
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, InputTextModule, PasswordModule, FormsModule, DividerModule, ToastModule, ToggleButtonModule, CheckboxModule],
  providers: [MessageService],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export default class LoginComponent {
  userNameOrEmail: string = "";
  password: string = "";
  rememberMe: boolean = false;

  constructor(
    private message: MessageService,
    private http: HttpClient,
    private router: Router) { }

  signIn() {
    if (this.userNameOrEmail.length < 3) {
      this.message.add({ severity: 'warn', summary: 'Validasyon Hatası', detail: 'Geçerli bir kullanıcı adı ya da mail adresi giriniz.' })
      return;
    }

    if (this.password.length < 6) {
      this.message.add({ severity: 'warn', summary: 'Validasyon Hatası', detail: 'Şifreniz en az 6 karakter olmalıdır.' })
      return;
    }

    this.http.post("https://localhost:7292/api/Auth/Login", { userNameOrEmail: this.userNameOrEmail, password: this.password, rememberMe: this.rememberMe })
      .subscribe({
        next: res => {
          localStorage.setItem("response", JSON.stringify(res));
          this.router.navigateByUrl("/");

        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
          switch (err.status) {
            case 400:
              this.message.add({ severity: 'error', summary: "Validation Hatası", detail: err.error.message })
              break

            case 422:
              for (let e of err.error) {
                this.message.add({ severity: 'error', summary: "Validation Hatası", detail: e })
              }
              break;
            case 0:
              this.message.add({ severity: 'error', summary: "Validation Hatası", detail: "API adresine ulaşılamıyor!Lütfen daha sonra tekrar deneyiniz!" })
              break;
          }
        }
      })
  }
}

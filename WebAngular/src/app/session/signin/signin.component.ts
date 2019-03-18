import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LoginDto } from 'src/app/dto/login.dto';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  email: string;
  password: string;

  public form: FormGroup;

  constructor(private loginService: LoginService, private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    /*this.form = this.fb.group({
      email: ['', Validators.compose ([Validators.required, CustomValidators.email])] , 
      password: ['', Validators.compose ([Validators.required])]
    });*/
  }

  onSubmit() {
    const loginDto = new LoginDto(this.email, this.password);
    this.loginService.login(loginDto).subscribe(loginResp => {
      console.log(loginResp);
      this.loginService.setLoginData(loginResp);
      this.router.navigate(['dashboard']);
    }, 
    error => {
      console.log('Error en petición de login');
    }
    );
  }
}

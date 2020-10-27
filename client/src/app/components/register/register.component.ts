import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';




@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  formRegister: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService) {
    
   }

  ngOnInit(): void {
    this.formRegister = this.formBuilder.group({
      username:  ['', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(30)])],
      email:     ['', Validators.compose([Validators.required, Validators.maxLength(30), Validators.minLength(5)])],
      password:  ['', [Validators.required, Validators.minLength(6)]],
      confirm:   ['', Validators.required]
    });
    
  }




  onRegisterSubmit() {
    const user = {
      username: this.formRegister.get('username').value,
      email: this.formRegister.get('email').value,
      password: this.formRegister.get('password').value,
    }
    
    this.authService.registerUser(user).subscribe(
        data => console.log(data),
        ( err:Error) => console.log(err))
      
    
    
  }



}

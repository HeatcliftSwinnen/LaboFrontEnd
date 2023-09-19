import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {LoginDTO} from "../LoginDTO";

@Component({
  selector: 'app-connection-form',
  templateUrl: './connection-form.component.html',
  styleUrls: ['./connection-form.component.css']
})
export class ConnectionFormComponent implements OnInit{

  loginForm! : FormGroup
  errorMessage : string = ''

  constructor(
    private authService : AuthService,
    private formbuilder : FormBuilder,
    private router : Router
  )
  {
  }
  ngOnInit(): void {
    this.loginForm=this.formbuilder.group({
      username : [null,[Validators.required,Validators.minLength(1)]],
      password : [null,[Validators.required,Validators.minLength(1)]]
    })
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginDTO: LoginDTO = this.loginForm.value;
      this.authService.login(loginDTO).subscribe({
        next:()=>{
          this.router.navigateByUrl('/home')
        },
        error:(error)=>{
          console.error('Erreur lors du login', error);
          this.errorMessage = 'Identifiant / Mot de passe incorrect';
        }
      })
    }
  }
}

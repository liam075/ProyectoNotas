import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;
  lista_usuarios : any = [];
  constructor(private fb: FormBuilder,private router: Router) {
    // Inicializamos el formulario con los controles
    this.formulario = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (localStorage.getItem('users')) {
      console.log("Existen Usuarios");
      let usuarioGuardado: any = localStorage.getItem('users');
      this.lista_usuarios = JSON.parse(usuarioGuardado);
    } else {
      alert("Por favor Registrese ");
    }
  }

  ngOnInit(): void {}

  register() {
    this.router.navigate(['/register']);
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.formulario.valid) {
      let user = this.formulario.value;
      let usuarioBuscado = this.lista_usuarios.find((usuario: any) => usuario.email === user.email && usuario.password === user.password);

      if (usuarioBuscado) {
        console.log('Usuario encontrado', usuarioBuscado);
        localStorage.setItem('usuario_logueado', JSON.stringify(usuarioBuscado));
        this.router.navigate(['/tablero']);
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } else {
      console.log('Formulario no válido');
    }
  }


  get f() {
    return this.formulario.controls;
  }
}

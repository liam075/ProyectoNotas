import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    localStorage.removeItem('pageReloaded');
    // Inicializamos el formulario con los controles
    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  ngOnInit(): void {}

  login() {
    this.router.navigate(['/login']);
  }



  // Método para enviar el formulario
  onSubmit() {
    let id = 1;
    let lista_usuarios: any = [];

    if (this.formulario.valid) {
      let user = this.formulario.value;

      // Verificar si el correo ya está registrado
      if (localStorage.getItem('users')) {
        console.log("Existen Usuarios");
        let usuarioGuardado: any = localStorage.getItem('users');
        lista_usuarios = JSON.parse(usuarioGuardado);

        // Verificar si el correo ya está en la lista
        const correoExistente = lista_usuarios.some((usuario: any) => usuario.email === user.email);

        if (correoExistente) {
          alert("Este correo ya está registrado.");
          console.log('Correo repetido');
          return; // Detener la ejecución si el correo está repetido
        }

        let user_json = {
          "id": lista_usuarios.length + 1,
          "name": user.name,
          "email": user.email,
          "password": user.password
        };
        lista_usuarios.push(user_json);
        localStorage.setItem('users', JSON.stringify(lista_usuarios));

      } else {
        let user_json = {
          "id": id,
          "name": user.name,
          "email": user.email,
          "password": user.password
        };
        lista_usuarios.push(user_json);
        localStorage.setItem('users', JSON.stringify(lista_usuarios));
        console.log('Formulario Enviado:', lista_usuarios);
      }

      this.router.navigate(['/login']);

    } else {
      alert("Por favor complete el formulario.");
      console.log('Formulario no válido');
    }
  }


  get f() {
    return this.formulario.controls;
  }
}

/*
formulario: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      agreeTerms: [false, Validators.requiredTrue],
    });
  }

  onSubmit() {
    if (this.formulario.invalid) {
      return;
    }
    console.log('Formulario enviado', this.formulario.value);
  }

  // Método de ayuda para obtener acceso más fácil a los controles
  get f() {
    return this.formulario.controls;
  }
*/

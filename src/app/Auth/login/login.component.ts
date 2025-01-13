import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  formulario: FormGroup;

  constructor(private fb: FormBuilder) {
    // Inicializamos el formulario con los controles
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  // Método para enviar el formulario
  onSubmit() {
    if (this.formulario.valid) {
      console.log('Formulario Enviado:', this.formulario.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}

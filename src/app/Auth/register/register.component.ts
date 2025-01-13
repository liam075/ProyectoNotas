import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  formulario: FormGroup;

  constructor(private fb: FormBuilder,private router: Router) {
    // Inicializamos el formulario con los controles
    this.formulario = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  login() {
    this.router.navigate(['/login']);
  }

  // Método para enviar el formulario
  onSubmit() {
    if (this.formulario.valid) {
      console.log('Formulario Enviado:', this.formulario.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}

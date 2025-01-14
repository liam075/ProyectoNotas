import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-home',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  formulario: FormGroup;
  constructor(private fb: FormBuilder,private router: Router) {
    // Inicializamos el formulario con los controles
    this.formulario = this.fb.group({
      titulo: ['', [Validators.required]],
      subtitulo: ['', [Validators.required]],
      image :  ['', [Validators.required]],
    });

  }
  ngOnInit(): void {}

  onSubmit() {
    console.log(" Voy a Enviar ");
  }
}

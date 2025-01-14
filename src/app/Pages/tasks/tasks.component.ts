import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  formulario: FormGroup;
  isModalVisible = false;
  constructor(private fb: FormBuilder,private router: Router) {
    this.formulario = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      image :  ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
      
  }

  openModal(id:number) {
    
  }

  onSubmit() {
    // let id = 1;
    // let lista_tablero: any = [];
    // if (this.formulario.valid) {
    //   let tablero = this.formulario.value;
    //   if (localStorage.getItem('tablero')) { 
    //     let tableroGuardado: any = localStorage.getItem('tablero');
    //     lista_tablero = JSON.parse(tableroGuardado);
    //     let tablero_json = {
    //       'id' : lista_tablero.length + 1,
    //       'title' : tablero.title,
    //       'subtitle' : tablero.subtitle,
    //       'image' : tablero.image
    //     };
    //     lista_tablero.push(tablero_json);
    //     localStorage.setItem('tablero', JSON.stringify(lista_tablero));
    //     location.reload();
    //   } else {
    //     let tablero_json = {
    //       'id' : id,
    //       'title' : tablero.title,
    //       'subtitle' : tablero.subtitle,
    //       'image' : tablero.image
    //     };
    //     lista_tablero.push(tablero_json);
    //     localStorage.setItem('tablero', JSON.stringify(lista_tablero));
    //     location.reload();
    //   }
      
    // } else {
    //   alert(" Introduzca Todos los Datos Correspondiente ");
    // }
  }
}

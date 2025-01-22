import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $: any;

declare function InfoCreaTablero(): void;
@Component({
  selector: 'app-home',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  formulario: FormGroup;
  recargar : Boolean;
  lista_tableros :any = [];
  categoria_tareas : any = [];
  constructor(private fb: FormBuilder,private router: Router) {
    this.recargar = false;
    // Inicializamos el formulario con los controles
    this.formulario = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      image :  ['', [Validators.required]],
    });

    if (localStorage.getItem('tablero')) {
        let tablero : any= localStorage.getItem('tablero');
        this.lista_tableros = JSON.parse(tablero);
        console.log("------------- lista Tablero ",this.lista_tableros);
    } else {
        InfoCreaTablero();
    }

    this.categoria_tareas = [
      {
        'id' : '1',
        'name' : 'Lista de Tareas'
      },
      {
        'id' : '2',
        'name' : 'Hacer'
      },
      {
        'id' : '3',
        'name' : 'En Progreso'
      },
      {
        'id' : '4',
        'name' : 'Terminado'
      }
    ];
    console.log("Categoria Tareas ", this.categoria_tareas);
    localStorage.setItem('lista_categorias', JSON.stringify(this.categoria_tareas));




  }
  ngOnInit(): void {
    if (!localStorage.getItem('pageReloaded')) {
      // Si no, recarga la página
      location.reload();
      this.recargar = true
      // Marca la página como recargada
      localStorage.setItem('pageReloaded', `${this.recargar}`);
    } else {
      // Si ya fue recargada, muestra un mensaje o realiza otra acción
      console.log("La página ya fue recargada.");
    }
  }

  editTablero(id: number): void {
    $('#modal-edit').modal('show');
    let tableroFiltrado = this.lista_tableros.filter((tablero : any )=> tablero.id === id);
    console.log("$$$$$ Tablero  Filtrada ",tableroFiltrado);
  }

  closeModal() {
    $('#modal-edit').modal('hide');
  }

  onSubmit() {
    let id = 1;
    let lista_tablero: any = [];
    if (this.formulario.valid) {
      let tablero = this.formulario.value;
      if (localStorage.getItem('tablero')) {
        let tableroGuardado: any = localStorage.getItem('tablero');
        lista_tablero = JSON.parse(tableroGuardado);
        let tablero_json = {
          'id' : lista_tablero.length + 1,
          'title' : tablero.title,
          'subtitle' : tablero.subtitle,
          'image' : tablero.image,
          'id_user' : id
        };
        lista_tablero.push(tablero_json);
        localStorage.setItem('tablero', JSON.stringify(lista_tablero));
        location.reload();
      } else {
        let tablero_json = {
          'id' : id,
          'title' : tablero.title,
          'subtitle' : tablero.subtitle,
          'image' : tablero.image,
          'id_user' : id
        };
        lista_tablero.push(tablero_json);
        localStorage.setItem('tablero', JSON.stringify(lista_tablero));
        location.reload();
      }

    } else {
      alert(" Introduzca Todos los Datos Correspondiente ");
    }
  }


}

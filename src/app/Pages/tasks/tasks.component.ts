import { Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tasks',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit{
  formulario_lista: FormGroup;
  formulario_hacer : FormGroup;
  formulario_progreso : FormGroup;
  formulario_terminado : FormGroup;
  itemId: number | null = null; // Variable para guardar el ID
  isModalVisible = true;
  id : number;


  constructor(private fb: FormBuilder,private router: Router , private activatedroute :ActivatedRoute) {
    this.formulario_lista = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
    });

    this.formulario_hacer = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
    });

    this.formulario_progreso = this.fb.group({

      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],

    });

    this.formulario_terminado = this.fb.group({

      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],

    });
    let params  = this.activatedroute.snapshot.params;
    this.id = params['id'];
  }


  ngOnInit(): void {

  }

  openModal(id:number) {
    console.log(" Open Modal ",id);
    //this.itemId = id;
    this.isModalVisible = true;
  }

  onSubmitLista() {
    let id_tasks = 1;
    let lista_tareas : any = [];
    if (this.formulario_lista.valid) {
      let tablero = this.formulario_lista.value;
      if (localStorage.getItem('tareas')) {
        let tareasGuardado: any = localStorage.getItem('tareas');
        lista_tareas = JSON.parse(tareasGuardado);
        let tarea_json = {
          'id' : lista_tareas.length + 1,
          'tablero_id' : this.id,
          'categoria_id' : 1,
          'title': tablero.title,
          'subtitle' : tablero.subtitle,
        }
        lista_tareas.push(tarea_json);
        localStorage.setItem('tareas', JSON.stringify(lista_tareas));
        location.reload();

      } else {

        let tarea_json = {
          'id' : id_tasks,
          'tablero_id' : this.id,
          'categoria_id' : 1,
          'title': tablero.title,
          'subtitle' : tablero.subtitle,
        }
        lista_tareas.push(tarea_json);
        console.log(" Tablero ", lista_tareas);
        localStorage.setItem('tareas', JSON.stringify(lista_tareas));
        location.reload();
      }


    } else {
      alert(" Por favor introduzca todos los Datos correspondientes ");
    }

  }

  onSubmitHacer() {
    if (this.formulario_lista.valid) {
      let tablero = this.formulario_lista.value;

      console.log(" Tablero ", tablero);

    }

  }

  onSubmitProgreso() {
    if (this.formulario_lista.valid) {
      let tablero = this.formulario_lista.value;

      console.log(" Tablero ", tablero);

    }

  }

  onSubmitTermiando() {
    if (this.formulario_lista.valid) {
      let tablero = this.formulario_lista.value;

      console.log(" Tablero ", tablero);

    }

  }
}

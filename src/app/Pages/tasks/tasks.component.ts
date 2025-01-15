import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-tasks',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit,AfterViewInit {
  formulario_lista: FormGroup;
  formulario_hacer : FormGroup;
  formulario_progreso : FormGroup;
  formulario_terminado : FormGroup;
  itemId: number | null = null; // Variable para guardar el ID
  isModalVisible = false;
  id : number;
  lista_tareas :any = [];

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
    if (localStorage.getItem('tareas')) {

      let tareasGuardado: any = localStorage.getItem('tareas');
      let tareas = JSON.parse(tareasGuardado);
      let tarea_filtrada = tareas.find((tarea : any) => tarea.tablero_id === this.id);
      console.log(" Tarea Filtrada " , tarea_filtrada);
      // if(tarea_filtrada){
      //   console.log(" Tarea Filtrada " , tarea_filtrada)
      //  // this.formulario_lista.patchValue({title: tarea_filtrada.title, subtitle: tarea_filtrada.subtitle });
      // }
    }
  }

  ngAfterViewInit() {
    // Usamos jQuery para inicializar cualquier cosa relacionada con el modal
    this.setupModal();
  }

  setupModal() {
   // var Swal:any;

    // Abre el modal cuando se hace clic en el botón
    $('#openModal').click(() => {
      console.log(" Intentando Abrir Modal");
      $('#modal-edit').modal('show');; // Usamos fadeIn para mostrar el modal con una animación
    });

    // // Cierra el modal cuando se hace clic en el fondo o el botón de cerrar
    // $('#myModal').click((event) => {
    //   if ($(event.target).is('#myModal')) {  // Verificamos si el clic es en el fondo (no en el contenido)
    //     $('#myModal').fadeOut();  // Usamos fadeOut para cerrar el modal con una animación
    //   }
    // });

    // $('#closeModal').click(() => {
    //   $('#myModal').fadeOut(); // Cierra el modal cuando se hace clic en el botón de cerrar
    // });
  }

  openModal(id:number) {
    console.log(" Open Modal ",id);
    //this.itemId = id;
    this.isModalVisible = true;
    console.log(" isModalVisible ", this.isModalVisible)
  }

  closeModal() {
    this.isModalVisible = false;
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

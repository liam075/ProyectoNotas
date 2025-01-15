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
  lista_hacer : any = [];
  lista_progreso : any = [];
  lista_terminado : any = [];
  category_id : number;


  constructor(private fb: FormBuilder,private router: Router , private activatedroute :ActivatedRoute) {
    this.formulario_lista = this.fb.group({
      category_id : [''],
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
    this.category_id = 1;

  }

  buscartareas(lista_tareas : any , id : number) {
    let lista_filtrada : any = [];
    lista_tareas.forEach((element: any) => {
      if (element.tablero_id === id) {
        lista_filtrada.push(element);
      }
    });
    return lista_filtrada;
  }

  filtrartareascategoria(tareas : any) {
    let lista_tareas : any = [];
    let lista_hacer : any = [];
    let lista_progreso : any = [];
    let lista_terminado : any = [];
    if (tareas.length > 0) {
      tareas.forEach((element:any) => {
        switch(element.categoria_id) {
          case 1 : 
            lista_tareas.push(element);
          break;
          case 2 :
            lista_hacer.push(element);
          break;
          case 3 :
            lista_progreso.push(element);
          break;
          case 4 :
            lista_terminado.push(element);
          break;
          default :
            lista_tareas.push(element);
          break;
        }
      });

      this.lista_tareas = lista_tareas;
      this.lista_hacer = lista_hacer;
      this.lista_progreso = lista_progreso;
      this.lista_terminado = lista_terminado;



    }
  }


  ngOnInit(): void {
    if (localStorage.getItem('tareas')) {

      let tareasGuardado: any = localStorage.getItem('tareas');
      let tareas = JSON.parse(tareasGuardado);
      let tarea_filtrada = this.buscartareas(tareas,this.id);
      if (tarea_filtrada.length !== 0) {
        console.log("El array no está vacío");
        console.log(" Tarea Filtrada " , tarea_filtrada);
        this.filtrartareascategoria(tarea_filtrada);
      }
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
    this.category_id = id;
    $('#modal-lista').modal('show');
    $('#category_id').val(id);
    //this.itemId = id;
    //this.isModalVisible = true;
    //console.log(" isModalVisible ", this.isModalVisible)
  }

  closeModal() {
    $('#modal-lista').modal('hide');
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
          'categoria_id' : this.category_id,
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
          'categoria_id' : this.category_id,
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
          'categoria_id' : 2,
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
          'categoria_id' : 2,
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

  onSubmitProgreso() {
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
          'categoria_id' : 3,
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
          'categoria_id' : 3,
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

  onSubmitTermiando() {
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
          'categoria_id' : 4,
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
          'categoria_id' : 4,
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
}

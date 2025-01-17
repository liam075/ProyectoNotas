import {  Component, OnInit } from '@angular/core';
import { CanActivate, Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, Form , FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-tasks',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule , CommonModule, FormsModule ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnInit {
  formulario_lista: FormGroup;
  formulario_edit : FormGroup;
  itemId: number | null = null; // Variable para guardar el ID
  isModalVisible = false;
  id : number;
  lista_completa_tareas : any = [];
  lista_tareas :any = [];
  lista_hacer : any = [];
  lista_progreso : any = [];
  lista_terminado : any = [];
  category_id : number;
  lista_categoria : any = [];
  categoriaSeleccionada = 2;


  constructor(private fb: FormBuilder,private router: Router , private activatedroute :ActivatedRoute) {
    this.formulario_lista = this.fb.group({
      category_id : [''],
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
    });

    this.formulario_edit = this.fb.group({
      Edit_taskid : [''],
      Edit_category_id : [''],
      Edit_title: [''],
      Edit_subtitle: [''],
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
      console.log( " Lista Terminado ", this.lista_terminado);



    }
  }


  ngOnInit(): void {
    if (this.ValidarTareas()) {

      let tareasGuardado: any = localStorage.getItem('tareas');
      let tareas = JSON.parse(tareasGuardado);
      this.lista_completa_tareas = tareas;
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

      if (this.ValidarCategorias()) {
        let categoriaGuardado: any = localStorage.getItem('lista_categorias');
        this.lista_categoria = JSON.parse(categoriaGuardado);
        console.log(" lista Categoria " , this.lista_categoria);
      }


    }
  }





  editModal(id : number) {


    console.log(" Intentando Abrir Modal Edit ");
    $('#modal-edit').modal('show');
    $('#taskid').val(id);
    let tareaFiltrada = this.lista_completa_tareas.filter((tarea : any )=> tarea.id === id);
    console.log("tarea filtrada buscada editar ",tareaFiltrada);
    $('#titleEdit').val(tareaFiltrada[0]['title']);
    $('#subtitleEdit').val(tareaFiltrada[0]['subtitle']);
    this.categoriaSeleccionada = tareaFiltrada[0]['categoria_id'];





    // // Cierra el modal cuando se hace clic en el fondo o el botón de cerrar

  }

  openModal(id:number) {
    console.log(" Open Modal ",id);
    this.category_id = id;
    $('#modal-create').modal('show');
    $('#category_id').val(id);
    //this.itemId = id;
    //this.isModalVisible = true;
    //console.log(" isModalVisible ", this.isModalVisible)
  }

  closeModal() {
    $('#modal-create').modal('hide');
  }

  closeModalEdit() {
    $('#modal-edit').modal('hide');
  }

  deleteTask(id:number) {
    if (confirm("Quieres eliminar este registro?")) {

    }
  }

  ValidarTareas() {
    if (localStorage.getItem('tareas')) {
      return true;
    } else {
      return false;
    }
  }


  ValidarCategorias() {
      if (localStorage.getItem('lista_categorias')) {
      return true;
    } else {
      return false;
    }
  }
  onSubmitLista() {
    let id_tasks = 1;
    let lista_tareas : any = [];
    if (this.formulario_lista.valid) {
      let tablero = this.formulario_lista.value;
      if (this.ValidarTareas()) {
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

  buscarposiciontarea(lista_tareas : any,id : number) : any {
    let indice : number = 0 ;
    if (lista_tareas.length > 0) {
      for (let i=0 ; i < lista_tareas.length ; i++) {
        if (lista_tareas[i].id === id) {
          indice = i;
        }
      }

    }
    return indice;
  }
  onSubmitEdit() {
   let id=  $('#taskid').val();
    let lista_tareas : any = [];
    if (this.formulario_edit.valid) {
      let formulario = this.formulario_edit.value;
      if (this.ValidarTareas()) {
        let tareasGuardado: any = localStorage.getItem('tareas');
        lista_tareas = JSON.parse(tareasGuardado);
        console.log(" formulario de tareas a actualizar -- ", lista_tareas[0].title);
        let posicion : any = this.buscarposiciontarea(lista_tareas,id);
        console.log(" Posiscion ", posicion);
        lista_tareas[posicion].title = $("#titleEdit").val();
        lista_tareas[posicion].subtitle = $("#subtitleEdit").val();
        lista_tareas[posicion].categoria_id = Number($("#categoryEdit").val());
        console.log(" Lista Tarea Actualizada ", lista_tareas);
        localStorage.setItem('tareas', JSON.stringify(lista_tareas));
        location.reload();

      }
    } else {
      alert(" Por favor introduzca todos los Datos correspondientes ");
    }



  }





}

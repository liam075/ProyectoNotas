import { Component, OnInit } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
declare var $: any;

declare function InfoCreaTablero(): void;
declare function TableroCreadoCorrectamente(): void;

declare function TableroEditadoCorrectamente(): void;
@Component({
  selector: 'app-home',
  standalone: true, // Indica que es un componente standalone
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  formulario: FormGroup;
  formularioEdit: FormGroup;
  recargar : Boolean;
  lista_tableros :any = [];
  categoria_tareas : any = [];
  lista_imagen : any = [];
  constructor(private fb: FormBuilder,private router: Router) {
    this.recargar = false;
    this.formulario = this.fb.group({
      title: ['', [Validators.required]],
      subtitle: ['', [Validators.required]],
      image :  ['', [Validators.required]],
    });

    this.formularioEdit = this.fb.group({
      tableroid : [''],
      title: [''],
      subtitle: [''],
      image :  [''],
    });

    if (localStorage.getItem('tablero')) {
        let tablero : any= localStorage.getItem('tablero');
        this.lista_tableros = JSON.parse(tablero);
        console.log("------------- lista Tablero ",this.lista_tableros);
    } else {
        InfoCreaTablero();
    }

    this.lista_imagen = [
      {
        "id": 1,
        "image": "/assets/dist/img/photo1.png",
      },
      {
        "id": 2,
        "image": "/assets/dist/img/photo2.png",
      },
      {
        "id": 3,
        "image": "/assets/dist/img/photo3.png",
      },
      {
        "id": 4,
        "image": "/assets/dist/img/photo4.jpg",
      }
    ];


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
      location.reload();
      this.recargar = true
      localStorage.setItem('pageReloaded', `${this.recargar}`);
    } else {
      console.log("La página ya fue recargada.");
    }
  }

  editTablero(id: number): void {
    $('#modal-edit').modal('show');
    let tableroFiltrado = this.lista_tableros.filter((tablero : any )=> tablero.id === id);
    console.log("$$$$$ Tablero  Filtrada ",tableroFiltrado);
    $('#tableroid').val(tableroFiltrado[0].id);
    $('#Edittitle').val(tableroFiltrado[0].title);
    $('#Editsubtitle').val(tableroFiltrado[0].subtitle);
    $('#Editimage').val(tableroFiltrado[0].image);
  }

  closeModal() {
    $('#modal-edit').modal('hide');
  }
  //El Submit para Crear el Tablero
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
        TableroCreadoCorrectamente();
        setTimeout(() => {
          location.reload();
        }, 2000);
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
        TableroCreadoCorrectamente();
        setTimeout(() => {

          location.reload();
        }, 2000);
      }

    } else {
      alert(" Introduzca Todos los Datos Correspondiente ");
    }
  }

  irTareas(id: number): void {
    this.router.navigate(['tablero/tareas/', id]);
  }
  ValidarTableros() {
    if (localStorage.getItem('tablero')) {
      return true;
    } else {
      return false;
    }
  }

  buscarPosicionTablero(lista_tablero: any[], id: number): number | null {
    const indice = lista_tablero.findIndex(tablero => tablero.id === id);
    return indice !== -1 ? indice : null;
  }

  //El Submit para Editar el Tablero
  onSubmitEdit() {
    let id=  Number($('#tableroid').val());
    let lista_tablero: any = [];
    if (this.formularioEdit.valid) {
      // Obtener los valores del formulario
      const tablero = this.formularioEdit.value;
      if (this.ValidarTableros()) {
        // Obtener el arreglo de tableros almacenados en localStorage

        let  tableroGuardado : any = localStorage.getItem('tablero');
        lista_tablero = JSON.parse(tableroGuardado);
        let posicion : any = this.buscarPosicionTablero(lista_tablero,id);
        if (posicion!== null) {
          console.log("Posicion ", posicion);

        }
      }

    } else {
      // Mostrar alerta si faltan datos
      alert("Introduzca todos los datos correspondientes");
    }
  }



}

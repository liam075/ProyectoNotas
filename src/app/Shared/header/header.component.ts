import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nombre_usuario = ""
  constructor() {
    if (localStorage.getItem('usuario_logueado')) {
      let usuario : any = localStorage.getItem('usuario_logueado');
      let user : any = JSON.parse(usuario);
      this.nombre_usuario = user.name;
    } else {
      this.nombre_usuario = "Administrador";
      console.log(this.nombre_usuario)

    }
  }
}

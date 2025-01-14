import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nombre_usuario = "Administrador"
  constructor() {
    if (localStorage.getItem('usuario_logueado')) {
      let usuario : any = localStorage.getItem('usuario_logueado');
      let user  = JSON.parse(usuario);
      this.nombre_usuario = user.name;
    }
  }
}

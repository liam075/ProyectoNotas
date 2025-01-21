import { Component } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
declare function CerrarSesion(): void;
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  nombre_usuario = "";
  mostrar_tareas = false;
  isActive = false;
  constructor(private router: Router) {
    if (localStorage.getItem('usuario_logueado')) {
      let usuario : any = localStorage.getItem('usuario_logueado');
      let user : any = JSON.parse(usuario);
      this.nombre_usuario = user.name;
    } else {
      this.nombre_usuario = "Administrador";
      console.log(this.nombre_usuario)

    }

    if (localStorage.getItem('users')) {
      console.log("Existen Usuarios");
    } else {
      alert("Por favor Registrese ");
      this.router.navigate(['/register']);
    }

    if (localStorage.getItem('tablero')) {
      console.log("Existen tableros");
      this.mostrar_tareas = true;
    } else {
      this.mostrar_tareas = false;
      alert("Por favor cree un tablero ");
    //  this.router.navigate(['/tablero']);
    }
  }



  setActive() {
    this.isActive = !this.isActive;
  }

  logout() {
    localStorage.removeItem('usuario_logueado');
    localStorage.removeItem('pageReloaded');
    CerrarSesion();
    setTimeout(() => {

      this.router.navigate(['/login']);
    }, 1000);
  }
}

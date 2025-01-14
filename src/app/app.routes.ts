import { Routes } from '@angular/router';
import { LoginComponent } from './Auth/login/login.component';
import { RegisterComponent } from './Auth/register/register.component';
import { PagesComponent } from './Pages/pages.component';
import { HomeComponent } from './Pages/home/home.component';
import { PagenotfoundComponent } from './Pages/pagenotfound/pagenotfound.component';
import { TasksComponent } from './Pages/tasks/tasks.component';
import { UsersComponent } from './Pages/users/users.component';

export const routes: Routes = [
  { path : '', component : RegisterComponent },
  { path : 'login', component : LoginComponent} ,
  { path : 'register', component : RegisterComponent},
  { path : 'tablero', component:PagesComponent, children :[
    {path : '' , component: HomeComponent},
    {path : 'tareas/:id' , component: TasksComponent},
    {path : 'users' , component: UsersComponent},
    //Error 404
    { path : '404' , component: PagenotfoundComponent},
    { path : '**', redirectTo: '/404', pathMatch: 'full'},
  ] },
];

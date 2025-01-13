import { Component } from '@angular/core';
import { HeaderComponent } from "../Shared/header/header.component";
import { FooterComponent } from "../Shared/footer/footer.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-pages',
  imports: [RouterOutlet,HeaderComponent, FooterComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.css'
})
export class PagesComponent {

}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-layouts',
  standalone: true,
  imports: [CommonModule, MenubarModule, RouterOutlet, InputTextModule,ButtonModule],
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.css'
})
export class LayoutsComponent implements OnInit {
  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Ana Sayfa',
        icon: 'pi pi-fw pi-home',
        routerLink:"/"
      }
    ];
  }
  logout(){
    alert("Çıkış yapıldı!")
  }
}

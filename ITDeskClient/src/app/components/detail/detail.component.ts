import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule,CardModule,ButtonModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css'
})
export default class DetailComponent {
header:string="Taner with Ahmet"
}

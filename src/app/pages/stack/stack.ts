import { Component } from '@angular/core';
import { HeaderComponent } from '../../layout/header/header';

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './stack.html',
  styleUrl: './stack.css'
})
export class StackComponent {}

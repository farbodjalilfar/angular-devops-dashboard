import { Component } from '@angular/core';
import { LayoutComponent } from './layout/layout/layout';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent],
  template: `<app-layout></app-layout>`
})
export class App {}

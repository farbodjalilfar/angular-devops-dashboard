import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-skeleton',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './skeleton.html',
    styleUrl: './skeleton.css'
})
export class SkeletonComponent {
    @Input() width = '100%';
    @Input() height = '16px';
    @Input() shape: 'rect' | 'circle' = 'rect';
}

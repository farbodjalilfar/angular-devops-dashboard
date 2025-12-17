import { Component, inject } from '@angular/core';
import { StatCardComponent } from '../../components/stat-card/stat-card';
import { DashboardStatsService } from '../../services/dashboard-stats.service';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [StatCardComponent],
  templateUrl: './overview.html',
  styleUrl: './overview.css'
})
export class OverviewComponent {
  private readonly statsService = inject(DashboardStatsService);
  readonly stats = this.statsService.stats;
}

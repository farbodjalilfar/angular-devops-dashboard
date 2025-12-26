import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubService } from '../../services/github.service';
import { SettingsService } from '../../services/settings.service';
import { SkeletonComponent } from '../../components/skeleton/skeleton';

interface StackItem {
  name: string;
  description: string;
  logo: string;
}

@Component({
  selector: 'app-stack',
  standalone: true,
  imports: [CommonModule, SkeletonComponent],
  templateUrl: './stack.html',
  styleUrl: './stack.css'
})
export class StackComponent implements OnInit {
  private readonly github = inject(GithubService);
  private readonly settings = inject(SettingsService);

  readonly languages = signal<{ name: string; count: number; logo: string }[]>([]);
  readonly loading = signal(true);

  readonly backendStack: StackItem[] = [
    { name: 'Spring Boot', description: 'REST API layer', logo: 'https://cdn.simpleicons.org/springboot' },
    { name: 'GitHub API', description: 'Repository & workflow data', logo: 'https://cdn.simpleicons.org/github' },
    { name: 'DTOs', description: 'Clean API contracts', logo: 'https://cdn.simpleicons.org/json' }
  ];

  readonly devOpsStack: StackItem[] = [
    { name: 'GitHub', description: 'Source control', logo: 'https://cdn.simpleicons.org/github' },
    { name: 'Docker', description: 'Containerized backend', logo: 'https://cdn.simpleicons.org/docker' },
    { name: 'CI/CD', description: 'Automated workflows', logo: 'https://cdn.simpleicons.org/githubactions' }
  ];

  ngOnInit() {
    const name = this.settings.settings().githubName;
    this.github.getLanguages(name).subscribe({
      next: (stats) => {
        const sorted = Object.entries(stats)
          .map(([name, count]) => ({
            name,
            count,
            logo: this.getLogoUrl(name)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 4);
        this.languages.set(sorted);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  private getLogoUrl(language: string): string {
    const map: Record<string, string> = {
      'TypeScript': 'typescript',
      'JavaScript': 'javascript',
      'HTML': 'html5',
      'CSS': 'css3',
      'SCSS': 'sass',
      'Python': 'python',
      'Java': 'openjdk',
      'C++': 'cplusplus',
      'C#': 'csharp',
      'Go': 'go',
      'Rust': 'rust',
      'PHP': 'php',
      'Ruby': 'ruby',
      'Shell': 'gnubash',
      'Jupyter Notebook': 'jupyter'
    };
    const slug = map[language] || language.toLowerCase();
    return `https://cdn.simpleicons.org/${slug}`;
  }
}

import { Component, input } from '@angular/core';

export type StatTheme = 'blue' | 'green' | 'purple' | 'amber';

@Component({
  selector: 'app-stats-card',
  standalone: true,
  templateUrl: './stats-card.html',
  styleUrl: './stats-card.scss',
})
export class StatsCard {
  title = input.required<string>();
  value = input.required<number>();
  theme = input<StatTheme>('blue');
  label = input<string>('');
}

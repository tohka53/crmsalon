import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-star-rating',
  standalone: false,
  template: `
    <div class="inline-flex items-center gap-0.5">
      <button
        *ngFor="let s of stars"
        type="button"
        (click)="select(s)"
        [disabled]="readonly"
        [class.cursor-default]="readonly"
        [class.hover:scale-110]="!readonly"
        class="leading-none focus:outline-none transition-transform"
        [class.text-2xl]="size === 'lg'"
        [class.text-base]="size !== 'lg'"
      >
        <span [class.text-amber-400]="s <= value" [class.text-slate-300]="s > value">★</span>
      </button>
      <span *ngIf="showValue && value > 0" class="ml-1 text-sm text-slate-500">{{ value }}/5</span>
    </div>
  `,
})
export class StarRatingComponent {
  @Input() value = 0;
  @Input() readonly = false;
  @Input() showValue = false;
  @Input() size: 'sm' | 'lg' = 'sm';
  @Output() valueChange = new EventEmitter<number>();

  stars = [1, 2, 3, 4, 5];

  select(s: number): void {
    if (this.readonly) return;
    this.value = s;
    this.valueChange.emit(s);
  }
}

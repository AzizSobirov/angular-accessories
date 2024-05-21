import { NgForOf } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent {
  @Input() categories: string[] = [];
  @Input() priceRange: { min: number; max: number; value: number } = {
    min: 0,
    max: 0,
    value: 0,
  };
  @Input() ratingRange: { min: number; max: number; value: number } = {
    min: 0,
    max: 0,
    value: 0,
  };

  @Output() priceChange = new EventEmitter<number>();
  @Output() ratingChange = new EventEmitter<number>();
  @Output() categoryChange = new EventEmitter<string>();
  @Output() nameChange = new EventEmitter<string>();

  onPriceChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.priceChange.emit(Number(value));
  }

  onRatingChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.ratingChange.emit(Number(value));
  }

  onCategoryChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.categoryChange.emit(value);
  }

  onNameChange(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.nameChange.emit(value);
  }
}

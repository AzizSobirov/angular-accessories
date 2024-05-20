import { NgForOf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss',
})
export class FilterComponent implements OnInit {
  @Input() categories: string[] = [];
  @Input() priceRange: { min: number; max: number; value: number } = {
    min: 0,
    max: 0,
    value: 0,
  };
  // @Output() filterChange = new EventEmitter<any>();

  // filterForm: any;

  // constructor(private fb: FormBuilder) {
  //   this.filterForm = this.fb.group({
  //     search: [''],
  //     category: [''],
  //     maxPrice: [0],
  //   });
  // }

  ngOnInit(): void {
    //   this.filterForm.get('maxPrice').setValue(this.priceRange.max);
    //   this.filterForm.valueChanges.subscribe((values: any) => {
    //     this.filterChange.emit(values);
    //   });
  }
}

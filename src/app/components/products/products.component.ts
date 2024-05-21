import { Component, Input } from '@angular/core';
import { NgForOf } from '@angular/common';
import { Product } from '../../../types';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [NgForOf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  @Input() products: Product[] = [];
}

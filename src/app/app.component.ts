import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FilterComponent } from './components/filter/filter.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductService } from './services/product.service';
import { Product, Products } from '../types';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FilterComponent, ProductsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-accessories';

  products: Product[] = [];
  filteredProducts: Product[] = [];
  categories: string[] = [];
  priceRange = { min: 0, max: 2000, value: 0 };
  ratingRange = { min: 1, max: 5, value: 1 };

  private selectedCategory = 'All';
  private searchName = '';

  constructor(private productService: ProductService) {}

  getStarsArray(rating: number): boolean[] {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < Math.round(rating));
    }
    return stars;
  }

  fetchProducts() {
    this.productService
      .getProducts('https://dummyjson.com/products?limit=50')
      .subscribe({
        next: (data: Products) => {
          data.products = data.products.map((product) => {
            return {
              ...product,
              image: product.images[0],
              stars: this.getStarsArray(product.rating),
            };
          });

          this.products = data.products;
          this.filteredProducts = data.products;

          data.products.forEach((product) => {
            if (!this.categories.includes(product.category)) {
              this.categories.push(product.category);
            }
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  filterProducts() {
    this.filteredProducts = this.productService.filterProducts(this.products, {
      priceRange: this.priceRange,
      ratingRange: this.ratingRange,
      selectedCategory: this.selectedCategory,
      searchName: this.searchName,
    });
  }

  onPriceChange(value: number) {
    this.priceRange.value = value;
    this.filterProducts();
  }

  onRatingChange(value: number) {
    this.ratingRange.value = value;
    this.filterProducts();
  }

  onCategoryChange(value: string) {
    this.selectedCategory = value;
    this.filterProducts();
  }

  onNameChange(value: string) {
    this.searchName = value;
    this.filterProducts();
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
}

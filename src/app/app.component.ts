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
  priceRange = { min: 0, max: 0, value: 0 };
  ratingRange = { min: 1, max: 5, value: 0 };

  constructor(private productService: ProductService) {}

  fetchProducts() {
    this.productService
      .getProducts('https://dummyjson.com/products?limit=50')
      .subscribe({
        next: (data: Products) => {
          this.products = data.products;
          this.filteredProducts = data.products;
          data.products.forEach((product) => {
            if (this.priceRange.max < product.price) {
              this.priceRange.max = product.price;
            }
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

  ngOnInit(): void {
    this.fetchProducts();
    // this.productService.getProducts().subscribe((products) => {
    //   this.products = products;
    //   this.filteredProducts = products;
    //   this.categories = this.productService.getCategories(products);
    //   this.priceRange = this.productService.getPriceRange(products);
    // });
  }

  // onFilterChange(filters: any): void {
  // this.filteredProducts = this.productService.filterProducts(
  //   this.products,
  //   filters.search,
  //   filters.category,
  //   filters.maxPrice
  // );
  // }
}

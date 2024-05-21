import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Products, Product } from '../../types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private apiService: ApiService) {}

  // Getting products from the API
  getProducts = (url: string): Observable<Products> => {
    return this.apiService.get(url, {
      responseType: 'json',
    });
  };

  filterProducts(products: Product[], filter: any): Product[] {
    return products.filter((product) => {
      const matchesPrice = product.price >= filter.priceRange.value;
      const matchesRating =
        Math.round(product.rating) >= filter.ratingRange.value;
      const matchesCategory =
        filter.selectedCategory === 'All' ||
        product.category === filter.selectedCategory;
      const matchesName = product.title
        .toLowerCase()
        .includes(filter.searchName.toLowerCase());

      return matchesPrice && matchesRating && matchesCategory && matchesName;
    });
  }
}

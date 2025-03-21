import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductComponent } from '../../components/product/product.component';
import { FilterComponent } from '../../components/filter/filter.component';
import { CommonModule } from '@angular/common';
import { FilteredProductsService } from '../../services/filtered-products.service';
@Component({
  selector: 'app-page1',
  imports: [ProductComponent, FilterComponent, CommonModule],
  templateUrl: './page1.component.html',
  styleUrl: './page1.component.scss'
})
export class Page1Component implements OnInit {

  onPage = 12;
  filteredProducts = inject(FilteredProductsService);
  page = signal(1);

  changePage(page: number) {
    this.filteredProducts.currentPage.set(page);
    this.filteredProducts.updateFilters();
  }

  constructor() {
    this.filteredProducts.updateFilters();
  }

  ngOnInit() {
    this.page = this.filteredProducts.currentPage;
  }


}

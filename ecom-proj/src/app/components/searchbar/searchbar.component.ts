import { Component, inject, signal } from '@angular/core';
import { FilteredProductsService } from '../../services/filtered-products.service';

@Component({
  selector: 'app-searchbar',
  imports: [],
  templateUrl: './searchbar.component.html',
  styleUrl: './searchbar.component.scss'
})
export class SearchbarComponent {
  searchedText = signal('');
  filteredProductsService = inject(FilteredProductsService);
  
  search(event:Event): void {
    event.preventDefault();
    this.filteredProductsService.searchedText = this.searchedText();
    this.filteredProductsService.updateFilters();
  }

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchedText.set(input.value);
  }

}

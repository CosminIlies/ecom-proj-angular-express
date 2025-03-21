import { Component, inject, input, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilteredProductsService } from '../../services/filtered-products.service';
import { FilterModel } from '../../model/FilterModel';

@Component({
  selector: 'app-filter',
  imports: [CommonModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent implements OnInit{



  title = input<string>("");
  options = input<string[]>([])
  isVisible = true;

  filteredProductsService = inject(FilteredProductsService);
  usedFilters = signal(new Array<FilterModel>());
  usedFilterModel = signal<FilterModel>({ name: '', values: [] });

  ngOnInit(): void {
    const filterModel = this.filteredProductsService.appliedFilters.find((filter) => filter.name === this.title());
    if(filterModel) {
      this.usedFilterModel.set(filterModel);
    }else{
      this.usedFilterModel.set({name: this.title(), values: []});
      this.filteredProductsService.appliedFilters.push(this.usedFilterModel());
    }
  }

  hasFilter(val: string): boolean {
    return this.usedFilterModel().values.includes(val);
  }

  deleteFilter(val: string) {
    this.usedFilterModel().values = this.usedFilterModel().values.filter((value) => value !== val);
    this.filteredProductsService.updateFilters();
  }

  addFilter(val: string){
    this.usedFilterModel().values.push(val);
    this.filteredProductsService.updateFilters();
  }


  useFilter(val: string) {    
    if(this.hasFilter(val)) {
      this.deleteFilter(val);
    }else{
      this.addFilter(val);
    }
    console.log(this.usedFilterModel());
  }
}

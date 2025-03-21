import { Injectable, signal } from '@angular/core';
import { FilterModel } from '../model/FilterModel';
import { ProductModel } from '../model/ProductModel';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilteredProductsService {

  searchedText = '';
  currentPage = signal(1);
  appliedFilters = new Array<FilterModel>();
  products = new Array<ProductModel>();

  constructor(private http: HttpClient) {}


  clearSearchedText(){
    this.searchedText = '';
    this.updateFilters();
  }

  updateFilters(){
    const baseUrl = 'http://localhost:3000/api/products';

    let filtersParam = '';

    this.appliedFilters.forEach((filter) => {
      
      let valuesStr = '';
      
      filter.values.forEach((value) => {
        valuesStr += `${value},`;
      })

      if(valuesStr.length > 0){
        valuesStr = valuesStr.substring(0, valuesStr.length - 1);
        filtersParam += `&${filter.name}=${valuesStr}`;
      }

    })

    const search = this.searchedText ? `?search=${this.searchedText}` : '?';
    const page = `&page=${this.currentPage()-1}`;


    this.products = [];
    console.log(baseUrl + search + page + filtersParam);

    const url = baseUrl + search + page + filtersParam;
    this.http.get<ProductModel[]>(url).subscribe((products) => {
      this.products = products;
    })

  }

}

import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProductService } from '../../services/product.service';
import { ProductModel } from '../../model/ProductModel';

@Component({
  selector: 'app-page2',
  imports: [],
  templateUrl: './page2.component.html',
  styleUrl: './page2.component.scss'
})
export class Page2Component implements OnInit {
  productId: string | null = '';

  productService = inject(ProductService);
  product: ProductModel = {id:'', name:'', description:'', image:'', price:0}; 
  
  constructor(private route: ActivatedRoute, private location: Location) {}

  ngOnInit() {
    this.productId = this.route.snapshot.paramMap.get('id'); // Get the 'id' parameter
    console.log('Product ID:', this.productId);
    this.productService.getProducts(this.productId!).subscribe((product) => {
      this.product = product;
    });
  }

  goBack(){
    this.location.back();
  }

}

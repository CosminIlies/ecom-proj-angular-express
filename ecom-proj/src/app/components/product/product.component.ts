import { Component, Input } from '@angular/core';
import { ProductModel } from '../../model/ProductModel';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-product',
  imports: [RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product?: ProductModel;
}

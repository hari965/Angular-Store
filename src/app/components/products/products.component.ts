import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { ApiServiceService } from '../../services/api-service.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public productList: any;
  public filterCategory: any;
  searchKey: string = '';
  products: any;
  constructor(
    private api: ApiServiceService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.api.getProduct().subscribe((res) => {
      this.productList = res;
      this.filterCategory = res;
      this.productList.forEach((a: any) => {
        if (
          a.category === "women's clothing" ||
          a.category === "men's clothing"
        ) {
          a.category = 'fashion';
        }
        Object.assign(a, { quantity: 1, total: a.price });
      });
      console.log(this.productList);
    });

    this.cartService.search.subscribe((val: any) => {
      this.searchKey = val;
    });
  }
  getProductById(id: number): void {
    this.cartService.getProductById(id).subscribe({
      next: (product) => (this.products = product),
    });
  }
  addtocart(item: any) {
    this.cartService.addtoCart(item);
  }
  onBack() {}
  filter(category: string) {
    this.filterCategory = this.productList.filter((a: any) => {
      if (a.category == category || category == '') {
        return a;
      }
    });
  }
}

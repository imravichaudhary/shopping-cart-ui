import {Component, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';
import {RestService} from '../../services/rest.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {User} from '../../model/user.model';
import {Cart} from '../../model/cart.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  private product$: Observable<Product>;
  private user: User;
  private quantity = 1;
  private message = '';

  constructor(public restService: RestService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.product$ = this.restService.getProduct(this.route.snapshot.paramMap.get('id'));
    this.getUserInformation();
  }

  addToCart(product: Product) {
    this.restService.addProductToCart(this.user.id, {productId: product.id, quantity: this.quantity} as Cart)
      .subscribe(res => {
        this.message = 'Product added to cart';
        console.log(res);
      }, (err) => {
        this.message = 'Failed to add the product to cart';
        console.log(err);
      });
  }

  getUserInformation() {
    // TODO: call rest service for retrieving user information
    this.user = {
      id: 'user1',
      name: 'Ravi Chaudhary',
      email: 'ravi7131@yahoo.com',
    } as User;
  }

}

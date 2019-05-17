import {Component, OnInit} from '@angular/core';
import { RestService} from '../../services/rest.service';
import {Product} from '../../model/product.model';
import {Observable} from 'rxjs';
import {Cart} from '../../model/cart.model';
import {User} from '../../model/user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  private products$: Observable<Product[]>;
  private user: User = null;

  constructor(private restService: RestService, private router: Router) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.products$ = this.restService.getProducts();
  }

  productClick(product: Product) {
    this.router.navigate(['/product/' + product.id]);
  }

}

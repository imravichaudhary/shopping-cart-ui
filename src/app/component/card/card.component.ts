import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../model/product.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Product;

  constructor() { }

  ngOnInit() {
  }

}

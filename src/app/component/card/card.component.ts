import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Product} from '../../model/product.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() card: Product;

  @Output() click: EventEmitter<Product> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  buttonClick(event?: any) {
    this.click.emit(this.card);
  }
}

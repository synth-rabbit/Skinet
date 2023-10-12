import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Pagination } from './shared/models/pagination';
import { Product } from './shared/models/product';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Skinet';

  constructor(private basketService: BasketService) {}

  ngOnInit(): void {
    const basketId = localStorage.getItem('basket_id');

    if (basketId) this.basketService.getBasket(basketId);
  }
}

import { Component } from '@angular/core';
import { BasketService } from 'src/app/basket/basket.service';
import { BasketItem } from 'src/app/shared/models/basket';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  isProd: boolean;

  constructor(public basketService: BasketService){
    this.isProd = environment.production;
  }

  getBasketCount(items: BasketItem[]): number {

    return items.reduce((prev, next) => prev + next.quantity, 0);
  }
}

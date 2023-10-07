import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Product } from '../shared/models/product';
import { ShopService } from './shop.service';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shopParams';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  @ViewChild('search') searchTerm?: ElementRef;
  products: Product[] = [];
  productBrands: ProductBrand[] = [];
  productTypes: ProductType[] = [];
  shopParams = new ShopParams();
  sortOptions = [
    {name: 'Alphabetical', value: 'name'},
    {name: 'Price: Low to high', value: 'priceAsc'},
    {name: 'Price: High to low', value: 'priceDesc'}
  ];
  totalCount = 0;


  constructor(private shopService: ShopService){}
  ngOnInit(): void {
    this.getProducts();
    this.getProductBrands();
    this.getProductTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams).subscribe({
      next: (response)=> {
        this.products = response.data;
        this.shopParams.pageNumber = response.pageIndex;
        this.shopParams.pageSize = response.pageSize;
        this.totalCount = response.count;
      },
      error: (error)=> { console.log(error); },
    });
  }

  getProductBrands(){
    this.shopService.getProductBrands().subscribe({
      next: (response)=> {
        this.productBrands = [{id: 0, name: 'All'}, ...response];
      },
      error: (error)=> { console.log(error); },
    });
  }

  getProductTypes(){
    this.shopService.getProductTypes().subscribe({
      next: (response)=> {
        this.productTypes = [{id: 0, name: 'All'}, ...response];
      },
      error: (error)=> { console.log(error); },
    });
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(event: Event){
    console.log(event);
    const target = event.target as HTMLSelectElement;
    this.shopParams.sort = target.value;
    this.getProducts();
  }

  onPageChanged(event: PageChangedEvent){
    if(this.shopParams.pageNumber !== event.page) {
      this.shopParams.pageNumber = event.page;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm?.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    if (this.searchTerm) this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}

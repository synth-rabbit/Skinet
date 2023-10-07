import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Pagination } from '../shared/models/pagination';
import { Product } from '../shared/models/product';
import { ProductBrand } from '../shared/models/product-brand';
import { ProductType } from '../shared/models/product-type';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {
  baseUrl = 'https://localhost:5001/api';

  constructor(private http: HttpClient) { }

  getProducts(shopParams: ShopParams) {
    let params = new HttpParams();
    const { brandId, typeId, search, sort, pageNumber, pageSize } = shopParams;

    if(brandId > 0) params = params.append('brandId', brandId);
    if(typeId > 0) params = params.append('typeId', typeId);
    if(search) params = params.append('search', search)
    params = params.append('pageSize', pageSize);
    params = params.append('pageIndex', pageNumber);
    params = params.append('sort', sort);

    return this.http.get<Pagination<Product[]>>(`${this.baseUrl}/products`, { params });
  }

  getProductBrands() {
    return this.http.get<ProductBrand[]>(`${this.baseUrl}/products/brands`);
  }

  getProductTypes() {
    return this.http.get<ProductType[]>(`${this.baseUrl}/products/types`);
  }
}

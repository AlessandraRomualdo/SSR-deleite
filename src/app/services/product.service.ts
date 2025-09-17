import { Injectable } from '@angular/core';
import { createClient } from '@supabase/supabase-js'
import { environment } from '../../environments/environment.development';
import { Product } from '../interfaces/product';
import { from, Observable } from 'rxjs';

export const supabase = createClient(
  environment.supabaseUrl, 
  environment.supabaseKey,
  { auth: 
    { 
      persistSession: false,
      autoRefreshToken: false
    } 
  } 
);

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  getProducts(): Observable<Product[]> {
    return from(
      supabase.from('products').select('*')
      .then(({ data: products, error}) => {
        if (error) {
          throw new Error(error.message);
        } else {
          return products || [];
        }
      })
    )
  }

  getProductsById(id: number): Observable<Product> {
    return from(
      supabase.from('products').select('*')
      .eq('id', id)
      .single()
      .then(({ data: product, error}) => {
        if (error) {
          throw new Error(error.message);
        } else {
          return product;
        }
      })
    )
  }

}

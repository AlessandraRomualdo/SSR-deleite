import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

import { catchError, Observable, of } from 'rxjs';
import { Product } from '../../interfaces/product';
import { ProductService } from '../../services/product.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";
import { AppShellRenderDirective } from '../../directives/app-shell-render.directive';
import { AppShellNoRenderDirective } from '../../directives/app-shell-no-render.directive';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIcon,
    RouterLink,
    MatProgressSpinner,
    AppShellRenderDirective,
    AppShellNoRenderDirective 
],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent {
  quantities: number[] = [1, 2, 3, 4, 5];
  product$!: Observable<Product | null>;

  private route: ActivatedRoute = inject(ActivatedRoute);
  private productService: ProductService = inject(ProductService);


  ngOnInit(): void {
    const productId = parseInt(this.route.snapshot.paramMap.get('id') ?? '0', 10);
    this.product$ = this.productService.getProductsById(productId).pipe(
      catchError( error => {
        console.error(error);
        return of(null);
      })
    )
  }
}

import { ResolveFn } from '@angular/router';
import { Product } from './interfaces/product';
import { inject } from '@angular/core';
import { ProductService } from './services/product.service';


// o resolver busca os dados do produto antes de carregar o componente de detalhes do produto
// garantindo que os dados estejam disponíveis imediatamente
// quando o componente for renderizado
// isso melhora a experiência do usuário e o SEO
export const productResolver: ResolveFn<Product> = (route, state) => {
  const productService = inject(ProductService);
  const productId = parseInt(route.paramMap.get('id') ?? '0', 10);

  return productService.getProductsById(productId);
};

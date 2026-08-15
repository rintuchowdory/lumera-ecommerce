export type CatalogProduct = { name: string; category: string; price: number; popularity: number; newest: number };
export type CatalogSort = 'recommended' | 'price-low' | 'price-high' | 'newest';

export function filterAndSortProducts(products: CatalogProduct[], search: string, category: string, sort: CatalogSort) {
  return products
    .filter(product => (category === 'All' || product.category === category) && product.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => sort === 'price-low' ? a.price - b.price : sort === 'price-high' ? b.price - a.price : sort === 'newest' ? b.newest - a.newest : b.popularity - a.popularity);
}

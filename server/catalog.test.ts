import { describe, expect, it } from 'vitest';
import { filterAndSortProducts } from '../shared/catalog';

const products = [
  { name: 'Clarity Serum', category: 'Skincare', price: 42, popularity: 98, newest: 3 },
  { name: 'Cloud Cream', category: 'Skincare', price: 38, popularity: 94, newest: 2 },
  { name: 'Silk Wash', category: 'Body Care', price: 28, popularity: 82, newest: 6 },
];

describe('Luméra catalog helpers', () => {
  it('searches by keyword', () => expect(filterAndSortProducts(products, 'serum', 'All', 'recommended').map(p => p.name)).toEqual(['Clarity Serum']));
  it('filters by category', () => expect(filterAndSortProducts(products, '', 'Body Care', 'recommended').map(p => p.name)).toEqual(['Silk Wash']));
  it('sorts by price ascending', () => expect(filterAndSortProducts(products, '', 'All', 'price-low').map(p => p.price)).toEqual([28, 38, 42]));
});

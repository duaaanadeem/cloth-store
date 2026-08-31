'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../../components/ProductCard';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('query') || '';
  const urlGender = searchParams.get('gender') || '';

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [searchVal, setSearchVal] = useState(urlQuery);

  const categories = ['NEW', 'SHIRTS', 'POLO SHIRTS', 'SHORTS', 'T-SHIRTS', 'JEANS'];
  const sizes = ['XS', 'S', 'M', 'L', 'XL', '2X'];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((p) => {
      if (searchVal && !p.name.toLowerCase().includes(searchVal.toLowerCase()) && !p.category.toLowerCase().includes(searchVal.toLowerCase())) {
        return false;
      }
      if (urlGender && p.gender !== urlGender) return false;
      if (selectedSize && !p.sizes.includes(selectedSize)) return false;
      if (selectedCategory && selectedCategory !== 'NEW' && p.type !== selectedCategory) return false;
      if (inStockOnly && !p.inStock) return false;
      return true;
    });
  }, [searchVal, urlGender, selectedSize, selectedCategory, inStockOnly]);

  return (
    <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '3.5rem', alignItems: 'start' }}>
      {/* FILTER SIDEBAR */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px' }}>Filters</h2>
        <div>
          <label style={{ fontSize: '12px', marginBottom: '0.35rem', display: 'block' }}>Size</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.25rem' }}>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                style={{
                  padding: '0.4rem 0',
                  textAlign: 'center',
                  background: selectedSize === size ? 'var(--text-dark)' : 'transparent',
                  color: selectedSize === size ? 'var(--white)' : 'var(--text-dark)',
                  border: '1px solid var(--border-color)',
                  fontSize: '10px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          <span style={{ fontWeight: '700', fontSize: '12px' }}>Availability ^</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '12px', marginTop: '0.75rem' }}>
            <label style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}>
              <span style={{ display: 'flex', gap: '0.5rem' }}>
                <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
                Availability
              </span>
              <span style={{ color: 'var(--accent-blue)', fontWeight: '700' }}>(450)</span>
            </label>
          </div>
        </div>
      </aside>

      {/* CATALOG MAIN */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Home / <span style={{ color: 'var(--text-dark)', fontWeight: '700' }}>Products</span></p>
          <h1 className="hero-heavy-title" style={{ fontSize: '28px', marginTop: '0.25rem' }}>PRODUCTS</h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#c4c4c4',
              padding: '0 1rem',
              height: '40px',
              width: '280px'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="search"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              placeholder="Search"
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '12px', textAlign: 'right', width: '100%' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
                style={{
                  border: '1px solid var(--border-color)',
                  padding: '0.4rem 0.6rem',
                  fontSize: '10px',
                  fontWeight: '700',
                  background: selectedCategory === cat ? 'var(--text-dark)' : 'transparent',
                  color: selectedCategory === cat ? 'var(--white)' : 'var(--text-dark)',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.75rem' }}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} height={310} />
          ))}
        </div>
      </section>
    </div>
  );
}
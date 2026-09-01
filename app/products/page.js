'use client';

import React, { useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../../components/ProductCard';

function ProductsContent() {
  const searchParams = useSearchParams();
  const urlQuery = searchParams.get('query') || '';
  const urlGender = searchParams.get('gender') || '';
  const urlCategory = searchParams.get('category') || '';

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(urlCategory || '');
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

  const clearAllFilters = () => {
    setSelectedSize('');
    setSelectedCategory('');
    setInStockOnly(false);
    setSearchVal('');
  };

  return (
    <div style={{ marginTop: '2.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '3.5rem', alignItems: 'start', maxWidth: '1240px', margin: '2.5rem auto 0 auto' }}>
      {/* FILTER SIDEBAR */}
      <aside style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '240px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '1px' }}>Filters</h2>
        <div>
          <label style={{ fontSize: '12px', marginBottom: '0.35rem', display: 'block' }}>Size</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.25rem' }}>
            {sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(selectedSize === size ? '' : size)}
                className="btn-hover"
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
              <span style={{ color: 'var(--accent-blue)', fontWeight: '700' }}>({PRODUCTS.filter(p => p.inStock).length})</span>
            </label>
          </div>
        </div>

        {(selectedSize || selectedCategory || inStockOnly || searchVal) && (
          <button
            onClick={clearAllFilters}
            className="btn-hover"
            style={{
              padding: '0.6rem 1rem',
              backgroundColor: '#121212',
              color: '#ffffff',
              border: 'none',
              fontSize: '11px',
              fontWeight: '700',
              cursor: 'pointer',
              letterSpacing: '1px',
              textTransform: 'uppercase'
            }}
          >
            Reset Filters
          </button>
        )}
      </aside>

      {/* CATALOG MAIN */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', gridColumn: 'span 3' }}>
        <div>
          <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Home / <span style={{ color: 'var(--text-dark)', fontWeight: '700' }}>Products</span></p>
          <h1 className="bold-header" style={{ fontSize: '28px', marginTop: '0.25rem' }}>PRODUCTS</h1>
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
                className="btn-hover"
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

        {/* Empty state when category or search returns 0 products */}
        {filteredProducts.length === 0 ? (
          <div
            style={{
              padding: '4rem 2rem',
              backgroundColor: '#ffffff',
              border: '1px solid #e0e0e0',
              textAlign: 'center',
              margin: '1rem 0'
            }}
          >
            <div className="diamond-logo" style={{ margin: '0 auto 1.5rem auto' }} />
            <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '24px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              No Products Found
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              There are currently no items matching {selectedCategory ? `category "${selectedCategory}"` : 'your filters'}.
            </p>
            <button
              onClick={clearAllFilters}
              className="btn-hover"
              style={{
                padding: '0.75rem 1.75rem',
                backgroundColor: '#121212',
                color: '#ffffff',
                border: 'none',
                fontWeight: '700',
                fontSize: '11px',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer'
              }}
            >
              View All Products
            </button>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.75rem' }}>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} height={310} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<div style={{ padding: '2rem', textAlign: 'center', fontSize: '13px' }}>Loading products...</div>}>
      <ProductsContent />
    </Suspense>
  );
}
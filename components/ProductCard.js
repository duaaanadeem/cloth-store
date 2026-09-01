'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';

export default function ProductCard({ product, height = 340 }) {
  const { addToCart, toggleWishlist, wishlist } = useStore();
  const isWished = wishlist.includes(product.id);

  return (
    <article className="card-hover" style={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}>
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: `${height}px`,
          backgroundColor: '#ffffff',
          overflow: 'hidden',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
        }}
      >
        <Link href={`/product/${product.id}`} style={{ width: '100%', height: '100%', display: 'block', overflow: 'hidden' }}>
          <img
            className="img-hover"
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </Link>

        {/* Heart Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product.id)}
          className="btn-hover"
          aria-label="Save to Favourites"
          style={{
            position: 'absolute',
            top: '0.75rem',
            right: '0.75rem',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.92)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isWished ? '#ff3b30' : 'none'} stroke="#121212" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Quick Add Button */}
        <button
          onClick={() => addToCart(product, product.sizes[0], product.colors[0], 1)}
          className="btn-hover"
          aria-label="Quick Add to Bag"
          style={{
            position: 'absolute',
            bottom: '0.75rem',
            right: '0.75rem',
            width: '28px',
            height: '28px',
            background: '#121212',
            color: '#fff',
            border: 'none',
            fontSize: '18px',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer'
          }}
        >
          +
        </button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: '0.65rem' }}>
        <div>
          <span style={{ fontSize: '11px', color: '#777777', fontWeight: '500' }}>
            {product.category}
          </span>
          <h3 style={{ fontSize: '13px', fontWeight: '700', marginTop: '0.15rem' }}>
            <Link href={`/product/${product.id}`} className="btn-hover">{product.name}</Link>
          </h3>
        </div>
        <span style={{ fontSize: '14px', fontWeight: '800' }}>${product.price}</span>
      </div>
    </article>
  );
}
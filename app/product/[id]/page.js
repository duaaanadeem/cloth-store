'use client';

import React, { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { PRODUCTS } from '../../../data/products';
import { useStore } from '../../../context/StoreContext';

export default function ProductDetailPage() {
  const { id } = useParams();
  const product = PRODUCTS.find((p) => p.id === id);

  if (!product) return notFound();

  const { addToCart, toggleWishlist, wishlist } = useStore();
  const [selectedImg, setSelectedImg] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '#121212');

  const isWished = wishlist.includes(product.id);

  return (
    <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2.5rem', alignItems: 'start', flexWrap: 'wrap' }}>
      {/* Main Image */}
      <div style={{ width: '420px', height: '480px', backgroundColor: 'var(--white)', overflow: 'hidden' }}>
        <img src={selectedImg} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>

      {/* Thumbnails */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
        {product.images.map((imgSrc, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedImg(imgSrc)}
            style={{
              width: '60px',
              height: '75px',
              backgroundColor: 'var(--white)',
              border: selectedImg === imgSrc ? '1px solid var(--text-dark)' : '1px solid transparent',
              cursor: 'pointer',
              overflow: 'hidden',
              opacity: selectedImg === imgSrc ? 1 : 0.6
            }}
          >
            <img src={imgSrc} alt="Thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </button>
        ))}
      </div>

      {/* Product Detail Card */}
      <div style={{ width: '330px', backgroundColor: '#f5f5f5', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem', border: '1px solid var(--border-subtle)', position: 'relative' }}>
        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Favorite"
          style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer' }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isWished ? '#ff3b30' : 'none'} stroke="var(--text-dark)" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <div>
          <h1 style={{ fontSize: '14px', fontWeight: '800', letterSpacing: '0.5px', textTransform: 'uppercase' }}>{product.name}</h1>
          <p style={{ fontSize: '15px', fontWeight: '700', marginTop: '0.25rem' }}>${product.price}</p>
          <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>MRP incl. of all taxes</span>
        </div>

        <p style={{ fontSize: '12px', color: 'var(--text-dark)', lineHeight: '1.5' }}>{product.description}</p>

        {/* Colors */}
        <div>
          <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>Color</label>
          <div style={{ display: 'flex', gap: '0.4rem', marginTop: '0.4rem' }}>
            {product.colors.map((hex) => (
              <button
                key={hex}
                onClick={() => setSelectedColor(hex)}
                style={{
                  width: '20px',
                  height: '20px',
                  backgroundColor: hex,
                  border: selectedColor === hex ? '1px solid var(--text-dark)' : '1px solid var(--border-color)',
                  cursor: 'pointer'
                }}
              />
            ))}
          </div>
        </div>

        {/* Sizes */}
        <div>
          <label style={{ fontSize: '11px', fontWeight: '700', color: 'var(--text-muted)' }}>Size</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '0.25rem', marginTop: '0.4rem' }}>
            {['XS', 'S', 'M', 'L', 'XL', '2X'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                style={{
                  padding: '0.35rem 0',
                  border: selectedSize === size ? '1px solid var(--text-dark)' : '1px solid var(--border-color)',
                  background: selectedSize === size ? 'var(--text-dark)' : '#fff',
                  color: selectedSize === size ? '#fff' : 'var(--text-dark)',
                  fontSize: '10px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => addToCart(product, selectedSize, selectedColor, 1)}
          style={{
            backgroundColor: '#c8c8c8',
            color: 'var(--text-dark)',
            border: 'none',
            fontWeight: '700',
            fontSize: '12px',
            padding: '0.75rem',
            textAlign: 'center',
            cursor: 'pointer',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            width: '100%',
            marginTop: '0.5rem'
          }}
        >
          ADD
        </button>
      </div>
    </div>
  );
}
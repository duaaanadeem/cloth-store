'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PRODUCTS } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function HomePage() {
  const router = useRouter();
  const [sliderIndex, setSliderIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Hero showcase pair matching Figma
  const heroSlidePairs = [
    {
      left: PRODUCTS.find((p) => p.id === 'prod-1') || PRODUCTS[0],
      right: PRODUCTS.find((p) => p.id === 'prod-6') || PRODUCTS[5]
    },
    {
      left: PRODUCTS.find((p) => p.id === 'prod-7') || PRODUCTS[6],
      right: PRODUCTS.find((p) => p.id === 'prod-3') || PRODUCTS[2]
    }
  ];

  const currentPair = heroSlidePairs[sliderIndex % heroSlidePairs.length];

  const nextSlide = () => {
    setSliderIndex((prev) => (prev + 1) % heroSlidePairs.length);
  };

  const prevSlide = () => {
    setSliderIndex((prev) => (prev === 0 ? heroSlidePairs.length - 1 : prev - 1));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  const weeklyProducts = [
    PRODUCTS.find((p) => p.id === 'prod-12') || PRODUCTS[11],
    PRODUCTS.find((p) => p.id === 'prod-2') || PRODUCTS[1],
    PRODUCTS.find((p) => p.id === 'prod-10') || PRODUCTS[9],
    PRODUCTS.find((p) => p.id === 'prod-9') || PRODUCTS[8]
  ];

  const xivProducts = activeCategory === 'ALL'
    ? [
        PRODUCTS.find((p) => p.id === 'prod-7') || PRODUCTS[6],
        PRODUCTS.find((p) => p.id === 'prod-1') || PRODUCTS[0],
        PRODUCTS.find((p) => p.id === 'prod-8') || PRODUCTS[7]
      ]
    : PRODUCTS.filter((p) => p.gender === activeCategory).slice(0, 3);

  return (
    <div style={{ maxWidth: '1140px', margin: '0 auto' }}>
      {/* 1. Sub-nav Links */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.15rem',
          width: '75px',
          marginTop: '0.5rem',
          marginBottom: '1.25rem'
        }}
      >
        <Link href="/products?gender=MEN" style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '1px', color: 'var(--text-dark)' }}>
          MEN
        </Link>
        <Link href="/products?gender=WOMEN" style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '1px', color: 'var(--text-dark)' }}>
          WOMEN
        </Link>
        <Link href="/products?gender=KIDS" style={{ fontSize: '13px', fontWeight: '700', letterSpacing: '1px', color: 'var(--text-dark)' }}>
          KIDS
        </Link>
      </div>

      {/* 2. Search Input */}
      <form
        onSubmit={handleSearchSubmit}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: '#c8c8c8',
          padding: '0 1.25rem',
          width: '320px',
          maxWidth: '100%',
          height: '42px',
          marginBottom: '3.5rem'
        }}
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#222" strokeWidth="2.5">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search"
          style={{
            border: 'none',
            background: 'transparent',
            outline: 'none',
            fontSize: '13px',
            fontWeight: '500',
            color: 'var(--text-dark)',
            textAlign: 'right',
            width: '100%'
          }}
        />
      </form>

      {/* 3. HERO SHOWCASE: Explicit 338px | 366px | 366px */}
      <section
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '24px',
          width: '100%'
        }}
      >
        {/* Left Column: 338px Wide */}
        <div
          style={{
            width: '338px',
            minWidth: '338px',
            height: '376px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div>
            {/* Title Container: Exactly 338 x 80px */}
            <div style={{ width: '338px', height: '80px', display: 'flex', alignItems: 'center' }}>
              <h1 className="hero-heading-exact">
                NEW<br />COLLECTION
              </h1>
            </div>

            {/* Subtitle Container: Exactly 87 x 48px */}
            <div style={{ width: '87px', height: '48px', marginTop: '1rem' }}>
              <p style={{ fontSize: '15px', fontWeight: '500', lineHeight: '1.25', color: 'var(--text-dark)', margin: 0 }}>
                Summer<br />2024
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Link
              href="/products"
              style={{
                width: '235px',
                height: '42px',
                backgroundColor: '#c8c8c8',
                color: 'var(--text-dark)',
                fontWeight: '700',
                fontSize: '13px',
                padding: '0 1.25rem',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <span>Go To Shop</span>
              <svg width="26" height="12" viewBox="0 0 32 16" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="1" y1="8" x2="30" y2="8" />
                <polyline points="23 1 30 8 23 15" />
              </svg>
            </Link>

            <div style={{ display: 'flex', gap: '0.35rem' }}>
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                style={{
                  width: '34px',
                  height: '42px',
                  border: '1px solid #b5b5b5',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700'
                }}
              >
                &lt;
              </button>
              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                style={{
                  width: '34px',
                  height: '42px',
                  border: '1px solid #b5b5b5',
                  background: 'transparent',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '13px',
                  fontWeight: '700'
                }}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* Center Showcase: Exactly 366 x 376px */}
        <div
          style={{
            width: '366px',
            minWidth: '366px',
            height: '376px',
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            overflow: 'hidden'
          }}
        >
          <Link href={`/product/${currentPair.left.id}`}>
            <img
              src={currentPair.left.image}
              alt={currentPair.left.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Link>
        </div>

        {/* Right Showcase: Exactly 366 x 376px */}
        <div
          style={{
            width: '366px',
            minWidth: '366px',
            height: '376px',
            backgroundColor: '#ffffff',
            border: '1px solid #e0e0e0',
            overflow: 'hidden'
          }}
        >
          <Link href={`/product/${currentPair.right.id}`}>
            <img
              src={currentPair.right.image}
              alt={currentPair.right.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </Link>
        </div>
      </section>

      {/* 4. NEW THIS WEEK */}
      <section style={{ marginTop: '7rem' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
            <h2 className="bold-header">NEW<br />THIS WEEK</h2>
            <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--accent-blue)' }}>(50)</span>
          </div>
          <Link href="/products" style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)' }}>
            See All
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
          {weeklyProducts.map((p) => (
            <ProductCard key={p.id} product={p} height={310} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.35rem', marginTop: '2.5rem' }}>
          <button style={{ width: '34px', height: '38px', border: '1px solid #b5b5b5', background: 'transparent', cursor: 'pointer' }}>&lt;</button>
          <button style={{ width: '34px', height: '38px', border: '1px solid #b5b5b5', background: 'transparent', cursor: 'pointer' }}>&gt;</button>
        </div>
      </section>

      {/* 5. XIV COLLECTIONS 23-24 */}
      <section style={{ marginTop: '7rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="bold-header">
            XIV<br />COLLECTIONS<br />23-24
          </h2>

          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              borderBottom: '1px solid #b8b8b8',
              paddingBottom: '0.75rem',
              marginTop: '1.5rem'
            }}
          >
            <div style={{ display: 'flex', gap: '1.5rem', fontSize: '13px', fontWeight: '700' }}>
              {['ALL', 'Men', 'Women', 'KID'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat.toUpperCase())}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    fontSize: '13px',
                    fontWeight: activeCategory === cat.toUpperCase() ? '800' : '500',
                    color: activeCategory === cat.toUpperCase() ? 'var(--text-dark)' : 'var(--text-muted)',
                    textDecoration: activeCategory === cat.toUpperCase() ? 'underline' : 'none',
                    padding: 0
                  }}
                >
                  ({cat})
                </button>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '2.5rem', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span style={{ cursor: 'pointer' }}>Filters(+)</span>
              <div style={{ textAlign: 'right' }}>
                <span>Sorts(-)</span><br />
                <span>Less to more / More to Less</span>
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {xivProducts.map((p) => (
            <ProductCard key={p.id} product={p} height={370} />
          ))}
        </div>

        <Link
          href="/products"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '2.5rem', cursor: 'pointer' }}
        >
          <span style={{ fontSize: '12px', fontWeight: '600', color: 'var(--text-muted)' }}>More</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </Link>
      </section>

      {/* 6. EDITORIAL SECTION */}
      <section id="about" style={{ marginTop: '8rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '42px', fontWeight: '400', letterSpacing: '2px', textTransform: 'uppercase', maxWidth: '900px' }}>
          OUR APPROACH TO FASHION DESIGN
        </h2>
        <p style={{ maxWidth: '680px', fontSize: '14px', color: 'var(--text-dark)', marginTop: '1.5rem', lineHeight: '1.6' }}>
          at elegant vogue , we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time each design is meticulously crafted, ensuring the highest quality exquisite finish
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 270px)', gap: '1.5rem', justifyContent: 'center', width: '100%', marginTop: '3.5rem' }}>
          <figure style={{ width: '270px', height: '390px', border: '1px solid #e0e0e0', overflow: 'hidden', backgroundColor: '#fff' }}>
            <img src="/assets/images/product4.jpg" alt="Look 1" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </figure>

          <figure style={{ width: '270px', height: '420px', border: '1px solid #e0e0e0', overflow: 'hidden', marginTop: '70px', backgroundColor: '#fff' }}>
            <img src="/assets/images/product5.jpg" alt="Look 2" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </figure>

          <figure style={{ width: '270px', height: '410px', border: '1px solid #e0e0e0', overflow: 'hidden', marginTop: '10px', backgroundColor: '#fff' }}>
            <img src="/assets/images/product1.jpg" alt="Look 3" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </figure>

          <figure style={{ width: '270px', height: '390px', border: '1px solid #e0e0e0', overflow: 'hidden', marginTop: '90px', backgroundColor: '#fff' }}>
            <img src="/assets/images/product11.jpg" alt="Look 4" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          </figure>
        </div>
      </section>
    </div>
  );
}
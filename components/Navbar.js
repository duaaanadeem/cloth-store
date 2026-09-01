'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '../context/StoreContext';

export default function Navbar() {
  const { cartCount, wishlist } = useStore();

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto 2.5rem auto'
      }}
    >
      {/* Left Menu */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.25rem' }}>
        <Link
          href="/products"
          aria-label="Menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0
          }}
        >
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <line x1="1" y1="2" x2="23" y2="2" />
            <line x1="1" y1="8" x2="17" y2="8" />
            <line x1="1" y1="14" x2="11" y2="14" />
          </svg>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <Link href="/" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)' }}>
            Home
          </Link>
          <Link href="/products" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)' }}>
            Collections
          </Link>
          <Link href="/products?category=NEW" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-dark)' }}>
            New
          </Link>
        </nav>
      </div>

      {/* Center: Diamond Logo */}
      <Link
        href="/"
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)'
        }}
        aria-label="Brand Home"
      >
        <div className="diamond-logo" />
      </Link>

      {/* Right Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {/* Wishlist Circle */}
        <Link
          href="/cart?tab=wishlist"
          className="btn-hover"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#161616',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
          aria-label="Wishlist"
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#ff3b30' : 'none'} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
          {wishlist.length > 0 && (
            <span
              style={{
                position: 'absolute',
                top: -2,
                right: -2,
                background: 'var(--accent-blue)',
                color: '#fff',
                fontSize: '9px',
                fontWeight: '800',
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {wishlist.length}
            </span>
          )}
        </Link>

        {/* Cart Pill */}
        <Link
          href="/cart"
          className="btn-hover"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: '44px',
            borderRadius: '999px',
            backgroundColor: '#161616',
            color: '#ffffff',
            padding: '0 0.35rem 0 1.25rem'
          }}
          aria-label="Cart"
        >
          <span style={{ fontSize: '13px', fontWeight: '600', marginRight: '0.85rem' }}>Cart</span>
          <div
            style={{
              width: '34px',
              height: '34px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              color: '#161616',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '12px'
            }}
          >
            {cartCount > 0 ? (
              cartCount
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                <path d="M3 6h18" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
            )}
          </div>
        </Link>

        {/* Profile Button - Direct navigation to /signin */}
        <Link
          href="/signin"
          className="btn-hover"
          aria-label="Account Profile"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '50%',
            backgroundColor: '#161616',
            color: '#fff',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
      </div>
    </header>
  );
}
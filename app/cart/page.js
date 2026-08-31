'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useStore } from '../../context/StoreContext';
import { PRODUCTS } from '../../data/products';
import ProductCard from '../../components/ProductCard';

export default function CartPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') === 'wishlist' ? 'wishlist' : 'bag';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [agreed, setAgreed] = useState(false);

  const { cart, updateQuantity, removeFromCart, cartTotal, wishlist } = useStore();

  useEffect(() => {
    if (searchParams.get('tab') === 'wishlist') {
      setActiveTab('wishlist');
    }
  }, [searchParams]);

  const wishedProducts = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <div style={{ marginTop: '2.5rem', maxWidth: '1180px' }}>
      {/* TABS */}
      <div style={{ display: 'flex', gap: '2rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem', marginBottom: '2.5rem' }}>
        <button
          onClick={() => setActiveTab('bag')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '1px',
            color: activeTab === 'bag' ? 'var(--text-dark)' : 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          SHOPPING BAG
        </button>
        <button
          onClick={() => setActiveTab('wishlist')}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '1px',
            color: activeTab === 'wishlist' ? 'var(--text-dark)' : 'var(--text-muted)',
            cursor: 'pointer'
          }}
        >
          FAVOURITES
        </button>
      </div>

      {activeTab === 'bag' ? (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '3rem', flexWrap: 'wrap' }}>
          {/* CART ITEMS ROW */}
          <div style={{ flex: 1, display: 'flex', gap: '1.5rem', flexWrap: 'wrap', minWidth: '320px' }}>
            {cart.length === 0 ? (
              <div style={{ padding: '3rem', background: '#fff', border: '1px solid var(--border-subtle)', width: '100%', textAlign: 'center' }}>
                <p style={{ fontSize: '13px', fontWeight: '700', marginBottom: '1rem' }}>Your shopping bag is empty.</p>
                <Link href="/products" style={{ display: 'inline-block', padding: '0.75rem 1.5rem', background: 'var(--text-dark)', color: '#fff', fontSize: '11px', fontWeight: '800' }}>
                  CONTINUE SHOPPING
                </Link>
              </div>
            ) : (
              cart.map((item) => (
                <article
                  key={`${item.id}-${item.selectedSize}-${item.selectedColor}`}
                  style={{
                    width: '305px',
                    height: '366px',
                    background: '#fff',
                    padding: '1.25rem',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    border: '1px solid var(--border-subtle)',
                    position: 'relative'
                  }}
                >
                  <button
                    onClick={() => removeFromCart(item.id, item.selectedSize, item.selectedColor)}
                    aria-label="Delete Item"
                    style={{ position: 'absolute', top: '1rem', right: '1rem', background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#666' }}
                  >
                    &times;
                  </button>

                  <div style={{ width: '240px', height: '200px', overflow: 'hidden', alignSelf: 'center' }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>

                  {/* Strip Controls */}
                  <div style={{ position: 'absolute', right: '1.25rem', top: '3.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', fontSize: '11px', fontWeight: '700' }}>
                    <span>{item.selectedSize}</span>
                    <div style={{ width: '16px', height: '16px', backgroundColor: item.selectedColor }} />
                    <div style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border-color)', textAlign: 'center', background: '#fff' }}>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, 1)} style={{ background: 'none', border: 'none', fontSize: '10px', cursor: 'pointer', padding: '0.15rem 0.4rem' }}>+</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.selectedSize, item.selectedColor, -1)} style={{ background: 'none', border: 'none', fontSize: '10px', cursor: 'pointer', padding: '0.15rem 0.4rem' }}>−</button>
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <span style={{ display: 'block', fontSize: '11px', fontWeight: '500', color: 'var(--text-muted)' }}>{item.category}</span>
                      <h3 style={{ fontSize: '13px', fontWeight: '600' }}>{item.name}</h3>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>${item.price * item.quantity}</span>
                  </div>
                </article>
              ))
            )}
          </div>

          {/* ORDER SUMMARY */}
          {cart.length > 0 && (
            <aside style={{ width: '310px', background: '#fff', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', border: '1px solid var(--border-subtle)', minHeight: '340px' }}>
              <div>
                <h2 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px' }}>ORDER SUMMARY</h2>
                <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '13px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Shipping</span>
                    <span>$10</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '800', marginTop: '1rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                    <span>TOTAL (TAX INCL.)</span>
                    <span>${(cartTotal + 10).toFixed(2)}</span>
                  </div>
                </div>

                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '11px', color: 'var(--text-muted)', marginTop: '1.5rem', cursor: 'pointer' }}>
                  <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
                  <span>I agree to the Terms and Conditions</span>
                </label>
              </div>

              <Link
                href="/checkout"
                style={{
                  backgroundColor: '#c8c8c8',
                  color: 'var(--text-dark)',
                  textAlign: 'center',
                  padding: '0.85rem',
                  fontWeight: '700',
                  fontSize: '12px',
                  letterSpacing: '1px',
                  textTransform: 'uppercase',
                  display: 'block'
                }}
              >
                CONTINUE
              </Link>
            </aside>
          )}
        </div>
      ) : (
        /* FAVOURITES */
        <div>
          {wishedProducts.length === 0 ? (
            <div style={{ padding: '3rem', background: '#fff', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
              <p style={{ fontSize: '13px', fontWeight: '700' }}>You have no saved favorites yet.</p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '2rem' }}>
              {wishedProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
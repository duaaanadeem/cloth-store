'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '../../context/StoreContext';

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    country: '',
    region: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    cardExp: '',
    cardCvc: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else {
      setStep(4);
      clearCart();
    }
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div style={{ padding: '4rem 2rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800' }}>YOUR CART IS EMPTY</h2>
        <Link href="/products" style={{ display: 'inline-block', marginTop: '1.5rem', background: 'var(--text-dark)', color: '#fff', padding: '0.75rem 1.5rem', fontWeight: '700', fontSize: '12px' }}>
          RETURN TO SHOP
        </Link>
      </div>
    );
  }

  if (step === 4) {
    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '3rem', background: 'var(--white)', border: '1px solid var(--border-subtle)', textAlign: 'center' }}>
        <div className="diamond-logo" style={{ margin: '0 auto 1.5rem' }} />
        <h1 style={{ fontSize: '28px', fontWeight: '900', textTransform: 'uppercase' }}>ORDER CONFIRMED</h1>
        <p style={{ marginTop: '1rem', fontSize: '14px', color: 'var(--text-muted)' }}>
          Thank you, <strong>{formData.firstName || 'Customer'}</strong>. Your order has been placed successfully.
        </p>
        <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', background: 'var(--text-dark)', color: '#fff', padding: '0.85rem 2rem', fontWeight: '800', fontSize: '12px' }}>
          BACK TO HOMEPAGE
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1180px', margin: '0 auto' }}>
      {/* Back Link */}
      <Link href="/cart" style={{ display: 'inline-block', marginBottom: '2rem', color: 'var(--text-dark)' }}>
        <svg width="48" height="14" viewBox="0 0 48 14" fill="none" stroke="currentColor" strokeWidth="1.75">
          <line x1="46" y1="7" x2="2" y2="7" />
          <polyline points="9 1 2 7 9 13" />
        </svg>
      </Link>

      <h1 style={{ fontSize: '36px', fontWeight: '900', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
        CHECKOUT
      </h1>

      {/* Steps */}
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '3rem', fontSize: '13px', fontWeight: '700', letterSpacing: '1px' }}>
        <span style={{ color: step === 1 ? 'var(--text-dark)' : 'var(--text-muted)', borderBottom: step === 1 ? '2px solid var(--text-dark)' : 'none', paddingBottom: '4px' }}>INFORMATION</span>
        <span style={{ color: step === 2 ? 'var(--text-dark)' : 'var(--text-muted)', borderBottom: step === 2 ? '2px solid var(--text-dark)' : 'none', paddingBottom: '4px' }}>SHIPPING</span>
        <span style={{ color: step === 3 ? 'var(--text-dark)' : 'var(--text-muted)', borderBottom: step === 3 ? '2px solid var(--text-dark)' : 'none', paddingBottom: '4px' }}>PAYMENT</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '4rem', flexWrap: 'wrap' }}>
        {/* Left Form */}
        <form onSubmit={handleNext} style={{ width: '468px', display: 'flex', flexDirection: 'column', gap: '2.25rem' }}>
          {step === 1 && (
            <>
              <div>
                <h2 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.85rem' }}>CONTACT INFO</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <input required name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} style={{ height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                  <input required name="phone" type="tel" placeholder="Phone" value={formData.phone} onChange={handleChange} style={{ height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                </div>
              </div>

              <div>
                <h2 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '0.85rem' }}>SHIPPING ADDRESS</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input required name="firstName" type="text" placeholder="First Name" value={formData.firstName} onChange={handleChange} style={{ width: '231px', height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                    <input required name="lastName" type="text" placeholder="Last Name" value={formData.lastName} onChange={handleChange} style={{ width: '231px', height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                  </div>

                  <select required name="country" value={formData.country} onChange={handleChange} style={{ width: '100%', height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px', color: formData.country ? '#000' : '#888' }}>
                    <option value="" disabled hidden>Country</option>
                    <option value="US">United States</option>
                    <option value="UK">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="PK">Pakistan</option>
                  </select>

                  <input required name="region" type="text" placeholder="State / Region" value={formData.region} onChange={handleChange} style={{ height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                  <input required name="address" type="text" placeholder="Address" value={formData.address} onChange={handleChange} style={{ height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <input required name="city" type="text" placeholder="City" value={formData.city} onChange={handleChange} style={{ width: '231px', height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                    <input required name="postalCode" type="text" placeholder="Postal Code" value={formData.postalCode} onChange={handleChange} style={{ width: '231px', height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                  </div>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div>
              <h2 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '0.85rem' }}>SHIPPING METHOD</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: 'var(--white)', border: '1px solid var(--border-color)', cursor: 'pointer' }}>
                  <span>Standard Delivery (3-5 Business Days)</span>
                  <strong>FREE</strong>
                </label>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 style={{ fontSize: '12px', fontWeight: '800', letterSpacing: '1px', marginBottom: '0.85rem' }}>CARD PAYMENT</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input required name="cardNumber" type="text" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} style={{ height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                <div style={{ display: 'flex', gap: '6px' }}>
                  <input required name="cardExp" type="text" placeholder="MM/YY" value={formData.cardExp} onChange={handleChange} style={{ width: '231px', height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                  <input required name="cardCvc" type="text" placeholder="CVC" value={formData.cardCvc} onChange={handleChange} style={{ width: '231px', height: '44px', background: 'var(--white)', border: '1px solid var(--border-color)', padding: '0 1rem', fontSize: '13px' }} />
                </div>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {step > 1 ? (
              <button type="button" onClick={() => setStep(step - 1)} style={{ background: 'none', border: 'none', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}>
                Previous
              </button>
            ) : <div />}

            <button
              type="submit"
              style={{
                width: '231px',
                height: '44px',
                backgroundColor: '#c8c8c8',
                border: 'none',
                fontSize: '14px',
                fontWeight: '600',
                color: 'var(--text-dark)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 1.25rem',
                cursor: 'pointer'
              }}
            >
              <span>{step === 1 ? 'Shipping' : step === 2 ? 'Payment' : 'Pay Now'}</span>
              <svg width="28" height="12" viewBox="0 0 32 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                <line x1="1" y1="8" x2="30" y2="8" />
                <polyline points="23 1 30 8 23 15" />
              </svg>
            </button>
          </div>
        </form>

        {/* Right Sidebar: Order Info */}
        <aside style={{ width: '406px', backgroundColor: 'var(--white)', border: '1px solid var(--border-subtle)', padding: '2.25rem 2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '520px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '13px', fontWeight: '800', letterSpacing: '1px', textTransform: 'uppercase' }}>YOUR ORDER</h2>
              <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--accent-blue)' }}>({cart.length})</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
                  <img src={item.image} alt={item.name} style={{ width: '80px', height: '96px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <h3 style={{ fontSize: '13px', fontWeight: '600' }}>{item.name}</h3>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{item.selectedSize}</span>
                    <span style={{ display: 'block', color: 'var(--accent-blue)', fontSize: '12px', fontWeight: '700', marginTop: '0.4rem' }}>({item.quantity})</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', height: '70px' }}>
                    <Link href="/cart" style={{ fontSize: '12px', textDecoration: 'underline' }}>Change</Link>
                    <span style={{ fontSize: '14px', fontWeight: '700' }}>${item.price * item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--text-muted)', fontSize: '12px' }}>Calculated at next step</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem', fontSize: '15px', fontWeight: '800' }}>
              <span>Total</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
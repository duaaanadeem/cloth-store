'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useStore } from '../../context/StoreContext';

export default function SignInPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const [statusMsg, setStatusMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatusMsg(isRegister ? 'Account created successfully! Redirecting...' : 'Signed in successfully! Redirecting...');
    setTimeout(() => {
      router.push('/');
    }, 1200);
  };

  return (
    <div style={{ maxWidth: '440px', margin: '3rem auto', padding: '2.5rem 2rem', backgroundColor: '#ffffff', border: '1px solid var(--border-subtle)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '2rem' }}>
        <div className="diamond-logo" style={{ marginBottom: '1.25rem' }} />
        <h1 style={{ fontFamily: 'var(--font-hero)', fontSize: '32px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          {isRegister ? 'Create Account' : 'Sign In'}
        </h1>
        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
          {isRegister ? 'Register to manage your orders & wishlist' : 'Access your XIV profile, saved items and orders'}
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {isRegister && (
          <div>
            <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Full Name</label>
            <input
              required
              type="text"
              placeholder="e.g. Jane Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', height: '42px', padding: '0 1rem', border: '1px solid var(--border-color)', fontSize: '13px', outline: 'none' }}
            />
          </div>
        )}

        <div>
          <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Email Address</label>
          <input
            required
            type="email"
            placeholder="name@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            style={{ width: '100%', height: '42px', padding: '0 1rem', border: '1px solid var(--border-color)', fontSize: '13px', outline: 'none' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', display: 'block', marginBottom: '0.3rem' }}>Password</label>
          <input
            required
            type="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            style={{ width: '100%', height: '42px', padding: '0 1rem', border: '1px solid var(--border-color)', fontSize: '13px', outline: 'none' }}
          />
        </div>

        {statusMsg && (
          <div style={{ padding: '0.75rem', backgroundColor: '#e8f5e9', color: '#2e7d32', fontSize: '12px', fontWeight: '700', textAlign: 'center' }}>
            {statusMsg}
          </div>
        )}

        <button
          type="submit"
          className="btn-hover"
          style={{
            marginTop: '0.5rem',
            width: '100%',
            height: '44px',
            backgroundColor: '#121212',
            color: '#ffffff',
            border: 'none',
            fontSize: '12px',
            fontWeight: '800',
            letterSpacing: '1px',
            textTransform: 'uppercase',
            cursor: 'pointer'
          }}
        >
          {isRegister ? 'Register' : 'Sign In'}
        </button>
      </form>

      <div style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
        {isRegister ? (
          <span>
            Already have an account?{' '}
            <button onClick={() => setIsRegister(false)} style={{ background: 'none', border: 'none', fontWeight: '700', color: 'var(--text-dark)', textDecoration: 'underline', cursor: 'pointer' }}>
              Sign In
            </button>
          </span>
        ) : (
          <span>
            Don't have an account?{' '}
            <button onClick={() => setIsRegister(true)} style={{ background: 'none', border: 'none', fontWeight: '700', color: 'var(--text-dark)', textDecoration: 'underline', cursor: 'pointer' }}>
              Create One
            </button>
          </span>
        )}
      </div>

      <div style={{ marginTop: '2rem', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem', textAlign: 'center' }}>
        <Link href="/" style={{ fontSize: '11px', color: 'var(--text-muted)', textDecoration: 'underline' }}>
          ← Return to Storefront
        </Link>
      </div>
    </div>
  );
}
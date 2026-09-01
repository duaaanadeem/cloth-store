'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div style={{ maxWidth: '720px', margin: '2rem auto 6rem auto' }}>
      <Link 
        href="/" 
        style={{ 
          display: 'inline-block', 
          marginBottom: '2rem', 
          fontSize: '12px', 
          fontWeight: '700', 
          textDecoration: 'underline' 
        }}
      >
        ← BACK TO HOME
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div className="diamond-logo" style={{ margin: '0 auto 1.25rem auto' }} />
        <h1 style={{ fontFamily: 'var(--font-hero)', fontSize: '38px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          CONTACT US
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
          Have a question about your order, sizing, or shipments?
        </p>
      </div>

      <div 
        style={{ 
          backgroundColor: '#ffffff', 
          border: '1px solid var(--border-subtle)', 
          padding: '2.5rem 2rem',
          boxShadow: '0 4px 16px rgba(0,0,0,0.03)' 
        }}
      >
        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '22px', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Message Sent
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
              Thank you for reaching out. We will get back to you shortly.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="btn-hover"
              style={{
                padding: '0.65rem 1.5rem',
                backgroundColor: '#121212',
                color: '#ffffff',
                border: 'none',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer',
                textTransform: 'uppercase'
              }}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Name
              </label>
              <input
                required
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 0.85rem',
                  border: '1px solid var(--border-color)',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: 'transparent'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Email
              </label>
              <input
                required
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                style={{
                  width: '100%',
                  height: '42px',
                  padding: '0 0.85rem',
                  border: '1px solid var(--border-color)',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: 'transparent'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
                Message
              </label>
              <textarea
                required
                rows="4"
                placeholder="How can we help you?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  border: '1px solid var(--border-color)',
                  fontSize: '13px',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  resize: 'vertical'
                }}
              />
            </div>

            <button
              type="submit"
              className="btn-hover"
              style={{
                width: '100%',
                height: '44px',
                backgroundColor: '#121212',
                color: '#ffffff',
                border: 'none',
                fontSize: '12px',
                fontWeight: '800',
                letterSpacing: '1px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                marginTop: '0.5rem'
              }}
            >
              Send Message
            </button>
          </form>
        )}

        <div 
          style={{ 
            marginTop: '2.5rem', 
            paddingTop: '1.5rem', 
            borderTop: '1px solid var(--border-subtle)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            fontSize: '12px', 
            color: 'var(--text-muted)',
            flexWrap: 'wrap',
            gap: '1rem'
          }}
        >
          <div>
            <strong style={{ color: 'var(--text-dark)' }}>Email:</strong> concierge@xivstore.com
          </div>
          <div>
            <strong style={{ color: 'var(--text-dark)' }}>Hours:</strong> Mon – Fri (09:00 – 18:00)
          </div>
        </div>
      </div>
    </div>
  );
}
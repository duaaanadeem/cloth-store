'use client';

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div style={{ maxWidth: '960px', margin: '2rem auto 6rem auto' }}>
      <Link href="/" style={{ display: 'inline-block', marginBottom: '2rem', fontSize: '12px', fontWeight: '700', textDecoration: 'underline' }}>
        ← BACK TO HOME
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <div className="diamond-logo" style={{ margin: '0 auto 1.5rem auto' }} />
        <h1 style={{ fontFamily: 'var(--font-hero)', fontSize: '48px', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
          ABOUT XIV STORE
        </h1>
        <p style={{ maxWidth: '640px', margin: '1rem auto 0 auto', fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
          At elegant vogue, we blend creativity with craftsmanship to create fashion that transcends trends and stands the test of time.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', marginBottom: '4rem' }}>
        <div style={{ padding: '2rem', backgroundColor: '#ffffff', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '20px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            01 / PHILOSOPHY
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-dark)', lineHeight: '1.6' }}>
            Every silhouette is engineered with precision, focusing on architectural drape, tactile materiality, and subtle functional details.
          </p>
        </div>

        <div style={{ padding: '2rem', backgroundColor: '#ffffff', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '20px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            02 / CRAFTSMANSHIP
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-dark)', lineHeight: '1.6' }}>
            Each garment is constructed using premium heavy organic cottons, technical canvas, and reinforced stitching engineered for longevity.
          </p>
        </div>

        <div style={{ padding: '2rem', backgroundColor: '#ffffff', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontFamily: 'var(--font-hero)', fontSize: '20px', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            03 / INNOVATION
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-dark)', lineHeight: '1.6' }}>
            Integrating near-field communication tech tags within select outerwear pieces for digital authentication and curated seasonal access.
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link
          href="/products"
          className="btn-hover"
          style={{
            display: 'inline-block',
            padding: '1rem 2.5rem',
            backgroundColor: '#121212',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '12px',
            letterSpacing: '1px',
            textTransform: 'uppercase'
          }}
        >
          Explore Collections
        </Link>
      </div>
    </div>
  );
}
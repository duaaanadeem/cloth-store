'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer
      style={{
        marginTop: '8rem',
        paddingTop: '4rem',
        borderTop: '1px solid #d5d5d5',
        position: 'relative',
        width: '100%',
        maxWidth: '1240px',
        margin: '8rem auto 0 auto'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          alignItems: 'center',
          minHeight: '260px',
          position: 'relative',
          gap: '2rem'
        }}
      >
        {/* Left Column Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h5 style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', color: '#777777', marginBottom: '0.6rem' }}>INFO</h5>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '12px', fontWeight: '700' }}>
              <li><Link href="/products" className="btn-hover">PRICING /</Link></li>
              <li><Link href="/about" className="btn-hover">ABOUT /</Link></li>
              <li><Link href="/contact" className="btn-hover">CONTACTS</Link></li>
            </ul>
          </div>
          <div>
            <h5 style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1px', color: '#777777', marginBottom: '0.6rem' }}>LANGUAGES</h5>
            <div style={{ display: 'flex', gap: '0.5rem', fontSize: '11px', fontWeight: '700' }}>
              <span>ENG /</span>
              <span>ESP /</span>
              <span>SVE</span>
            </div>
          </div>
        </div>

        {/* Center Giant Branding with Faded Watermark "QR" */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', textAlign: 'center' }}>
          <span style={{ fontSize: '10px', fontWeight: '800', letterSpacing: '1.5px', color: '#777777', textTransform: 'uppercase', marginBottom: '1.5rem' }}>
            TECHNOLOGIES
          </span>

          <div style={{ position: 'relative', display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
            <span
              style={{
                position: 'absolute',
                top: '-30px',
                fontSize: '110px',
                fontWeight: '900',
                lineHeight: 1,
                color: 'rgba(0, 0, 0, 0.04)',
                userSelect: 'none',
                pointerEvents: 'none',
                zIndex: 0
              }}
            >
              QR
            </span>

            <div className="diamond-logo" style={{ width: '28px', height: '28px', marginBottom: '1.25rem', zIndex: 1 }} />
            <h2
              style={{
                fontFamily: 'var(--font-hero)',
                fontSize: '52px',
                fontWeight: '400',
                lineHeight: '0.82',
                letterSpacing: '0.5px',
                color: 'var(--text-dark)',
                zIndex: 1
              }}
            >
              XIV<br />QR
            </h2>
          </div>

          <span style={{ fontSize: '11px', color: '#777777', marginTop: '1.25rem' }}>
            Near-field communication apparel
          </span>
        </div>

        {/* Right Info Note */}
        <div style={{ textAlign: 'right' }}>
          <p style={{ fontSize: '12px', color: '#777777', lineHeight: '1.6' }}>
            Curated seasonal collections and technical silhouettes.
          </p>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: '11px',
          color: '#888888',
          borderTop: '1px solid #dcdcdc',
          paddingTop: '1.5rem',
          paddingBottom: '2.5rem',
          marginTop: '2rem'
        }}
      >
        <span>&copy; {new Date().getFullYear()} XIV STORE — copyright</span>
        <span style={{ cursor: 'pointer' }}>privacy</span>
      </div>
    </footer>
  );
}
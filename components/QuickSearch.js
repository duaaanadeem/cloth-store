'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '../context/StoreContext';

export default function QuickSearch({ placeholder = 'Search collection...', style = {} }) {
  const { searchQuery, setSearchQuery } = useStore();
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        backgroundColor: '#dcdcdc',
        padding: '0 1.25rem',
        width: '360px',
        maxWidth: '100%',
        height: '46px',
        border: '1px solid transparent',
        ...style
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
      <input
        type="search"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder={placeholder}
        style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '13px', fontWeight: '600', width: '100%' }}
      />
    </form>
  );
}
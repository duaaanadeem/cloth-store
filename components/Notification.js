'use client';

import React from 'react';
import { useStore } from '../context/StoreContext';

export default function Notification() {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        backgroundColor: '#121212',
        color: '#ffffff',
        padding: '0.9rem 1.5rem',
        fontSize: '12px',
        fontWeight: '700',
        letterSpacing: '1px',
        textTransform: 'uppercase',
        zIndex: 9999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
      }}
    >
      {toastMessage}
    </div>
  );
}
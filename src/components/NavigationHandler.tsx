'use client';

import { useEffect } from 'react';

export default function NavigationHandler() {
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.get('section') === 'creations') {
      setTimeout(() => {
        window.dispatchEvent(new CustomEvent('openMenu'));
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent('activateCreations'));
        }, 100);
      }, 100);
    }
  }, []);

  return null;
}

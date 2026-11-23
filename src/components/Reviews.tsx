'use client';

import { useEffect, useRef, useState } from 'react';
import { business } from '@/content/business';

/** Loads the business’s existing Elfsight verified-reviews widget only when it scrolls into view. */
export function Reviews() {
  const ref = useRef<HTMLDivElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => entries.some((e) => e.isIntersecting) && setLoad(true), { rootMargin: '400px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!load || document.querySelector('script[data-elfsight]')) return;
    const s = document.createElement('script');
    s.src = 'https://static.elfsight.com/platform/platform.js';
    s.async = true;
    s.dataset.elfsight = 'true';
    document.body.appendChild(s);
  }, [load]);

  return (
    <div ref={ref} className="min-h-48">
      {load && <div className={`elfsight-app-${business.reviewsWidgetId}`} data-elfsight-app-lazy />}
    </div>
  );
}

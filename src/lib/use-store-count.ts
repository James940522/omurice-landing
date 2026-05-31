'use client';

import { useEffect, useState } from 'react';
import { fetchStoreCount } from './stores';

let cachedStoreCount: number | null = null;
let storeCountPromise: Promise<number | null> | null = null;

export function useStoreCount() {
  const [storeCount, setStoreCount] = useState<number | null>(cachedStoreCount);

  useEffect(() => {
    let isMounted = true;

    if (!storeCountPromise) {
      storeCountPromise = fetchStoreCount().then((count) => {
        cachedStoreCount = count;
        return count;
      });
    }

    storeCountPromise.then((count) => {
      if (isMounted) {
        setStoreCount(count);
      }
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return storeCount;
}

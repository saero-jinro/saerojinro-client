'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useCallback } from 'react';

const useQueryString = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const setQueryDayShowWishList = useCallback(
    (day: string, showWishList: boolean) => {
      const params = new URLSearchParams(searchParams.toString());

      params.set('day', day);
      params.set('showWishlist', showWishList ? 'true' : 'false');

      router.replace(`?${params.toString()}`);
    },
    [router],
  );

  const setQueryDayCategory = useCallback(
    (day: string, categories: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (day.includes('ALL')) params.delete('category');
      else params.set('category', categories.join(','));

      params.set('day', day);

      router.replace(`?${params.toString()}`);
    },
    [router],
  );

  return { setQueryDayShowWishList, setQueryDayCategory };
};

export default useQueryString;

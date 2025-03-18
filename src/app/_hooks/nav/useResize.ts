'use client';

import useHeaderStore from '@/_store/Header/useHeaderStore';
import { useEffect } from 'react';

const useResize = () => {
  const MAX_MOBILE_WIDTH = 769;
  const setWidth = useHeaderStore((store) => store.viewport.actions.setWidth);
  const setMode = useHeaderStore((store) => store.viewport.actions.setMode);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const resizeHandler = () => {
      const stageWidth = window.innerWidth;
      setWidth(stageWidth);
      setMode(stageWidth <= MAX_MOBILE_WIDTH ? 'mobile' : 'web');
    };

    const debouncedResizeHandler = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(resizeHandler, 50);
    };

    window.addEventListener('resize', debouncedResizeHandler);

    resizeHandler();

    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
      clearTimeout(timeoutId);
    };
  }, [MAX_MOBILE_WIDTH, setWidth, setMode]);

  return {};
};

export default useResize;

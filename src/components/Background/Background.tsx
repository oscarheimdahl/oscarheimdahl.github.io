import { useEffect, useRef } from 'react';
import { buildBackground, init } from './konva/stage';
import { useAppState } from '@/store';
import { boom as dotBoom, resetBoom } from './konva/dots';

export function Background() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const setBackgroundRef = useAppState((state) => state.setBackgroundRef);
  const boom = useAppState((state) => state.boom);

  useEffect(() => {
    if (boom) {
      dotBoom();
    } else {
      resetBoom();
    }
  }, [boom]);

  useEffect(() => {
    init();
    buildBackground();

    let timeout: NodeJS.Timeout | undefined;
    window.addEventListener('resize', () => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        buildBackground();
        timeout = undefined;
      }, 100);
    });
  }, []);

  useEffect(() => {
    setBackgroundRef(backgroundRef);
  }, [setBackgroundRef]);

  return (
    <div
      ref={backgroundRef}
      className='fade-in opacity-0 absolute w-full h-full'
      id='container'
    />
  );
}

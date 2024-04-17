import { useEffect, useRef } from 'react';
// import { buildBackground, init } from './konva/stage';
import { useAppState } from '@/store';

export function Background() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const setBackgroundRef = useAppState((state) => state.setBackgroundRef);

  // useEffect(() => {
  //   init();
  //   buildBackground();

  //   let timeout: NodeJS.Timeout | undefined;
  //   window.addEventListener('resize', () => {
  //     clearTimeout(timeout);

  //     timeout = setTimeout(() => {
  //       buildBackground();
  //       timeout = undefined;
  //     }, 100);
  //   });
  // });

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

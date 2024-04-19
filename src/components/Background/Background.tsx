import { useAppState } from '@/store';
import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { buildBackground, init } from './konva/stage';

export function Background() {
  const backgroundRef = useRef<HTMLDivElement>(null);
  const setBackgroundRef = useAppState((state) => state.setBackgroundRef);
  const boom = useAppState((state) => state.boom);

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
    <motion.div
      ref={backgroundRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        delay: 1,
      }}
      className='absolute w-full h-full'
    >
      <motion.div
        animate={{ opacity: boom ? 0 : 1 }}
        className='absolute w-full h-full'
      >
        <div id='container'></div>
      </motion.div>
    </motion.div>
  );
}

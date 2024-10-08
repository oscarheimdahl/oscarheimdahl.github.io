import { Window } from '@/components/Window';
import { useAppState } from '@/store';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { nextBackground, prevBackground } from './Background/konva/stage';
import { motion } from 'framer-motion';
import { useRef } from 'react';

export function NextBackground() {
  const setHideBackground = useAppState((state) => state.setHideBackground);
  const darkMode = useAppState((state) => state.darkMode);
  const timoutRef = useRef<NodeJS.Timeout | null>(null);

  function handleClick(direction: 'left' | 'right') {
    if (timoutRef.current) clearTimeout(timoutRef.current);
    setHideBackground(true);
    timoutRef.current = setTimeout(() => {
      direction === 'right' ? nextBackground() : prevBackground();
      setHideBackground(false);
    }, 200);
  }

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: darkMode ? 1 : 0 }}>
      <Window>
        <div className='flex gap-2'>
          <button
            onClick={() => handleClick('left')}
            className='hover:opacity-65 transition-opacity p-2 bg-gradient-to-br  from-slate-800  to-dark rounded-md text-light'
          >
            <ArrowLeft />
          </button>
          <button
            onClick={() => handleClick('right')}
            className='hover:opacity-65 transition-opacity p-2 bg-gradient-to-br   from-slate-800  to-dark rounded-md text-light'
          >
            <ArrowRight />
          </button>
        </div>
      </Window>
    </motion.div>
  );
}

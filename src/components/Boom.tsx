import { useAppState } from '@/store';
import { motion } from 'framer-motion';
import { Bomb, RotateCcw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Window } from './Window';

export const ForFun = () => {
  const boom = useAppState((state) => state.boom);
  const darkMode = useAppState((state) => state.darkMode);
  const setBoom = useAppState((state) => state.setBoom);
  const [countDownStarted, setCountDownStarted] = useState(false);
  const [warningIndex, setWarningIndex] = useState(0);
  const warnings = ['2', '5', '4', '3', '2', '1'];

  const nextBoom = warningIndex === warnings.length - 1;

  const countDown = () => {
    if (nextBoom) {
      setBoom(true);
      setCountDownStarted(false);
    }
    setWarningIndex((prev) => (prev + 1) % warnings.length);
  };

  useInterval(countDown, countDownStarted ? 1000 : null);

  function handleClick() {
    if (boom) {
      setBoom(false);
    } else {
      if (countDownStarted) return;
      countDown();
      setCountDownStarted(true);
    }
  }

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: darkMode ? 1 : 0 }}>
      <Window>
        <motion.button
          onClick={handleClick}
          className={`flex gap-1 overflow-hidden shadow-md p-2 rounded-md font-bold text-light
          ${countDownStarted ? 'animate-shake' : ''}
          ${
            boom
              ? 'bg-gradient-to-br from-green-600 to-green-800'
              : 'bg-gradient-to-br from-red-700 to-red-900'
          }
      `}
        >
          <div
            className={`${
              countDownStarted ? '' : 'translate-y-10'
            } w-3 h-full transition-transform`}
          >
            {warnings[warningIndex]}
          </div>
          {boom && <RotateCcw />}
          {!boom && <Bomb />}
        </motion.button>
      </Window>
    </motion.div>
  );
};

export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (delay === null) {
      return;
    }

    const id = setInterval(() => {
      savedCallback.current();
    }, delay);

    return () => {
      clearInterval(id);
    };
  }, [delay]);
}

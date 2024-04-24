import { Window } from '@/components/Window';
import { useAppState } from '@/store';
import { useState } from 'react';

export function Toggle() {
  const darkMode = useAppState((state) => state.darkMode);
  const setDarkMode = useAppState((state) => state.setDarkMode);
  const [noticed, setNoticed] = useState(false);

  function handleClick() {
    setDarkMode(!darkMode);
  }

  return (
    <Window>
      <button
        onMouseEnter={() => setNoticed(true)}
        onFocus={() => setNoticed(true)}
        onClick={handleClick}
        className={`group w-14 h-8 rounded-full shadow-md
                    bg-gradient-to-br from-slate-800 to-dark
                  dark:bg-light
                  ${!noticed ? 'animate-announce' : ''}
                  `}
      >
        <div
          className={`group-hover:opacity-65 group-focus-visible:opacity-65 w-6 h-6 bg-light rounded-full mx-1 transition-all dark:bg-dark ${
            darkMode ? 'translate-x-6' : ''
          }`}
        />
      </button>
    </Window>
  );
}

import { Window } from '@/components/Window';
import { useState } from 'react';

export function Toggle() {
  const [on, setOn] = useState(false);

  function handleClick() {
    setOn(!on);
    const darkmode = document.documentElement.classList.contains('dark');
    if (darkmode) {
      document.documentElement.classList.remove('dark');
      // localStorage.setItem('color-theme', 'light');
      // lightModeStore.set(true);
    } else {
      // localStorage.setItem('color-theme', 'dark');
      document.documentElement.classList.add('dark');
      // lightModeStore.set(false);
    }
  }

  return (
    <Window>
      <div className='flex gap-2'>
        <button
          onClick={handleClick}
          className='w-14 h-8 bg-dark2 rounded-full shadow-md dark:bg-light2'
        >
          <div
            className={`w-6 h-6 bg-light2 rounded-full mx-1 transition-transform dark:bg-dark2 ${
              on ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>
    </Window>
  );
}

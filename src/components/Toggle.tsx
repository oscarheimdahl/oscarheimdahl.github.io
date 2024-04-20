import { Window } from '@/components/Window';
import { useAppState } from '@/store';

export function Toggle() {
  const darkMode = useAppState((state) => state.darkMode);
  const setDarkMode = useAppState((state) => state.setDarkMode);

  function handleClick() {
    setDarkMode(!darkMode);
  }

  return (
    <Window>
      <button
        onClick={handleClick}
        className='group w-14 h-8 bg-gradient-to-br from-slate-800 to-dark rounded-full shadow-md dark:bg-light'
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

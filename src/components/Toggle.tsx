import { Window } from '@/components/Window';
import { useAppState } from '@/store';

export function Toggle() {
  // const [on, setOn] = useState(false);
  const darkMode = useAppState((state) => state.darkMode);
  const setDarkMode = useAppState((state) => state.setDarkMode);

  function handleClick() {
    setDarkMode(!darkMode);
    // const darkmode = document.documentElement.classList.contains('dark');
    // if (darkmode) {
    //   document.documentElement.classList.remove('dark');
    //   // localStorage.setItem('color-theme', 'light');
    //   // lightModeStore.set(true);
    // } else {
    //   // localStorage.setItem('color-theme', 'dark');
    //   document.documentElement.classList.add('dark');
    //   // lightModeStore.set(false);
    // }
  }

  return (
    <Window>
      <div className='flex gap-2'>
        <button
          onClick={handleClick}
          className='w-14 h-8 bg-gradient-to-br from-dark via-dark to-red-800 rounded-full shadow-md dark:bg-light'
        >
          <div
            className={`w-6 h-6 bg-light rounded-full mx-1 transition-transform dark:bg-dark ${
              darkMode ? 'translate-x-6' : ''
            }`}
          />
        </button>
      </div>
    </Window>
  );
}

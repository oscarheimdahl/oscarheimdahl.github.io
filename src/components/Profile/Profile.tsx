import { Window } from '@/components/Window';
import me from './me.jpg';
import './style.css';

export function Profile() {
  return (
    <Window>
      <div className='flex flex-col gap-2 pt-32 relative'>
        <Image />
        <h1 className='text-4xl font-semibold flex gap-2'>
          I'm Oscar <span id='wave text-4xl'>👋🏼</span>
        </h1>
        <p className='w-[24ch] text-xl'>
          A front-end developer with a passion for all things web.
        </p>
      </div>
    </Window>
  );
}

function Image() {
  return (
    <img
      style={{ transition: 'filter 200ms' }}
      src={me}
      alt='Oscar Heimdahl'
      className='rounded-full dark:brightness-90 brightness-100 pointer-events-none w-60 absolute -top-32 left-1/2 -translate-x-1/2 shadow-md opacity-100 transition-opacity'
      // on:load={() => (show = true)}
    />
  );
}

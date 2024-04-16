import { ArrowUpRight } from 'lucide-react';
import { Window } from './Window';

export function ProjectsTitle() {
  return (
    <Window>
      <div className='grid place-content-center bg-gradient-to-tl from-pink-600   to-orange-500  rounded-[10px]'>
        <h1 className='m-1 text-lg px-4 py-2 transition-colors  dark:text-dark1 text-light2 rounded-md shadow-inner w-56'>
          Check out some of the stuff I've made!
        </h1>
      </div>
    </Window>
  );
}

export function Project1() {
  return (
    <Window>
      <div className='flex flex-col gap-4 pt-2'>
        <LinkButton href='https://chat.deno.dev'>Chat</LinkButton>
        <p className='max-w-52'>
          I wanted to try out WebSockets, so I made a chat app with some extra
          live features.
        </p>
        {/* <LinkButton href='https://gradient.deno.dev'>Gradient</LinkButton> */}
      </div>
    </Window>
  );
}
export function Project2() {
  return (
    <Window>
      <div className='flex flex-col gap-4 pt-2'>
        {/* <LinkButton href='https://chat.deno.dev'>Chat</LinkButton> */}
        <LinkButton href='https://gradient.deno.dev'>Gradient</LinkButton>
        <p className='max-w-52'>
          A clean gradient generator made with React. Helpful for finding the
          perfect gradient when developing.
        </p>
      </div>
    </Window>
  );
}

function LinkButton({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      target='_blank'
      href={href}
      className='group flex shadow-md px-4 py-2 border-2 border-current rounded-md w-32 justify-between'
    >
      {children} <ArrowUpRight className='' />
    </a>
  );
}

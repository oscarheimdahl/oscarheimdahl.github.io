import { ArrowUpRight } from 'lucide-react';
import { Window } from './Window';

export function ProjectsTitle() {
  return (
    <Window>
      <div className='grid'>
        <div
          style={{ gridArea: '1 / 1' }}
          className={`opacity-100 dark:opacity-0 grid place-content-center rounded-lg transition-opacity duration-300
        bg-gradient-to-br  from-slate-800 to-dark
        `}
        >
          <h1 className='m-1 text-lg px-4 py-2 transition-colors   text-light rounded-md shadow-inner w-56'>
            Check out some of the stuff I've made!
          </h1>
        </div>
      </div>
    </Window>
  );
}

export function Project1() {
  return (
    <Window>
      <div className='flex flex-col gap-4'>
        <LinkButton href='https://heimchat.deno.dev'>Chat</LinkButton>
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
      <div className='flex flex-col gap-4'>
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

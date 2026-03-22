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
        <LinkButton color={1} href='https://heimchat.deno.dev'>
          Chat
        </LinkButton>
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
    <Window translateX={8} translateY={8}>
      <div className='flex flex-col gap-4'>
        {/* <LinkButton href='https://chat.deno.dev'>Chat</LinkButton> */}
        <LinkButton color={2} href='https://gradient.deno.dev'>
          Gradient
        </LinkButton>
        <p className='max-w-52'>
          A clean gradient generator made with React. Helpful for finding the
          perfect gradient when developing.
        </p>
      </div>
    </Window>
  );
}

export function Project3() {
  return (
    <Window translateX={16} translateY={16}>
      <div className='flex flex-col gap-4'>
        <LinkButton
          color={3}
          href='https://oscarheimdahl.github.io/chat-bubblify'
        >
          Chat&nbsp;Bubblify
        </LinkButton>
        <p className='max-w-52'>
          A fun application to superimpose chat bubbles on images. Made with
          HTML canvas.
        </p>
      </div>
    </Window>
  );
}

function LinkButton({
  href,
  children,
  color,
}: {
  href: string;
  children: React.ReactNode;
  color: 1 | 2 | 3;
}) {
  let backgroundStyle = 'from-emerald-800 to-blue-900';
  if (color === 2) backgroundStyle = 'from-emerald-800 to-blue-900';
  if (color === 3) backgroundStyle = 'from-emerald-800 to-blue-900';
  return (
    <a
      target='_blank'
      href={href}
      className={`group flex shadow-md px-4 py-2 rounded-md w-fit justify-between bg-gradient-to-br text-white ${backgroundStyle}`}
    >
      {children} <ArrowUpRight className='' />
    </a>
  );
}

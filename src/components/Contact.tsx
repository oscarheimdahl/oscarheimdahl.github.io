import { Github, Linkedin, Mail } from 'lucide-react';
import { Window } from './Window';

export function Contact() {
  return (
    <Window>
      <div className='flex gap-3'>
        <a
          className='shadow-md ring-2 rounded-md p-1 bg-current ring-current transition-opacity hover:opacity-65'
          href='https://www.linkedin.com/in/oscar-heimdahl-9b9428152/'
        >
          <Linkedin className='stroke-light2 dark:stroke-dark2 transition-colors' />
        </a>
        <a
          className='shadow-md ring-2 rounded-md p-1 bg-current ring-current transition-opacity hover:opacity-65'
          href='https://www.github.com/oscarheimdahl'
        >
          <Github className='stroke-light2 dark:stroke-dark2 transition-colors' />
        </a>
        <a
          className='shadow-md ring-2 rounded-md p-1 bg-current ring-current transition-opacity hover:opacity-65'
          href='mailto:o.heimdahl@gmail.com'
        >
          <Mail className='stroke-light2 dark:stroke-dark2 transition-colors' />
        </a>
      </div>
    </Window>
  );
}

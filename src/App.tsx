import { Background } from './components/Background/Background';
import { Profile } from '@/components/Profile/Profile';
import { Toggle } from '@/components/Toggle';
import { Project1, Project2, ProjectsTitle } from '@/components/Projects';
import { Contact } from './components/Contact';

function App() {
  return (
    <>
      <Background />
      <div className='w-full h-full grid items-center justify-center gap-4'>
        <div className='flex self-end  items-end gap-8'>
          <Profile />
          <div className='hidden sm:flex flex-col gap-4'>
            <ProjectsTitle />
            <div className='grid '>
              <div
                className='  translate-x-8 translate-y-8'
                style={{ gridArea: '1 / 1' }}
              >
                <Project1 />
              </div>
              <div style={{ gridArea: '1 / 1' }}>
                <Project2 />
              </div>
            </div>
          </div>
        </div>
        <div className='flex gap-4 self-start'>
          <Toggle />
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;

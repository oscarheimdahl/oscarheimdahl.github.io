import { Background } from './components/Background/Background';
import { Profile } from '@/components/Profile/Profile';
import { Toggle } from '@/components/Toggle';
import { Project1, Project2, ProjectsTitle } from '@/components/Projects';
import { Contact } from './components/Contact';
import { ForFun } from './components/Boom';

function App() {
  return (
    <>
      <Background />
      <div
        style={{
          gridTemplateAreas: `
          "a a a a b b"
          "a a a a b b"
          "c c c c b b"
          "d d d d . ."`,
          gridTemplateRows: 'min-content min-content min-content',
        }}
        className='w-full h-full grid items-center justify-center gap-4 place-content-center'
      >
        <div className='self-end' style={{ gridArea: 'a' }}>
          <Profile />
        </div>
        <div
          className='hidden sm:flex self-start flex-col gap-4'
          style={{ gridArea: 'b' }}
        >
          <ProjectsTitle />
          <div className='grid'>
            <div
              className='translate-x-8 translate-y-8'
              style={{ gridArea: '1 / 1' }}
            >
              <Project1 />
            </div>
            <div style={{ gridArea: '1 / 1' }}>
              <Project2 />
            </div>
          </div>
        </div>
        <div className='flex gap-4 justify-end' style={{ gridArea: 'c' }}>
          <Toggle />
          <Contact />
        </div>
        <div className='flex justify-end' style={{ gridArea: 'd' }}>
          <ForFun />
        </div>
      </div>
    </>
  );
}

export default App;

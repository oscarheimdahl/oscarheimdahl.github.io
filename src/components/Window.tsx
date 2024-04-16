import { motion } from 'framer-motion';
import { useAppState } from '@/store';
import { useState } from 'react';

interface WindowProps {
  children: React.ReactNode;
  className?: string;
}

export function Window({ children, className }: WindowProps) {
  const backgroundRef = useAppState((state) => state.backgroundRef);
  const newWindowZ = useAppState((state) => state.newWindowZ);
  const windowZ = useAppState((state) => state.windowZ);
  const [z, setZ] = useState(windowZ);

  if (!backgroundRef) return null;

  return (
    <motion.div
      className={className}
      initial={{ scale: 0.7 }}
      animate={{ scale: 1 }}
      transition={{
        delay: 0.5,
      }}
    >
      <motion.div
        style={{ zIndex: z }}
        onMouseDown={() => {
          newWindowZ();
          setZ(windowZ + 1);
        }}
        drag
        whileDrag={{ rotate: '2deg', zIndex: 1000 }}
        whileTap={{ scale: 0.98 }}
        animate={{ scale: 1 }}
        dragMomentum={false}
        dragConstraints={backgroundRef}
        id='main-modal'
        className={`pt-10 p-4 size-fit rounded-lg shadow-lg shadow-[#000000aa] relative cursor-move transition-colors rotate-0
                  bg-light2 dark:bg-[rgb(25,25,25)]
                    ${className}`}
      >
        <DragIndicator />
        {children}
      </motion.div>
    </motion.div>
  );
}

function DragIndicator() {
  return (
    <div className='absolute top-2 left-2 opacity-20 pointer-events-none'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='25'
        height='25'
        viewBox='0 0 24 24'
      >
        <path
          fill='currentColor'
          d='M9 20q-.825 0-1.413-.588T7 18q0-.825.588-1.413T9 16q.825 0 1.413.588T11 18q0 .825-.588 1.413T9 20Zm6 0q-.825 0-1.413-.588T13 18q0-.825.588-1.413T15 16q.825 0 1.413.588T17 18q0 .825-.588 1.413T15 20Zm-6-6q-.825 0-1.413-.588T7 12q0-.825.588-1.413T9 10q.825 0 1.413.588T11 12q0 .825-.588 1.413T9 14Zm6 0q-.825 0-1.413-.588T13 12q0-.825.588-1.413T15 10q.825 0 1.413.588T17 12q0 .825-.588 1.413T15 14ZM9 8q-.825 0-1.413-.588T7 6q0-.825.588-1.413T9 4q.825 0 1.413.588T11 6q0 .825-.588 1.413T9 8Zm6 0q-.825 0-1.413-.588T13 6q0-.825.588-1.413T15 4q.825 0 1.413.588T17 6q0 .825-.588 1.413T15 8Z'
        />
      </svg>
    </div>
  );
}
